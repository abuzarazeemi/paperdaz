<template>
  <div class="tool-wrapper" :style="style" ref="Wrp">
    <div class="tool-menu">
      <div class="drag" v-hammer:pan="handleDrag">DR</div>
    </div>
    <component :is="`${tool.type}-tool`" />
  </div>
</template>

<script>
import TextTool from './tools/Text'
export default {
  props: {
    tool: Object
  },
  components: { TextTool, },
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
    style(){
      return {
        top: `${this.top}px`,
        left: `${this.left}px`,
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