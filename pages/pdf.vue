<template>
  <div class="pdf-editor-view">
    <tool-bar @tool-change="onToolChange" />
    {{tools}}
    <div v-if="pdf" class="pdf-pages-wrapper flex flex-col items-center">
      <div class="pdf-pages-outer pb-6" ref="PagesOuter">
        <tool-wrapper v-for="(tool, tI) in tools" :key="`tool-${tI}`" :tool="tool" :x1="tool.x1" :y1="tool.y1" :x2="tool.x2" :y2="tool.y2" :points="tool.points" />
        <component :is="`${selectedToolType}-identifier`" v-if="selectedToolType && showToolIdentifier" :position="toolIdentifierPosition" />
        <div class="pdf-single-pages-outer" ref="pdf-single-pages-outer" v-hammer:pan="handlePanning" @click="onCLickSinglePageOuter" @mousemove="onMouseMoveOnPages" @mouseenter="onMouseEnterOnPages" @mouseleave="onMouseLeaveFromPages">
          <div class="pdf-single-page-outer mt-6" v-for="(page, pI) in pdf.numPages" :key="pI">
            <pdf-page :page-number="pI + 1" :pdf="pdf" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import demoPdf from '@/assets/pdf/sample.pdf'
import * as pdfJs from "pdfjs-dist/build/pdf"
import * as worker from "pdfjs-dist/build/pdf.worker.entry"
pdfJs.GlobalWorkerOptions.workerSrc = worker

import PdfPage from '@/components/pdf/PdfPage'
import ToolWrapper from '@/components/pdf/ToolWrapper'
import ToolBar from '@/components/pdf/ToolBar'

import TOOL_TYPE from '@/components/pdf/data/toolType'

import TextIdentifier from '@/components/pdf/tools_identifiers/Text'
import TickIdentifier from '@/components/pdf/tools_identifiers/Tick'
import CrossIdentifier from '@/components/pdf/tools_identifiers/Cross'
import DotIdentifier from '@/components/pdf/tools_identifiers/Dot'
import CircleIdentifier from '@/components/pdf/tools_identifiers/Circle'
import LineIdentifier from '@/components/pdf/tools_identifiers/Line'
import DrawIdentifier from '@/components/pdf/tools_identifiers/Draw'

