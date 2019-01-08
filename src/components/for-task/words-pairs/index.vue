<template>
  <div>
    <div id="grid">
      <table id="table-of-counties">
        <thead>
          <th>Cрана</th>
          <th>Столица</th>
        </thead>
        <tbody>
          <tr
            v-for="country in countries"
            :key="country"
          >
            <td>{{ country }}</td><td
              data-maxchildren="1"
              class="border drop-area"
            />
          </tr>
        </tbody>
      </table>
      <div
        id="words"
        class="border drop-area words-bank"
      >
        <span
          v-for="(capital, index) in capitals"
          :id="'capital'+index"
          :key="capital"
          class="drag-element"
        >
          {{ capital }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import keyboardMixin from '../../mixins/keyboard';
import moduleDragDrop from '../../drag-drop/drag-drop';

const shuffle = require('lodash/shuffle');

const ROWS = 5;

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
      answer: [],
      countries: [],
      capitals: [],
      selectedArea: null,
      oppositeArea: null,
      selectedWordIndex: -1,
      selectedPlaceIndex: -1,
    };
  },
  mounted() {
    const { data } = this.componentInfo;
    this.makeParts(data);
  },
  updated() {
    moduleDragDrop.addDragDropListener(this.callback);
  },
  methods: {
    keyDown(key) {
      if (this.selectedArea === null) {
        this.selectedArea = this.$el.querySelector('#words');
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
          if (this.selectedPlaceIndex === 0 || this.selectedPlaceIndex === -1) {
            this.selectedPlaceIndex = ROWS;
          }
          this.selectedPlaceIndex -= 1;
          break;
        case 'ArrowDown':
          if (this.selectedPlaceIndex === ROWS - 1) {
            this.selectedPlaceIndex = -1;
          }
          this.selectedPlaceIndex += 1;
          break;
        default:
          break;
      }
      this.hightLightSelected();
    },
    moveWord() {
      if (this.selectedPlaceIndex === -1) {
        return;
      }

      const tbody = this.$el.querySelector('tbody');
      this.oppositeArea = tbody.children[this.selectedPlaceIndex].lastChild;

      if (this.oppositeArea) {
        if (this.oppositeArea.children.length === 1) {
          const oldChild = this.oppositeArea.children[0];
          this.selectedArea.appendChild(oldChild);
        }
      }

      if (this.selectedWordIndex !== -1
          && this.selectedWordIndex < this.selectedArea.children.length) {
        this.oppositeArea.appendChild(this.selectedArea.children[this.selectedWordIndex]);
      }

      this.selectedWordIndex = -1;
      this.selectedPlaceIndex = -1;
    },
    hightLightSelected() {
      const oldSelection = this.$el.querySelector('.selected');
      if (oldSelection !== null) oldSelection.classList.remove('selected');

      if (this.selectedWordIndex !== -1
        && this.selectedWordIndex < this.selectedArea.children.length) {
        this.selectedArea.children[this.selectedWordIndex].classList.add('selected');
      }

      const oldSelectionPlace = this.$el.querySelector('.selected-place');
      if (oldSelectionPlace !== null) oldSelectionPlace.classList.remove('selected-place');

      if (this.selectedPlaceIndex !== -1
        && this.selectedPlaceIndex < ROWS) {
        const tbody = this.$el.querySelector('tbody');
        tbody.children[this.selectedPlaceIndex].classList.add('selected-place');
        this.oppositeArea = tbody.children[this.selectedPlaceIndex].lastChild;
      }
    },

    hideSelections() {
      this.selectedWordIndex = -1;
      this.selectedPlaceIndex = -1;
      this.hightLightSelected();
    },

    callback() {
      const tbody = this.$el.querySelector('tbody');
      const result = tbody.textContent.replace(/\s\s+/g, ' ').trim();
      this.$parent.setResult(result === this.answer.join(' '));
      this.hideSelections();
    },
    makeParts(data) {
      const randomArr = Array.apply(Array, new Array(ROWS))
        .map(() => Math.floor(Math.random() * data.countries.length));
      for (let i = 0; i < ROWS; i += 1) {
        const { country } = data.countries[randomArr[i]];
        const { capital } = data.countries[randomArr[i]];
        this.countries.push(country);
        this.capitals.push(capital);
        this.answer.push(country, capital);
      }
      this.capitals = shuffle(this.capitals);
    },
  },
};
</script>

<style lang="scss" src="./index.scss" ></style>
