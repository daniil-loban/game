<template>
  <div>
    <div class="flex-column">
      <img
        :src="imageSrc"
        width="120px"
        height="120px"
      >
      <div>
        <input
          v-model="enteredAnswer"
          type="text"
          :placeholder="placeholder"
          @input="enterText($event)"
        >
      </div>
    </div>
  </div>
</template>

<script>
import keyboardMixin from '../../mixins/keyboard';

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
      alphabet: null,
      answer: '',
      enteredAnswer: '',
      imageSrc: '',
      properties: null,
      variants: [],
      selectedIndex: -1,
    };
  },
  mounted() {
    const { imagesInfo } = this.componentInfo.data;
    const random = Math.floor(Math.random() * imagesInfo.files.length);
    this.imageSrc = imagesInfo.files[random].file;
    this.answer = imagesInfo.files[random].rus;
    this.variants = imagesInfo.files.map(e => e.rus[0]).sort();
    this.makeAlphabetNavigator();
  },
  updated(){
    this.$el.querySelector('input').focus();
 
  },
  methods: {
    keyDown(key) {
      switch (key) {
        case 'Enter':
        case 'Space':
          this.$parent.$emit('closeme', '');
          break;
        case 'ArrowLeft':
          if (this.selectedIndex !== 0) {
            this.selectedIndex -= 1;
            this.enterWordByCurrrentIndex();
          }
          break;
        case 'ArrowRight':
          if (this.selectedIndex !== this.variants.length - 1) {
            this.selectedIndex += 1;
            this.enterWordByCurrrentIndex();
          }
          break;
        case 'ArrowUp':
          this.gotoPreviousLetter();
          this.enterWordByCurrrentIndex();
          break;
        case 'ArrowDown':
          this.gotoNextLetter();
          this.enterWordByCurrrentIndex();
          break;
        default:
          break;
      }
    },
    enterWordByCurrrentIndex() {
      this.enteredAnswer = this.variants[this.selectedIndex];
      this.enterText();
    },
    gotoNextLetter() {
      const filteredAlpabet = this.alphabet.filter(e => e > this.selectedIndex);
      if (filteredAlpabet.length === 0) {
        this.selectedIndex = this.variants.length - 1;
      } else {
        this.selectedIndex = Math.min(...filteredAlpabet);
      }
    },
    gotoPreviousLetter() {
      const filteredAlpabet = this.alphabet.filter(e => e < this.selectedIndex);
      if (filteredAlpabet.length === 0) {
        this.selectedIndex = 0;
      } else {
        this.selectedIndex = Math.max(...filteredAlpabet);
      }
    },
    makeAlphabetNavigator() {
      const alphabet = 'абвгдежзийклмнопрстуфхцчшщъыьэюя';
      const trimVariants = this.variants.map(e => e[0]);
      this.alphabet = alphabet.split('').reduce((acc, e) => {
        const index = trimVariants.indexOf(e);
        if (index !== -1) {
          return acc.concat(index);
        }
        return acc;
      }, []);
    },
    enterText() {
      const userAnswer = this.enteredAnswer.toLowerCase().trim();
      if (this.answer instanceof Array) {
        this.$parent.setResult(this.answer.indexOf(userAnswer) !== -1);
      } else {
        this.$parent.setResult(this.answer === userAnswer);
      }
    },
  },
};
</script>

<style lang="scss" src="./index.scss" ></style>
