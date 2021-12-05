<template>
  <div class="tool-wrapper" :style="wrpStyle" ref="Wrp">
    <div class="tool-menu flex" v-if="isActive">
      <div class="drag" v-hammer:pan="handleDrag">DR</div> - 
      <div class="delete" @click="$emit('delete-tool', tool)">DeLeTe</div> - 
      <div class="delete" @click="onOutsideClick">OK</div>
    </div>
    <component @click="onClick" :is="`${tool.type}-tool`" :tool="tool" :top="top" :left="left" :x1="x1" :y1="y1" :x2="x2" :y2="y2" :points="points" :isActive="isActive" />
  </div>
</template>

<script>
import TextTool from './tools/Text'
import TickTool from './tools/Tick'
import CrossTool from './tools/Cross'
import DotTool from './tools/Dot'
import CircleTool from './tools/Circle'
import LineTool from './tools/Line'
import DrawTool from './tools/Draw'
import HighlightTool from './tools/Highlight'
export default {
  props: {
    tool: Object,
    x1: Number,
    y1: Number,
    x2: Number,
    y2: Number,
    points: Array,
  },
  components: { TextTool, TickTool, CrossTool, DotTool, CircleTool, LineTool, DrawTool, HighlightTool, },
  data: () => ({
    lastPosX: 0,
    lastPosY: 0,
    isDragging: false,
    top: 100,
    left: 0,
    isActive: true,
  }),
  created(){
    this.checkAndSetPosition()
    this.clcPos()
  },
  watch: {
    x1(){ this.clcPos() },
    y1(){ this.clcPos() },
    x2(){ this.clcPos() },
    y2(){ this.clcPos() },
    points(){ this.clcPos() },
  },
  computed: {
    wrpStyle(){
      let top = this.top
      let left = this.left
      return {
        top: `${top}px`,
        left: `${left}px`,
      }
    },
  },
  methods: {
    onClick(){
      this.isActive = true
    },
    onOutsideClick(){
      this.isActive = false
    },
    clcPos(){
      let top = this.top
      let left = this.left
      if(this.points){
        top = Math.min(...this.points.filter((v, i) => i % 2 == 1))
        left = Math.min(...this.points.filter((v, i) => i % 2 == 0))
      }else{
        if(this.y1 != null && this.y1 != null){
          if(this.y2 < this.y1) top = this.y2
          else top = this.y1
        }
        if(this.x1 != null && this.x1 != null){
          if(this.x2 < this.x1) left = this.x2
          else left = this.x1
        }
      }
      this.top = top
      this.left = left
    },
    checkAndSetPosition(){
      if(this.tool.top) this.top = this.tool.top
      if(this.tool.left) this.left = this.tool.left
    },
    handleDrag(event){
      var elem = this.$refs.Wrp
      
      if ( ! this.isDragging ) {
        this.isDragging = true
        this.lastPosX = elem.offsetLeft
        this.lastPosY = elem.offsetTop
      }

      var posX = event.deltaX + this.lastPosX
      var posY = event.deltaY + this.lastPosY

      this.left = posX
      this.top = posY
      
      if (event.isFinal) {
        this.isDragging = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import './scss/tools.scss';
.tool-menu{
  height: 24px;
  min-width: 100px;
  width: max-content;
  position: absolute;
  top: -24px;
}
</style>