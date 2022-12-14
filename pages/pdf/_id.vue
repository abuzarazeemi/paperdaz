<template>
  <div
    class="grid grid-cols-1 md:grid-cols-[max-content,1fr] grid-rows-1 h-full max-h-full overflow-hidden"
    id="pdf-page-vue"
  >
    <!-- pdf page aside has hidden md:grid -->
    <pdf-page-aside class="hidden md:block" />
    <main
      class="grid grid-rows-[max-content,max-content,1fr] gap-1 max-w-max mx-auto px-[2%]"
    >
      <pdf-page-action-tray
        :file="file"
        @update-file="file = $event"
        class="w-full"
      />

      <tool-bar
        :file="file"
        @tool-change="onToolChange"
        @undo="undo"
        class="max-w-4xl"
      />
      <div
        class="pdf-editor-view relative overflow-y-auto custom-scrollbar max-w-4xl"
        v-if="pdf"
        ref="scrollingElement"
      >
        <div
          class="pdf-pages-outer pb-6 relative"
          ref="PagesOuter"
          :style="pagesOuterStyle"
        >
          <!-- <tool-wrapper
            v-for="tool in fillteredTools"
            :key="tool.id"
            :dragHandler="handlePanning"
            :id="tool.id"
            :tool="tool"
            :type="tool.type"
            :x1="tool.x1"
            :y1="tool.y1"
            :x2="tool.x2"
            :y2="tool.y2"
            :points="tool.points"
            :deleteTool="deleteTool"
            :handleIncrease="handleIncrease"
            :handleDecrease="handleDecrease"
            :fontSize="tool.fontSize"
            :scale="tool.scale"
            :signature="signature"
            @pos-change="onPosChange"
            :activeToolId="activeToolId"
            :setActiveToolId="setActiveToolId"
          /> -->
          <!-- <component :is="`${selectedToolType}-identifier`" v-if="selectedToolType && showToolIdentifier" :position="toolIdentifierPosition" /> -->
          <div
            class="pdf-single-pages-outer"
            ref="pdf-single-pages-outer"
            v-if="pdf"
          >
            <div
              :class="[
                'pdf-single-page-outer',
                { 'mt-6': pI > 0 && !downloadingPdf },
              ]"
              :ref="`pdf-single-page-outer-${pI + 1}`"
              v-for="(page, pI) in pdf.numPages"
              :key="pI"
              style="position: relative"
            >
              <tool-wrapper
                v-for="tool in fillteredTools(pI + 1)"
                :key="tool.id"
                :dragHandler="handlePanning"
                :id="tool.id"
                :tool="tool"
                :type="tool.type"
                :x1="tool.x1"
                :y1="tool.y1"
                :x2="tool.x2"
                :y2="tool.y2"
                :points="tool.points"
                :deleteTool="deleteTool"
                :handleIncrease="handleIncrease"
                :handleDecrease="handleDecrease"
                :fontSize="tool.fontSize"
                :scale="tool.scale"
                @pos-change="onPosChange"
                :activeToolId="activeToolId"
                :setActiveToolId="setActiveToolId"
                :pageNumber="pI + 1"
                :value="tool.value"
                v-model="tool.value"
              />
              <pdf-page
                :handlePanning="handlePanning"
                :onCLickSinglePageOuter="onCLickSinglePageOuter"
                :onMouseMoveOnPages="onMouseMoveOnPages"
                :onMouseLeaveFromPages="onMouseLeaveFromPages"
                :page-number="pI + 1" :pdf="pdf"
                :scale="scale"
              />
            </div>
          </div>
        </div>
        <button
          class="w-full bg-paperdazgreen-400 h-12 text-white"
          v-show="isConfirm && !isCreator"
          @click="confirmDocument()"
        >
          Confirm
        </button>
      </div>
    </main>
    <save-pdf-modal :file="file" v-model="showSaveModal" />
  </div>
</template>

<script>
// import demoPdf from '@/assets/pdf/sample.pdf'
import * as pdfJs from 'pdfjs-dist/build/pdf'
import * as worker from 'pdfjs-dist/build/pdf.worker.entry'
pdfJs.GlobalWorkerOptions.workerSrc = worker

