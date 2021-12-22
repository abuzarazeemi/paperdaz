<template>
  <div class="pdf-editor-view">
    <tool-bar @tool-change="onToolChange" />
    <!-- {{tools}} -->
    <div v-if="pdf" class="pdf-pages-wrapper flex flex-col items-center">
      <div class="pdf-pages-outer pb-6" ref="PagesOuter">
        <tool-wrapper 
          v-for="(tool, tI) in tools" :key="`tool-${tI}`" 
          :dragHandler="handlePanning" 
          :index="tI" :tool="tool" :type="tool.type" 
          :top="tool.top" :left="tool.left"
          :x1="tool.x1" :y1="tool.y1" :x2="tool.x2" :y2="tool.y2" 
          :points="tool.points" 
          :deleteTool="deleteTool"
          :handleIncrease="handleIncrease"
          :handleDecrease="handleDecrease"
          :fontSize="tool.fontSize"
          :scale="tool.scale"
        />
        <!-- <component :is="`${selectedToolType}-identifier`" v-if="selectedToolType && showToolIdentifier" :position="toolIdentifierPosition" /> -->
        <div 
          class="pdf-single-pages-outer" ref="pdf-single-pages-outer" 
          v-hammer:pan="(ev) => handlePanning(ev)" @click="onCLickSinglePageOuter" 
          @mousemove="onMouseMoveOnPages" @mouseleave="onMouseLeaveFromPages"
        >
          <div class="pdf-single-page-outer" v-for="(page, pI) in pdf.numPages" :key="pI">
            <div class="mt-6 page-break" v-if="pI > 0"></div>
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

