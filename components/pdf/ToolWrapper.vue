<template>
  <div class="tool-wrapper" :style="wrpStyle" ref="Wrp">
    <!-- <div class="tool-menu flex" v-if="isActive">
      <div class="drag" v-hammer:pan="handleDrag">DR</div>
      -
      <div class="delete" @click="deleteTool(index)">DeLeTe</div>
      -
      <div
        class="increase"
        @click="handleIncrease(index)"
        v-if="isMenuVisible('increase')"
      >
        Increase
      </div>
      -
      <div
        class="decrease"
        @click="handleDecrease(index)"
        v-if="isMenuVisible('increase')"
      >
        Decrease
      </div>
      -
      <div class="delete" @click="onOutsideClick">OK</div>
    </div> -->
    <div
      class="
        h-8
        rounded-full
        border border-black
        text-black
        inline-flex
        items-center
        px-4
        gap-1.5
        backdrop-blur-sm
        bg-white/30
      "
      v-show="isActive"
    >
      <button class="h-full cursor-move" v-hammer:pan="handleDrag">
        <move-icon />
      </button>

      <button
        class="text-sm px-0.5 h-full"
        @click="handleDecrease(index)"
        v-show="isMenuVisible('increase')"
      >
        A
      </button>
      <button
        class="text-lg px-0.5 h-full"
        @click="handleIncrease(index)"
        v-show="isMenuVisible('increase')"
      >
        A
      </button>
      <button
        class="px-0.5 h-full flex items-center relative text-[15px]"
        @click="openCalendar"
      >
        <calendar-icon />
        <el-date-picker
          ref="datePicker"
          type="date"
          placeholder="Pick a day"
          v-model="calendarValue"
          :default-value="new Date()"
          id="sdfadf"
          hidden
          style="height: 0; width: 0; max-width: 0; margin-0; padding:0; overflow:hidden; position:absolute; top: 100%; right: 50%; transform: translateX(-50%)"
        >
        </el-date-picker>
      </button>
      <button class="px-0.5 h-full" @click="deleteTool(index)">
        <trash-x-icon />
      </button>
      <button class="px-0.5 h-full" @click="onOutsideClick">
        <check-circle-icon />
      </button>
    </div>

    <div @click="onClick" class="tool-holder">
      <component
        :is="`${type}-tool`"
        :x1="x1"
        :y1="y1"
        :x2="x2"
        :y2="y2"
        :points="points"
        :isActive="isActive"
        :fontSize="fontSize"
        :scale="scale"
        :signature="signature"
      />
      <div
        class="dr__right"
        ref="drRight"
        v-hammer:pan="(ev) => handleToolDrag(ev)"
        v-if="isAvailableDrRight"
      ></div>
      <div
        class="dr__left"
        v-hammer:pan="(ev) => handleToolDrag(ev, TOOL_DIRECTION.left)"
        v-if="isAvailableDrLeft"
      ></div>
    </div>
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
import DateTool from './tools/Date'
import NameTool from './tools/Name'
import InitialTool from './tools/Initial'
import SignatureTool from './tools/Signature'
import TOOL_DIRECTION from '@/components/pdf/data/toolDragDirection'
import TOOL_TYPE from '@/components/pdf/data/toolType'
import MoveIcon from '../svg-icons/MoveIcon.vue'
import CalendarIcon from '../svg-icons/CalendarIcon.vue'
import TrashXIcon from '../svg-icons/TrashXIcon.vue'
import CheckCircleIcon from '../svg-icons/CheckCircleIcon.vue'
export default {
  props: {
    tool: Object,
    x1: Number,
    y1: Number,
    x2: Number,
    y2: Number,
    deleteTool: Function,
    points: Array,
    dragHandler: Function,
    index: Number,
    type: String,
    handleIncrease: Function,
    handleDecrease: Function,
    fontSize: Number,
    scale: Number,
    signature: String,
  },
  components: {
    TextTool,
    TickTool,
    CrossTool,
    DotTool,
    CircleTool,
    LineTool,
    DrawTool,
    HighlightTool,
    DateTool,
    NameTool,
    InitialTool,
    SignatureTool,
    MoveIcon,
    CalendarIcon,
    TrashXIcon,
    CheckCircleIcon,
  },
  data: () => ({
    lastPosX: 0,
    lastPosY: 0,
    isDragging: false,
    top: 100,
    left: 0,
    isActive: false,
    calendarValue: undefined,
  }),
  created() {
    this.checkAndSetPosition()
    this.clcPos()
  },
  watch: {
    x1() {
      this.clcPos()
    },
    y1() {
      this.clcPos()
    },
    x2() {
      this.clcPos()
    },
    y2() {
      this.clcPos()
    },
    points() {
      this.clcPos()
    },
  },
  computed: {
    wrpStyle() {
      let top = this.top
      let left = this.left
      return {
        top: `${top}px`,
        left: `${left}px`,
      }
    },
    TOOL_TYPE() {
      return TOOL_TYPE
    },
    TOOL_DIRECTION() {
      return TOOL_DIRECTION
    },
    isAvailableDrRight() {
      return (
        this.isActive &&
        (this.type == this.TOOL_TYPE.line ||
          this.type == this.TOOL_TYPE.highlight)
      )
    },
    isAvailableDrLeft() {
      return (
        this.isActive &&
        (this.type == this.TOOL_TYPE.line ||
          this.type == this.TOOL_TYPE.highlight)
      )
    },
  },
  methods: {
    openCalendar() {
      this.$refs.datePicker.focus()
    },
    isMenuVisible(type) {
      if (
        (type == 'increase' || type == 'decrease') &&
        [
          this.TOOL_TYPE.line,
          this.TOOL_TYPE.highlight,
          this.TOOL_TYPE.draw,
        ].includes(this.type)
      )
        return false
      return true
    },
    handleToolDrag(event, direction) {
      this.dragHandler(event, this.index, direction)
    },
    onClick() {
      this.isActive = true
    },
    onOutsideClick() {
      this.isActive = false
    },
    clcPos() {
      let top = this.top
      let left = this.left
      if (this.points) {
        top = Math.min(...this.points.filter((v, i) => i % 2 == 1))
        left = Math.min(...this.points.filter((v, i) => i % 2 == 0))
      } else {
        if (this.y1 != null && this.y1 != null) {
          if (this.y2 < this.y1) top = this.y2
          else top = this.y1
        }
        if (this.x1 != null && this.x1 != null) {
          if (this.x2 < this.x1) left = this.x2
          else left = this.x1
        }
      }
      this.top = top
      this.left = left

      // if(this.isActive && this.type == this.TOOL_TYPE.line){
      //   if(this.$refs.drRight){
      //     this.$refs.drRight.style.top = `${this.y2}px`
      //   }
      // }
    },
    checkAndSetPosition() {
      if (this.tool.top) this.top = this.tool.top
      if (this.tool.left) this.left = this.tool.left
    },
    handleDrag(event) {
      var elem = this.$refs.Wrp

      if (!this.isDragging) {
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
.tool-menu {
  height: 24px;
  min-width: 100px;
  width: max-content;
  position: absolute;
  top: -24px;
}
.tool-holder {
  position: relative;
  .dr {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: red;
    border-radius: 50%;
    &__right {
      @extend .dr;
      right: -5px;
      top: calc(50% - 5px);
    }
    &__left {
      @extend .dr;
      left: -5px;
      top: calc(50% - 5px);
    }
  }
}
</style>
