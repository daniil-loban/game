<template>
  <div>
    <div class="screen-wrapper background">
      <div class="flex-column">
        <h1 class="big-font ugly">
          Ха-ха ты набрал всего лишь: {{ this.$store.state.userScore }}&nbsp;баллов!
        </h1>
        <div class="msg ugly">
          {{ monstrMessage }}
        </div>
        <p class="beautiful">
          Ты всегда можешь вернуться, чтобы снова сразиться.
        </p>
        <button
          class="user"
          @click="goToBattle"
        >
          играть
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import keyboardMixin from '../../components/mixins/keyboard';

export default {
  mixins: [keyboardMixin],
  data() {
    return {
      monstrMessage: '',
    };
  },
  methods: {
    goToBattle(){
      this.$root.goToBattle();
    },
    keyDown(key) {
      if (key === 'Space' || key === 'Enter') {
        this.goToBattle();
      }
    },
  },
};
</script>

<style lang="scss" src="../styles.scss" ></style>
<style lang="scss" src="./index.scss" ></style>
