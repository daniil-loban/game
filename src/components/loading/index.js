import Vue from 'vue';
import loaderComponent from './index.vue';

const loaderDiv = document.createElement('div');
loaderDiv.setAttribute('id', 'loader');
document.body.appendChild(loaderDiv);

const loaderView = new Vue({
  el: '#loader',
  data: {
    currentRoute: null,
  },
  computed: {
    ViewComponent() {
      return this.currentRoute;
    },
  },
  beforeCreate() {

  },
  methods: {
    show() {
      this.currentRoute = loaderComponent;
    },
    hide() {
      this.currentRoute = null;
    },
  },
  render(h) {
    return h(this.ViewComponent);
  },
});

export default {
  show: loaderView.show,
  hide: loaderView.hide,
};
