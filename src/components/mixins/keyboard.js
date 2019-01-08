const singleton = Symbol('');
const singletonEnforcer = Symbol('');
const stackServiced = [];

function keyDown(event) {
  if (stackServiced.length === 0) return;
  const callback = stackServiced[stackServiced.length - 1];
  switch (event.code) {
    case 'ArrowLeft':
    case 'ArrowRight':
    case 'ArrowUp':
    case 'ArrowDown':
    case 'Enter':
      callback(event.key);
      break;
    case 'Space':
      callback('Space');
      break;
    default:
      window.console.log('event other');
  }
}

class Keyboard {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw Error('Instantiation failed: use Keyboard.getInstance() instead of new.');
    }
    this.stackServiced = stackServiced;
    document.addEventListener('keydown', keyDown, false);
  }

  addFunction(callback) {
    this.stackServiced.push(callback);
  }

  removeFunction() {
    this.stackServiced.pop();
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new Keyboard(singletonEnforcer);
    }
    return this[singleton];
  }

  static set instance(v) {
    throw Error("Can't change constant property!");
  }
}

const keyboardMixin = {
  data() {
    return {
      keyboard: Keyboard.instance,
    };
  },
  mounted() {
    this.keyboard.addFunction(this.keyDown);
  },
  beforeDestroy() {
    this.keyboard.removeFunction();
  },
  methods: {
    keyDown(key) {
      window.console.log('in mixin', key);
    },
  },
};

export default keyboardMixin;
