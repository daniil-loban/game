<template>
  <div class="builder">
    <div
      id="phrase"
      class="border drop-area"
    />
    <div
      id="words"
      class="border drop-area"
    >
      <span
        v-for="(word, index) in words"
        :id="word+index"
        :key="word"
        class="drag-element"
      >
        {{ word }}
      </span>
    </div>
  </div>
</template>

<script>
import moduleDragDrop from '../../drag-drop/drag-drop';
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
      phrase: null,
      words: null,
      selectedArea: null,
      oppositeArea: null,
      selectedWordIndex: -1,
    };
  },
  mounted() {
    const RUSSIAN = 0;
    const ENGLISH = 1;
    const { data } = this.componentInfo;
    const random = Math.floor(Math.random() * data.ru_en.length);
    this.$emit('set-description', `${this.description}\xA0:\n"${data.ru_en[random][RUSSIAN]}"`);
    this.phrase = data.ru_en[random][ENGLISH];
    this.makeParts();
  },
  updated() {
    moduleDragDrop.addDragDropListener(this.callback);
  },
  methods: {
    swapAreaFocus() {
      const areas = ['#phrase', '#words'];
      const TOP_AREA = 0;
      const BOTTOM_AREA = 1;
      let newSelectedArea;
      if (this.selectedArea === this.$el.querySelector(areas[TOP_AREA])) {
        newSelectedArea = this.$el.querySelector(areas[BOTTOM_AREA]);
        if (newSelectedArea.hasChildNodes()) {
          this.oppositeArea = this.$el.querySelector(areas[TOP_AREA]);
          this.selectedArea = newSelectedArea;
          this.selectedWordIndex = 0; // first in words
        }
      } else {
        newSelectedArea = this.$el.querySelector(areas[TOP_AREA]);
        if (newSelectedArea.hasChildNodes()) {
          this.oppositeArea = this.$el.querySelector(areas[BOTTOM_AREA]);
          this.selectedArea = newSelectedArea;
          this.selectedWordIndex = this.selectedArea.children.length - 1; // last in phrase
        }
      }
      this.hightLightSelectedWord();
    },
    keyDown(key) {
      if (this.selectedArea === null) {
        this.selectedArea = this.$el.querySelector('#words');
        this.oppositeArea = this.$el.querySelector('#phrase');
      }
      switch (key) {
        case 'Enter':
          this.$parent.$emit('closeme', '');
          break;
        case 'Space':
          this.moveWord();
          break;
        case 'ArrowLeft':
          if (this.selectedWordIndex === 0 || this.selectedWordIndex === -1) {
            this.selectedWordIndex = this.selectedArea.children.length;
          }
          this.selectedWordIndex -= 1;
          break;
        case 'ArrowRight':
          if (this.selectedWordIndex === this.selectedArea.children.length - 1) {
            this.selectedWordIndex = -1;
          }
          this.selectedWordIndex += 1;
          break;
        case 'ArrowUp':
        case 'ArrowDown':
          this.swapAreaFocus();
          break;
        default:
          break;
      }
      this.hightLightSelectedWord();
    },
    moveWord() {
      if (this.selectedWordIndex === -1
      || this.selectedWordIndex >= this.selectedArea.children.length) {
        return;
      }
      this.oppositeArea.appendChild(this.selectedArea.children[this.selectedWordIndex]);
      this.selectedWordIndex = -1;
      if (!this.selectedArea.hasChildNodes()) {
        this.swapAreaFocus();
      }
    },
    hightLightSelectedWord() {
      const oldSelection = this.$el.querySelector('.selected');
      if (oldSelection !== null) {
        oldSelection.classList.remove('selected');
      }
      if (this.selectedWordIndex !== -1
        && this.selectedWordIndex < this.selectedArea.children.length) {
        this.selectedArea.children[this.selectedWordIndex].classList.add('selected');
      }
    },
    hideSelectionFromWord() {
      this.selectedWordIndex = -1;
      this.hightLightSelectedWord();
    },

    callback() {
      const element = document.querySelector('#phrase');
      const result = element.textContent.replace(/\s\s+/g, ' ').trim();
      this.$parent.setResult(result === this.phrase);
      this.hideSelectionFromWord();
    },
    makeParts() {
      let convenient = this.phrase;
      convenient = convenient.replace(/([^ a-zа-яё\d])/uig, ' $1 ');
      convenient = convenient.replace(/\s\s+/g, ' ');
      this.words = shuffle(convenient.split(' '));
    },
  },
};
</script>

<style lang="scss" src="./index.scss" ></style>
