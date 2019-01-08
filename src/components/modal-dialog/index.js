import Vue from 'vue';
import modalComponent from './index.vue';
import store from '../store/store';

const modalDiv = document.createElement('modal');
modalDiv.setAttribute('id', 'modal');
document.body.appendChild(modalDiv);

function defer() {
  let res;
  let rej;
  const promise = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  promise.resolve = res;
  promise.reject = rej;
  return promise;
}

const modalView = new Vue({
  el: '#modal',
  store,
  data: {
    showModal: false,
    bodyComponentPath: '',
    currentRoute: null,
    result: null,
    deferPromise: null,
  },
  computed: {
    ViewComponent() {
      return this.currentRoute;
    },
  },
  methods: {
    setResult(result) {
      this.result = result;
    },
    hide() {
      this.showModal = false;
      this.currentRoute = null;
      if (this.deferPromise !== null) {
        this.deferPromise.resolve(this.result);
        this.deferPromise = null;
        this.result = null;
      }
    },
    show(bodyComponentPath) {
      setTimeout(() => {
        this.bodyComponentPath = bodyComponentPath;
        this.currentRoute = modalComponent;
        this.showModal = true;
      }, 0);
      this.deferPromise = defer();
      return this.deferPromise;
    },
  },
  render(h) {
    return h(this.ViewComponent);
  },
});

export default {
  show: modalView.show,
  hide: modalView.hide,
};
