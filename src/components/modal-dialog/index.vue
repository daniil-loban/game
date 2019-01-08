<template>
  <div
    v-if="showModal"
    class="modal-mask"
    tabindex="-1"
    focusable="false"
  >
    <div
      class="modal-wrapper"
      tabindex="-1"
      focusable="false"
    >
      <div
        class="modal-container"
        tabindex="-1"
        focusable="false"
      >
        <div class="modal-header">
          <h3>{{ caption }}</h3>
        </div>
        <div class="modal-body">
          <KeepAlive>
            <Component
              :is="componentLoader"
              @closeme="hide()"
            />
          </KeepAlive>
        </div>
        <div class="modal-footer">
          <button
            class="modal-default-button"
            @click="hide()"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: { },
  data() {
    return {
      component: null,
      showModal: this.$parent.showModal,
      caption: '',
    };
  },
  computed: {
    componentLoader() {
      return () => import(`../tasks/${this.$root.bodyComponentPath}/index.vue`);
    },
  },
  methods: {
    setCaption(caption) {
      this.caption = caption;
    },
    setResult(result) {
      this.$root.setResult(result);
    },
    hide() {
      this.$root.hide();
    },
  },
};
</script>

<style lang="scss" src="./index.scss" ></style>