import jsPDF from 'jspdf'

import PdfPage from '@/components/pdf/PdfPage'
import ToolWrapper from '@/components/pdf/ToolWrapper'
import ToolBar from '@/components/pdf/ToolBar'

import TOOL_TYPE from '@/components/pdf/data/toolType'
import TOOL_DIRECTION from '@/components/pdf/data/toolDragDirection'

import TextIdentifier from '@/components/pdf/tools_identifiers/Text'
import TickIdentifier from '@/components/pdf/tools_identifiers/Tick'
import CrossIdentifier from '@/components/pdf/tools_identifiers/Cross'
import DotIdentifier from '@/components/pdf/tools_identifiers/Dot'
import CircleIdentifier from '@/components/pdf/tools_identifiers/Circle'
import LineIdentifier from '@/components/pdf/tools_identifiers/Line'
import DrawIdentifier from '@/components/pdf/tools_identifiers/Draw'
import HighlightIdentifier from '@/components/pdf/tools_identifiers/Highlight'
import DateIdentifier from '@/components/pdf/tools_identifiers/Date'
import NameIdentifier from '@/components/pdf/tools_identifiers/Name'
import InitialIdentifier from '@/components/pdf/tools_identifiers/Initial'
import SignatureIdentifier from '@/components/pdf/tools_identifiers/Signature'
import StarIdentifier from '@/components/pdf/tools_identifiers/Star'

import moment from 'moment'
import SavePdfModal from '~/components/pdf/modals/SavePdfModal.vue'