export default {
  components: { 
    PdfPage, ToolWrapper, ToolBar,
    TextIdentifier, TickIdentifier, CrossIdentifier, DotIdentifier, CircleIdentifier, LineIdentifier,
    DrawIdentifier,
  },
  created(){
    this.fetchPdf()
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

    selectedToolIndex: -1,
  }),
  computed: {
    TOOL_TYPE(){ return TOOL_TYPE },
    TOOL_THRESHOLD(){
      return {
        [TOOL_TYPE.text]: { identifier: { top: 20, left: 0 }, tool: { top: 40, left: 0 } },
        [TOOL_TYPE.tick]: { identifier: { top: 20, left: 0 }, tool: { top: 40, left: 0 } },
        [TOOL_TYPE.cross]: { identifier: { top: 20, left: 0 }, tool: { top: 40, left: 0 } },
        [TOOL_TYPE.dot]: { identifier: { top: 20, left: 0 }, tool: { top: 40, left: 0 } },
        [TOOL_TYPE.circle]: { identifier: { top: 20, left: 0 }, tool: { top: 40, left: 0 } },
        [TOOL_TYPE.line]: { identifier: { top: 20, left: 0 }, tool: { top: 40, left: 0 } },
        [TOOL_TYPE.draw]: { identifier: { top: 20, left: 0 }, tool: { top: 40, left: 0 } },
      }
    },
    selectedTool(){
      this.selectedToolIndex < 0 ? null : this.tools[this.selectedToolIndex]
    },
  },
  methods: {
    handlePanning(event){
      var elem = this.$refs['pdf-single-pages-outer']
      
      if ( ! this.isPanning ) {
        this.isPanning = true
        this.lastPosX = elem.offsetLeft
        this.lastPosY = elem.offsetTop
        if(this.selectedToolType == this.TOOL_TYPE.line){
          this.placeTool(event.srcEvent, null)
          this.selectedToolIndex = this.tools.length - 1
        }
        else if(this.selectedToolType == this.TOOL_TYPE.draw){
          this.placeTool(event.srcEvent, null)
          this.selectedToolIndex = this.tools.length - 1
        }
      }

      var posX = event.deltaX + this.lastPosX
      var posY = event.deltaY + this.lastPosY

      if(this.selectedToolType == this.TOOL_TYPE.line){
        let { x, y } = this.pointerPos(event.srcEvent, this.$refs.PagesOuter)
        this.tools[this.selectedToolIndex].x2 = x - this.TOOL_THRESHOLD[this.selectedToolType].tool.left
        this.tools[this.selectedToolIndex].y2 = y - this.TOOL_THRESHOLD[this.selectedToolType].tool.top
        this.$forceUpdate()
      }
      else if(this.selectedToolType == this.TOOL_TYPE.draw){
        let { x, y } = this.pointerPos(event.srcEvent, this.$refs.PagesOuter)
        this.tools[this.selectedToolIndex].points = this.tools[this.selectedToolIndex].points.concat([
          x - this.TOOL_THRESHOLD[this.selectedToolType].tool.left,
          y - this.TOOL_THRESHOLD[this.selectedToolType].tool.top
        ])
        this.$forceUpdate()
      }
      
      if (event.isFinal) {
        this.isPanning = false
        this.lastPosX = 0
        this.lastPosY = 0
      }
    },
    onMouseEnterOnPages(){
      if(window.innerWidth < 800) return
      this.showToolIdentifier = true
    },
    onMouseLeaveFromPages(){
      if(window.innerWidth < 800) return
      this.showToolIdentifier = false
    },
    onMouseMoveOnPages(event){
      if(window.innerWidth < 800) return
      if(!this.selectedToolType) return
      let { x, y } = this.pointerPos(event, this.$refs.PagesOuter)
      this.toolIdentifierPosition.top = y - this.TOOL_THRESHOLD[this.selectedToolType].identifier.top
      this.toolIdentifierPosition.left = x - this.TOOL_THRESHOLD[this.selectedToolType].identifier.left
    },
    onToolChange(type){
      this.selectedToolType = type
    },
    pointerPos(event, parent){
      let eventDoc, doc, body
      event = event || window.event
      let x = 0
      let y = 0
      if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document
        doc = eventDoc.documentElement
        body = eventDoc.body

        event.pageX = event.clientX +
          (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
          (doc && doc.clientLeft || body && body.clientLeft || 0)
        event.pageY = event.clientY +
          (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
          (doc && doc.clientTop  || body && body.clientTop  || 0 )
      }

      x = event.pageX
      y = event.pageY

      if(parent){
        x = x - parent.offsetLeft
        y = y - parent.offsetTop
      }

      return { x, y }
    },
    onCLickSinglePageOuter(event){
      if(
        !this.selectedToolType
        || this.selectedToolType == this.TOOL_TYPE.line
        || this.selectedToolType == this.TOOL_TYPE.draw
      ) return
      this.placeTool(event, this.$refs.PagesOuter)
    },
    placeTool(e, parent){
      let { x, y } = this.pointerPos(e, parent || this.$refs.PagesOuter)
      let obj = {
        type: this.TOOL_TYPE[this.selectedToolType],
        top: y - this.TOOL_THRESHOLD[this.selectedToolType].tool.top,
        left: x - this.TOOL_THRESHOLD[this.selectedToolType].tool.left,
      }
      if(this.selectedToolType == this.TOOL_TYPE.line){
        obj.x1 = obj.left
        obj.y1 = obj.top
        delete obj.left
        delete obj.top
      }
      else if(this.selectedToolType == this.TOOL_TYPE.draw){
        obj.points = [ obj.left, obj.top ]
      }
      this.tools.push(obj)
    },
    async fetchPdf(){
      let res = await fetch(demoPdf)
      let blob = await res.blob()
      let pdfAsDataUri = await (new Promise((resolve, reject)=>{
        const reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      }))
      
      let pdfAsArray = this.convertDataURIToBinary(pdfAsDataUri)
      let doc = pdfJs.getDocument(pdfAsArray)
      this.pdf = await doc.promise
    },
    convertDataURIToBinary(dataURI) {
      let BASE64_MARKER = ';base64,'
      var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
      var base64 = dataURI.substring(base64Index);
      var raw = window.atob(base64);
      var rawLength = raw.length;
      var array = new Uint8Array(new ArrayBuffer(rawLength));

      for(var i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
      }
      return array;
    }
  },
}
</script>

<style lang="scss" scoped>
.pdf-editor-view{
  background-color: #E9E9E9;
  .pdf-pages-outer{
    max-width: 700px;
    position: relative;
  }
}
</style>