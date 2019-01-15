<template>
  <figure>
    <audio
      controls
      :src="fileSrc"
    >
      Your browser does not support the
      <code>audio</code> element.
    </audio>
    <div>
      <input
        v-model="enteredAnswer"
        type="text"
        :placeholder="placeholder"
        @input="enterText($event)"
      >
    </div>
  </figure>
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
      enteredAnswer: '',
      answer: '',
      fileSrc: '',
      placeholder: '',
      variants: [],
      selectedIndex: -1,
    };
  },
  mounted() {
    function zfill(num, len) { return (Array(len).join('0') + num).slice(-len); }
    const ENGLISH = 0;
    const { data } = this.componentInfo;
    const random = Math.floor(Math.random() * data.words.length);
    this.fileSrc = `${data.path}${data.prefix}${zfill(random, data.zeros)}${data.ext}`;
    this.answer = data.words[random].split(data.separator)[ENGLISH].toLowerCase();
    const description = this.$parent.getDescription();
    this.$parent.setDescription(description);

    this.variants = data.words.map(e => e.split(data.separator)[ENGLISH]).sort();
    this.makeAlphabetNavigator();
  },
  updated(){
    this.$el.querySelector('input').focus();
  },
  methods: {
    keyDown(key) {
      switch (key) {
        case 'Enter':
          this.$parent.$emit('closeme', '');
          break;
        case 'Space':
          this.$el.querySelector('audio').play();
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
      const alphabet = 'abcdefghiklmnopqrstvxyz';
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
      if (this.answer instanceof Array) {
        this.$parent.setResult(this.answer.indexOf(this.enteredAnswer.toLowerCase()) !== -1);
      } else {
        this.$parent.setResult(this.answer === this.enteredAnswer.toLowerCase());
      }
    },
  },
};
</script>