export default {
  layout: 'pdf',
  name: 'SinglePdfPage',
  components: {
    PdfPage,
    ToolWrapper,
    ToolBar,
    TextIdentifier,
    TickIdentifier,
    CrossIdentifier,
    DotIdentifier,
    CircleIdentifier,
    LineIdentifier,
    HighlightIdentifier,
    DrawIdentifier,
    DateIdentifier,
    NameIdentifier,
    InitialIdentifier,
    SignatureIdentifier,
    StarIdentifier,
    SavePdfModal,
  },
  data: () => ({
    pdf: null,
    tools: [],
    selectedToolType: null,
    toolIdentifierPosition: { top: 0, left: 0 },
    showToolIdentifier: false,

    lastPosX: 0,
    lastPosY: 0,
    isPanning: false,

    selectedToolId: null,

    signature: null,
    // data populated from asyncData
    file: {},

    scale: 1,
    stack: [],
    undoStack: [],

    activeToolId: null,

    toolId: 0,
    downloadingPdf: false,
    showSaveModal: false,
  }),
  created() {
    this.fetchPdf()
    this.$BUS.$on('download-pdf', this.downloadPdf)
    this.$BUS.$on('signature-update', (v) => (this.signature = v))
  },
  mounted() {
    document.addEventListener('keyup', this.keyupHandler)
  },
  destroyed() {
    document.removeEventListener('keyup', this.keyupHandler)
  },
  beforeDestroy() {
    this.$BUS.$off('download-pdf')
    this.$BUS.$off('signature-update')
  },
  async asyncData({ $axios, params, error }) {
    const file = await $axios
      .$get(`/file/${params.id}`)
      .then((response) => {
        const file = response.file
        file.action = file.action || 'complete'
        return file
      })
      .catch((err) => {
        error({
          statusCode: 404,
          message: err.message || 'File not found',
        })
      })

    return { file }
  },
  updated() {
    this.handleScale()
  },

  computed: {
    isCreator() {
      try {
        return this.file.user.id === this.$auth.user.id
      } catch (e) {
        return false
      }
    },
    isConfirm() {
      return String(this.file.action).toLowerCase() === 'confirm'
    },
    isComplete() {
      return String(this.file.action).toLowerCase() === 'complete'
    },
    isSign() {
      return String(this.file.action).toLowerCase() === 'sign'
    },
    pagesOuterStyle() {
      let scale = `scale(${this.scale})`
      return {
        transform: scale,
        '-webkit-transform': scale,
        'transform-origin': '0px 0px',
      }
    },
    TOOL_TYPE() {
      return TOOL_TYPE
    },
    TOOL_DIRECTION() {
      return TOOL_DIRECTION
    },
    TOOL_THRESHOLD() {
      return {
        [TOOL_TYPE.text]: {
          identifier: { top: 20, left: 0 },
          tool: { top: 12, left: 0 },
        },
        [TOOL_TYPE.tick]: {
          identifier: { top: 20, left: 0 },
          tool: { top: 20, left: 0 },
        },
        [TOOL_TYPE.cross]: {
          identifier: { top: 20, left: 0 },
          tool: { top: 20, left: 0 },
        },
        [TOOL_TYPE.dot]: {
          identifier: { top: 20, left: 0 },
          tool: { top: 10, left: 0 },
        },
        [TOOL_TYPE.circle]: {
          identifier: { top: 20, left: 0 },
          tool: { top: 20, left: 0 },
        },
        [TOOL_TYPE.line]: {
          identifier: { top: 20, left: 0 },
          tool: { top: 0, left: 0 },
        },
        [TOOL_TYPE.highlight]: {
          identifier: { top: 20, left: 0 },
          tool: { top: 5, left: 0 },
        },
        [TOOL_TYPE.draw]: {
          identifier: { top: 20, left: 0 },
          tool: { top: 0, left: 0 },
        },
        [TOOL_TYPE.date]: {
          identifier: { top: 20, left: 0 },
          tool: { top: 12, left: 0 },
        },
        [TOOL_TYPE.name]: {
          identifier: { top: 20, left: 0 },
          tool: { top: 12, left: 0 },
        },
        [TOOL_TYPE.initial]: {
          identifier: { top: 20, left: 0 },
          tool: { top: 12, left: 0 },
        },
        [TOOL_TYPE.signature]: {
          identifier: { top: 20, left: 0 },
          tool: { top: 12, left: 0 },
        },
        [TOOL_TYPE.star]: {
          identifier: { top: 20, left: 0 },
          tool: { top: 20, left: 0 },
        },
      }
    },
    selectedTool() {
      this.selectedToolIndex < 0 ? null : this.tools[this.selectedToolIndex]
    },
  },
  watch: {
    pdf(v) {
      this.handleScale()
    },
  },
  methods: {
    confirmDocument() {
      this.showSaveModal = true
    },
    keyupHandler(event) {
      if (event.ctrlKey && event.shiftKey && event.code === 'KeyZ') {
        this.redo()
      } else if (event.ctrlKey && event.code === 'KeyZ') {
        this.undo()
      }
    },
    undo() {
      let lastId = this.stack.pop()
      if (lastId) {
        let index = this.tools.findIndex((t) => t.id == lastId)
        if (index >= 0) {
          this.undoStack.push(lastId)
          this.tools[index].isDeleted = !this.tools[index].isDeleted
        }
      }
    },
    redo() {
      let lastId = this.undoStack.pop()
      if (lastId) {
        let index = this.tools.findIndex((t) => t.id == lastId)
        if (index >= 0) {
          this.stack.push(lastId)
          this.tools[index].isDeleted = !this.tools[index].isDeleted
        }
      }
    },
    setActiveToolId(v) {
      this.activeToolId = v
    },
    onPosChange({ dx, dy, id }) {
      let index = this.tools.findIndex((t) => t.id == id)
      let type = this.tools[index].type
      if (type == this.TOOL_TYPE.line) {
        this.tools[index].x1 -= dx
        this.tools[index].x2 -= dx
        this.tools[index].y1 -= dy
        this.tools[index].y2 -= dy
      } else if (type == this.TOOL_TYPE.highlight) {
        this.tools[index].x1 -= dx
        this.tools[index].x2 -= dx
        this.tools[index].y1 -= dy
        this.tools[index].y2 -= dy
      } else if (type == this.TOOL_TYPE.draw) {
        this.tools[index].points = this.tools[index].points.map((p, i) =>
          i % 2 == 0 ? p - dx : p - dy
        )
      } else {
        this.tools[index].left -= dx
        this.tools[index].top -= dy
      }
    },
    handleIncrease(id) {
      let index = this.tools.findIndex((t) => t.id == id)
      let tool = this.tools[index]
      if (
        tool.type == this.TOOL_TYPE.text ||
        tool.type == this.TOOL_TYPE.date ||
        tool.type == this.TOOL_TYPE.name ||
        tool.type == this.TOOL_TYPE.initial
      ) {
        let fontSize = tool.fontSize || 12
        this.tools[index].fontSize = ++fontSize
      } else if (
        tool.type == this.TOOL_TYPE.tick ||
        tool.type == this.TOOL_TYPE.cross ||
        tool.type == this.TOOL_TYPE.dot ||
        tool.type == this.TOOL_TYPE.circle ||
        tool.type == this.TOOL_TYPE.signature ||
        tool.type == this.TOOL_TYPE.star
      ) {
        let scale = tool.scale || 1
        scale += 0.1
        this.tools[index].scale = scale
      }
      this.$forceUpdate()
    },
    handleDecrease(id) {
      let index = this.tools.findIndex((t) => t.id == id)
      let tool = this.tools[index]
      if (
        tool.type == this.TOOL_TYPE.text ||
        tool.type == this.TOOL_TYPE.date ||
        tool.type == this.TOOL_TYPE.name ||
        tool.type == this.TOOL_TYPE.initial
      ) {
        let fontSize = tool.fontSize || 12
        this.tools[index].fontSize = --fontSize
      } else if (
        tool.type == this.TOOL_TYPE.tick ||
        tool.type == this.TOOL_TYPE.cross ||
        tool.type == this.TOOL_TYPE.dot ||
        tool.type == this.TOOL_TYPE.circle ||
        tool.type == this.TOOL_TYPE.signature ||
        tool.type == this.TOOL_TYPE.star
      ) {
        let scale = tool.scale || 1
        scale -= 0.1
        this.tools[index].scale = scale
      }
      this.$forceUpdate()
    },
    fillteredTools(pageNumber) {
      return this.tools.filter(
        (t) => !t.isDeleted && t.pageNumber == pageNumber
      )
    },
    async downloadPdf() {
      this.selectedToolId = null
      this.activeToolId = null
      let options = {
        // pagebreak: { after: '.pdf-single-page-outer' },
        image: { type: 'jpeg', quality: 1.0 },
        margin: [0, 0, 0, 0],
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      }
      let prevScale = this.scale
      this.scale = 1
      this.downloadingPdf = true
      await this.$nextTick()
      let elements = Array.from(this.$refs['pdf-single-pages-outer'].children)
      let worker = html2pdf()
        .set(options)
        .from(elements[0])
        .toContainer()
        .toCanvas()
        .toPdf()

      if (elements.length > 1) {
        elements.slice(1).forEach((element) => {
          worker = worker
            .get('pdf')
            .then((pdf) => pdf.addPage())
            .set(options)
            .from(element)
            .toContainer()
            .toCanvas()
            .toPdf()
        })
      }

      await worker.save()
      this.scale = prevScale
      this.downloadingPdf = false
    },
    async deleteTool(id) {
      let index = this.tools.findIndex((t) => t.id == id)
      this.selectedToolId = null
      this.activeToolId = null
      // this.tools.splice(index, 1)
      // this.$forceUpdate()
      this.stack.push(id)
      this.tools[index].isDeleted = true
      await this.$nextTick()
      this.$forceUpdate()
    },
    async handlePanning(
      event,
      id = undefined,
      direction = undefined,
      pageNumber
    ) {
      var elem = this.$refs['pdf-single-pages-outer']

      if (!this.isPanning && id == undefined) {
        this.isPanning = true
        this.lastPosX = elem.offsetLeft
        this.lastPosY = elem.offsetTop
        if (this.selectedToolType == this.TOOL_TYPE.line) {
          await this.placeTool(event.srcEvent, pageNumber)
          this.selectedToolId = this.tools[this.tools.length - 1].id
        } else if (this.selectedToolType == this.TOOL_TYPE.highlight) {
          await this.placeTool(event.srcEvent, pageNumber)
          this.selectedToolId = this.tools[this.tools.length - 1].id
        } else if (this.selectedToolType == this.TOOL_TYPE.draw) {
          await this.placeTool(event.srcEvent, pageNumber)
          this.selectedToolId = this.tools[this.tools.length - 1].id
        }
      } else if (id != undefined && this.selectedToolId != id) {
        let index = this.tools.findIndex((t) => t.id == id)
        this.selectedToolId = id
        this.selectedToolType = this.tools[index].type
      }

      var posX = event.deltaX + this.lastPosX
      var posY = event.deltaY + this.lastPosY

      const getPointPos = () => {
        let parent = this.$refs[`pdf-single-page-outer-${pageNumber}`]
        if (Array.isArray(parent)) parent = parent[0]
        let { x, y } = this.pointerPos(event.srcEvent, parent)

        if (y < 0) y = 0
        if (y > elem.clientHeight) x = elem.clientHeight
        if (x < 0) x = 0
        if (x > elem.clientWidth) x = elem.clientWidth

        return { x, y }
      }

      let index = this.tools.findIndex((t) => t.id == this.selectedToolId)
      if (this.selectedToolType == this.TOOL_TYPE.line) {
        let { x, y } = getPointPos()
        if (direction && direction == this.TOOL_DIRECTION.left) {
          this.tools[index].x1 = x
          this.tools[index].y1 = y
        } else {
          this.tools[index].x2 = x
          this.tools[index].y2 = y
        }
        this.$forceUpdate()
      } else if (this.selectedToolType == this.TOOL_TYPE.highlight) {
        let { x, y } = getPointPos()
        if (direction && direction == this.TOOL_DIRECTION.left) {
          this.tools[index].x1 = x
        } else {
          this.tools[index].x2 = x
        }
        this.tools[index].y2 = this.tools[index].y1 + 15
        this.$forceUpdate()
      } else if (this.selectedToolType == this.TOOL_TYPE.draw) {
        let { x, y } = getPointPos()
        this.tools[index].points = this.tools[index].points.concat([x, y])
        this.$forceUpdate()
      }

      if (event.isFinal) {
        this.isPanning = false
        this.lastPosX = 0
        this.lastPosY = 0
      }
    },
    onMouseEnterOnPages() {
      if (window.innerWidth < 800) return
      this.showToolIdentifier = true
    },
    onMouseLeaveFromPages() {
      if (window.innerWidth < 800) return
      this.showToolIdentifier = false
    },
    onMouseMoveOnPages(event) {
      // if(window.innerWidth < 800) return
      // if(!this.selectedToolType) return
      // if(!this.showToolIdentifier) this.showToolIdentifier = true
      // let { x, y } = this.pointerPos(event, this.$refs.PagesOuter)
      // this.toolIdentifierPosition.top = y - this.TOOL_THRESHOLD[this.selectedToolType].identifier.top
      // this.toolIdentifierPosition.left = x - this.TOOL_THRESHOLD[this.selectedToolType].identifier.left
    },
    onToolChange(type) {
      this.selectedToolType = type
    },
    pointerPos(event, parent) {
      const elParent =
        parent ||
        event.currentTarget.parentElement ||
        this.$refs.scrollingElement

      event = event || window.event

      const scrollingElement =
        parent ||
        this.$refs.scrollingElement ||
        document.scrollingElement ||
        document.body

      const boundingRect = scrollingElement.getBoundingClientRect()

      //if there is no clientX or there is no clientY on event
      // return 0, 0
      if (!(event.clientX && event.clientY)) return { x: 0, y: 0 }

      // cursor relative to the scrollingElement
      const mouseXRelativeToScrollingElement =
        event.clientX - (boundingRect.left || 0)
      const mouseYRelativeToScrollingElement =
        event.clientY - (boundingRect.top || 0)

      const x =
        mouseXRelativeToScrollingElement + (scrollingElement.scrollLeft || 0)
      const y =
        mouseYRelativeToScrollingElement + (scrollingElement.scrollTop || 0)

      return { x: x / this.scale, y: y / this.scale }
    },
    previousPointerPos(event, parent) {
      let eventDoc, doc, body
      event = event || window.event
      let x = 0
      let y = 0
      if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document
        doc = eventDoc.documentElement
        body = eventDoc.body

        event.pageX =
          event.clientX +
          ((doc && doc.scrollLeft) || (body && body.scrollLeft) || 0) -
          ((doc && doc.clientLeft) || (body && body.clientLeft) || 0)
        event.pageY =
          event.clientY +
          ((doc && doc.scrollTop) || (body && body.scrollTop) || 0) -
          ((doc && doc.clientTop) || (body && body.clientTop) || 0)
      }

      x = event.pageX
      y = event.pageY - 70

      console.log(event, event.target.pageY, [event.target])

      if (parent) {
        x = x - parent.offsetLeft
        y = y - parent.offsetTop
      }

      let pdfEditorView = document.querySelector('.pdf-editor-view')

      if (pdfEditorView) {
        x += pdfEditorView.scrollLeft
        y += pdfEditorView.scrollTop
      }

      return { x, y }
    },
    onCLickSinglePageOuter(event, pageNumber) {
      if (
        !this.selectedToolType ||
        this.selectedToolType == this.TOOL_TYPE.line ||
        this.selectedToolType == this.TOOL_TYPE.highlight ||
        this.selectedToolType == this.TOOL_TYPE.draw
      )
        return
      this.placeTool(event, pageNumber)
    },
    placeTool(e, pageNumber) {
      let parent = this.$refs[`pdf-single-page-outer-${pageNumber}`]
      if (Array.isArray(parent)) parent = parent[0]

      let { x, y } = this.pointerPos(e, parent || this.$refs.PagesOuter)
      let obj = {
        type: this.TOOL_TYPE[this.selectedToolType],
        top: y - this.TOOL_THRESHOLD[this.selectedToolType].tool.top,
        left: x - this.TOOL_THRESHOLD[this.selectedToolType].tool.left,
        isDeleted: false,
        id: ++this.toolId,
        pageNumber,
      }
      if (this.selectedToolType == this.TOOL_TYPE.line) {
        obj.x1 = obj.left
        obj.y1 = obj.top
        delete obj.left
        delete obj.top
      } else if (this.selectedToolType == this.TOOL_TYPE.highlight) {
        obj.x1 = obj.left
        obj.y1 = obj.top
        delete obj.left
        delete obj.top
      } else if (this.selectedToolType == this.TOOL_TYPE.draw) {
        obj.points = [obj.left, obj.top]
      } else if (this.selectedToolType == this.TOOL_TYPE.date) {
        obj.value = moment().format('YYYY-MM-DD')
      } else if (this.selectedToolType == this.TOOL_TYPE.signature) {
        obj.value = this.signature
      }
      this.tools.push(obj)
      this.stack.push(this.toolId)
    },
    async handleScale() {
      await this.$nextTick()
      let scrollingElem = this.$refs.scrollingElement
      let pagesOuter = this.$refs.PagesOuter
      if (scrollingElem && pagesOuter) {
        let s = scrollingElem.clientWidth / pagesOuter.clientWidth
        if (s != this.scale) {
          this.scale = s
          this.$forceUpdate()
        }
      }
    },
    async fetchPdf() {
      // let res = await fetch(demoPdf)
      let res = await fetch(this.file.download_link).catch((error) => {
        this.$notify.error({
          title: 'Pdf',
          message: error.message || 'Unable to fetch pdf',
        })
      })
      let blob = await res.blob()
      let pdfAsDataUri = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
      })

      let pdfAsArray = this.convertDataURIToBinary(pdfAsDataUri)
      let doc = pdfJs.getDocument(pdfAsArray)
      this.pdf = await doc.promise
    },
    convertDataURIToBinary(dataURI) {
      let BASE64_MARKER = ';base64,'
      var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length
      var base64 = dataURI.substring(base64Index)
      var raw = window.atob(base64)
      var rawLength = raw.length
      var array = new Uint8Array(new ArrayBuffer(rawLength))

      for (var i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i)
      }
      return array
    },
  },
}
</script>

<style lang="scss" scoped>
.pdf-editor-view {
  background-color: #e9e9e9;
  .pdf-pages-outer {
    width: 100%;
    position: relative;
    max-width: 800px;
  }
}

#pdf-page-vue {
  background: #e0e0e0;
}

.custom-scrollbar {
  /* Handle */
  &::-webkit-scrollbar-thumb {
    @apply bg-gray-500 bg-opacity-30;
    border-radius: 3px;

    &:hover {
      @apply bg-gray-700 bg-opacity-100 cursor-pointer;
    }
  }
}
</style>
