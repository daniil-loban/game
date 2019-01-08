<template>
  <div class="screen-wrapper background">
    <div class="flex-column">
      <div>
        <span class="ugly big-font">
          Ха-ха!
        </span>
      </div>
      <div>
        <p
          v-if="userName === ''"
          class="ugly big-font"
        >
          ты - просто
        </p>
        <p
          v-if="userName === ''"
          class="ugly big-font"
        >
          пустое место!
        </p>
        <p
          v-if="userName !== ''"
          class="ugly big-font"
        >
          Я буду звать тебя
        </p>
        <p
          v-if="userName !== ''"
          class="ugly big-font"
        >
          "{{ userName }}"
        </p>
      </div>
      <span class="beautiful">
        {{ promptToInputName }}
      </span>
      <input
        v-model="userName"
        class="user"
        type="text"
        maxlength="12"
      >
      <button
        class="user"
        @click="goToBattle"
      >
        Далее
      </button>
    </div>
  </div>
</template>

<script>
import keyboardMixin from '../../components/mixins/keyboard';
// const model = require('./index.js');

export default {
  mixins: [keyboardMixin],
  data() {
    return {
      userName: this.$store.state.userName,
      promptToInputName: this.$root.getSettings('loginPagePhrases').promptToInputName,
    };
  },
  mounted() {
    this.$el.querySelector('input').focus();
    this.$el.querySelector('input').select();
  },
  methods: { 
    keyDown(key) {
      if (key === 'Enter') {
        this.$store.dispatch('userName', this.userName);
        this.$root.goToBattle();
      }
    },
    goToBattle() {
      this.$store.dispatch('userName', this.userName);
      this.$root.goToBattle();
    },
  },
};
</script>


<style lang="scss" src="../styles.scss" ></style>
<style lang="scss" src="./index.scss" ></style>
