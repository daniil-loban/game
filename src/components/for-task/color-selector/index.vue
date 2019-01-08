<template>
  <div>
    <div
      id="colors"
      class="flex-row"
      @click="select"
    >
      <div
        id="color1"
        class="rectangle"
        :style="{backgroundColor: color1}"
      />
      <div
        id="color2"
        class="rectangle"
        :style="{backgroundColor: color2}"
      />
      <div
        id="color3"
        class="rectangle"
        :style="{backgroundColor: color3}"
      />
    </div>
  </div>
</template>

<script>
import keyboardMixin from '../../mixins/keyboard';

const shuffle = require('lodash/shuffle');

export default {
  mixins: [keyboardMixin],
  props: {
    description: {
      type: String,
      default: () => 'description',
    },
    componentInfo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      taskRandom: null,
      selected: null,
      color1: 'white',
      color2: 'white',
      color3: 'white',
      colors: null,
    };
  },
  mounted() {
    this.taskRandom = Math.floor(Math.random() * 3);
    this.colors = shuffle(this.componentInfo.data);
    this.$emit('set-description', this.description.replace('$', this.colors[this.taskRandom].name));
    this.color1 = this.colors[0].value;
    this.color2 = this.colors[1].value;
    this.color3 = this.colors[2].value;
    this.selectedindex = -1;
  },
  methods: {
    keyDown(key) {
      const parent = this.$el.querySelector('#colors');
      const child = parent.querySelector('.selected');
      this.selectedindex = Array.prototype.indexOf.call(parent.children, child);
      switch (key) {
        case 'Enter':
        case 'Space':
          this.$parent.$emit('closeme', '');
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          if (this.selectedindex === 0 || this.selectedindex === -1) {
            this.selectedindex = parent.children.length;
          }
          this.selectedindex -= 1;
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          if (this.selectedindex === parent.children.length - 1) {
            this.selectedindex = -1;
          }
          this.selectedindex += 1;
          break;
        default:
          break;
      }
      this.select({
        target: parent.children[this.selectedindex],
        currentTarget: parent,
      });
    },
    select(event) {
      const child = event.target;
      if (child !== event.currentTarget) {
        const parent = event.currentTarget;
        if (this.selected !== null) {
          parent.children[this.selected].classList.remove('selected');
        }
        this.selected = Array.prototype.indexOf.call(parent.children, child);
        child.classList.add('selected');
        // let compStyles = window.getComputedStyle(child);
        // console.log(compStyles.getPropertyValue('background-color'))
        this.$parent.setResult(this.selected === this.taskRandom);
      }
    },
  },
};
</script>

<!--
<style lang="scss" scoped>
   @import 'index.scss';
</style>
-->

<!--<style lang="scss" src="../styles.scss" ></style> -->
<style lang="scss" src="./index.scss" ></style>
