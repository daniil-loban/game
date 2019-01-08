<template>
  <div
    class="wrapper-splash"
    @click="hideLoader"
  >
    <div class="flex-column">
      <img
        src="./images/loader_2.svg"
        alt="Идет загрузка..."
      >
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {

    };
  },
  methods: {
    hideLoader() {
      this.$root.hide();
    },
  },
};
</script>


<style lang="scss" src="./index.scss" ></style>
