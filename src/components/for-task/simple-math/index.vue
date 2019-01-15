<template>
  <div>
    <span>{{ expression }} =</span>
    <input
      v-model="enteredAnswer"
      type="text"
      :placeholder="placeholder"
      @input="check($event)"
    >
  </div>
</template>

<script>
import keyboardMixin from '../../mixins/keyboard';
import GeneratorExpressions from './index';

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
      enteredAnswer: '',
      placeholder: this.componentInfo.data.placeholder,
      expression: null,
      expected: null,
      countVariants: 10,
      variants: [],
      selectedVariant: -1,
    };
  },
  mounted() {
    const ge = new GeneratorExpressions
      .GeneratorExpressions(this.componentInfo.data.operation);
    const { expected, expression } = ge.getExpression();
    this.expected = expected;
    this.expression = expression;
    this.variants = Array.apply(Array, new Array(this.countVariants))
      .map(() => this.expected - Math.floor(Math.random() * this.expected * 2));
    this.variants[Math.floor(Math.random() * this.countVariants)] = this.expected;

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
        case 'ArrowUp':
          if (this.selectedVariant === 0 || this.selectedVariant === -1) {
            this.selectedVariant = this.countVariants;
          }
          this.selectedVariant -= 1;
          this.enteredAnswer = this.variants[this.selectedVariant];
          this.check();
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          if (this.selectedVariant === this.countVariants - 1) {
            this.selectedVariant = -1;
          }
          this.selectedVariant += 1;
          this.enteredAnswer = this.variants[this.selectedVariant];
          this.check();
          break;
        default:
          break;
      }
    },
    check() {
      this.$parent.setResult(+this.enteredAnswer === this.expected);
    },
  },
};
</script>
