<template>
  <div class="tool-wrapper" :style="wrpStyle" ref="Wrp">
    <div class="tool-menu">
      <div class="drag" v-hammer:pan="handleDrag">DR</div>
    </div>
      <component :is="`${tool.type}-tool`" :tool="tool" :x1="x1" :y1="y1" :x2="x2" :y2="y2" :points="points" />
    <!-- <div class="tool-inner">
    </div> -->
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
export default {
  props: {
    tool: Object,
    x1: Number,
    y1: Number,
    x2: Number,
    y2: Number,
    points: Array,
  },
  components: { TextTool, TickTool, CrossTool, DotTool, CircleTool, LineTool, DrawTool, },
  data: () => ({
    lastPosX: 0,
    lastPosY: 0,
    isDragging: false,
    top: 100,
    left: 0,
  }),
  created(){
    this.checkAndSetPosition()
  },
  computed: {
    wrpStyle(){
      let top = this.top
      let left = this.left
      if(this.points){
        top = Math.min(this.points.filter((v, i) => i % 2 == 1))
        left = Math.min(this.points.filter((v, i) => i % 2 == 0))
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
      return {
        top: `${top}px`,
        left: `${left}px`,
      }
    },
  },
  methods: {
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
}
</style>