export default {
  components: { 
    PdfPage, ToolWrapper, ToolBar,
    TextIdentifier, TickIdentifier, CrossIdentifier, DotIdentifier, CircleIdentifier, LineIdentifier, HighlightIdentifier, 
    DrawIdentifier, DateIdentifier, NameIdentifier, InitialIdentifier,
  },
  created(){
    this.fetchPdf()
    this.$BUS.$on('download-pdf', this.downloadPdf)
  },
  beforeDestroy(){
    this.$BUS.$off('download-pdf')
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
    TOOL_DIRECTION(){ return TOOL_DIRECTION },
    TOOL_THRESHOLD(){
      return {
        [TOOL_TYPE.text]: { identifier: { top: 20, left: 0 }, tool: { top: 12, left: 0 } },
        [TOOL_TYPE.tick]: { identifier: { top: 20, left: 0 }, tool: { top: 20, left: 0 } },
        [TOOL_TYPE.cross]: { identifier: { top: 20, left: 0 }, tool: { top: 20, left: 0 } },
        [TOOL_TYPE.dot]: { identifier: { top: 20, left: 0 }, tool: { top: 10, left: 0 } },
        [TOOL_TYPE.circle]: { identifier: { top: 20, left: 0 }, tool: { top: 20, left: 0 } },
        [TOOL_TYPE.line]: { identifier: { top: 20, left: 0 }, tool: { top: 0, left: 10 } },
        [TOOL_TYPE.highlight]: { identifier: { top: 20, left: 0 }, tool: { top: 5, left: 10 } },
        [TOOL_TYPE.draw]: { identifier: { top: 20, left: 0 }, tool: { top: 0, left: 0 } },
        [TOOL_TYPE.date]: { identifier: { top: 20, left: 0 }, tool: { top: 12, left: 0 } },
        [TOOL_TYPE.name]: { identifier: { top: 20, left: 0 }, tool: { top: 12, left: 0 } },
        [TOOL_TYPE.initial]: { identifier: { top: 20, left: 0 }, tool: { top: 12, left: 0 } },
      }
    },
    selectedTool(){
      this.selectedToolIndex < 0 ? null : this.tools[this.selectedToolIndex]
    },
  },
  methods: {
    handleIncrease(index){
      let tool = this.tools[index]
      if(
        tool.type == this.TOOL_TYPE.text
        || tool.type == this.TOOL_TYPE.date
        || tool.type == this.TOOL_TYPE.name
        || tool.type == this.TOOL_TYPE.initial
      ){
        let fontSize = tool.fontSize || 12
        this.tools[index].fontSize = ++fontSize
      }else if(
        tool.type == this.TOOL_TYPE.tick
        || tool.type == this.TOOL_TYPE.cross
        || tool.type == this.TOOL_TYPE.dot
        || tool.type == this.TOOL_TYPE.circle
      ){
        let scale = tool.scale || 1
        scale += 0.1
        this.tools[index].scale = scale
      }
      this.$forceUpdate()
    },
    handleDecrease(index){
      let tool = this.tools[index]
      if(
        tool.type == this.TOOL_TYPE.text
        || tool.type == this.TOOL_TYPE.date
        || tool.type == this.TOOL_TYPE.name
        || tool.type == this.TOOL_TYPE.initial
      ){
        let fontSize = tool.fontSize || 12
        this.tools[index].fontSize = --fontSize
      }else if(
        tool.type == this.TOOL_TYPE.tick
        || tool.type == this.TOOL_TYPE.cross
        || tool.type == this.TOOL_TYPE.dot
        || tool.type == this.TOOL_TYPE.circle
      ){
        let scale = tool.scale || 1
        scale -= 0.1
        this.tools[index].scale = scale
      }
      this.$forceUpdate()
    },
    downloadPdf(){
      console.log('d')
      let options = {
        pagebreak: { avoid: '.page-break', after: '.page-break' },
      }
      html2pdf().set(options).from(this.$refs.PagesOuter).save()
    },
    deleteTool(index){
      this.tools.splice(index, 1)
      this.$forceUpdate()
    },
    handlePanning(event, index = undefined, direction = undefined){
      var elem = this.$refs['pdf-single-pages-outer']
      
      if ( ! this.isPanning && index == undefined ) {
        this.isPanning = true
        this.lastPosX = elem.offsetLeft
        this.lastPosY = elem.offsetTop
        if(this.selectedToolType == this.TOOL_TYPE.line){
          this.placeTool(event.srcEvent, null)
          this.selectedToolIndex = this.tools.length - 1
        }
        else if(this.selectedToolType == this.TOOL_TYPE.highlight){
          this.placeTool(event.srcEvent, null)
          this.selectedToolIndex = this.tools.length - 1
        }
        else if(this.selectedToolType == this.TOOL_TYPE.draw){
          this.placeTool(event.srcEvent, null)
          this.selectedToolIndex = this.tools.length - 1
        }
      }else if(index != undefined && this.selectedToolIndex != index) {
        this.selectedToolIndex = index
      }

      var posX = event.deltaX + this.lastPosX
      var posY = event.deltaY + this.lastPosY

      if(this.selectedToolType == this.TOOL_TYPE.line){
        let { x, y } = this.pointerPos(event.srcEvent, this.$refs.PagesOuter)
        if(direction && direction == this.TOOL_DIRECTION.left){
          this.tools[this.selectedToolIndex].x1 = x - this.TOOL_THRESHOLD[this.selectedToolType].tool.left
          this.tools[this.selectedToolIndex].y1 = y - this.TOOL_THRESHOLD[this.selectedToolType].tool.top
        }
        else{
          this.tools[this.selectedToolIndex].x2 = x - this.TOOL_THRESHOLD[this.selectedToolType].tool.left
          this.tools[this.selectedToolIndex].y2 = y - this.TOOL_THRESHOLD[this.selectedToolType].tool.top
        }
        this.$forceUpdate()
      }
      else if(this.selectedToolType == this.TOOL_TYPE.highlight){
        let { x, y } = this.pointerPos(event.srcEvent, this.$refs.PagesOuter)
        if(direction && direction == this.TOOL_DIRECTION.left){
          this.tools[this.selectedToolIndex].x1 = x - this.TOOL_THRESHOLD[this.selectedToolType].tool.left
        }else{
          this.tools[this.selectedToolIndex].x2 = x - this.TOOL_THRESHOLD[this.selectedToolType].tool.left
        }
        this.tools[this.selectedToolIndex].y2 = this.tools[this.selectedToolIndex].y1 + 15
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
      // if(window.innerWidth < 800) return
      // if(!this.selectedToolType) return
      // if(!this.showToolIdentifier) this.showToolIdentifier = true
      // let { x, y } = this.pointerPos(event, this.$refs.PagesOuter)
      // this.toolIdentifierPosition.top = y - this.TOOL_THRESHOLD[this.selectedToolType].identifier.top
      // this.toolIdentifierPosition.left = x - this.TOOL_THRESHOLD[this.selectedToolType].identifier.left
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
        || this.selectedToolType == this.TOOL_TYPE.highlight
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
      else if(this.selectedToolType == this.TOOL_TYPE.highlight){
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