<template>
  <div class="screen-wrapper battle-background">
    <div class="scores">
      <div class="user-score">
        <div class="flex-column">
          <div class="hp-wrapper">
            <div
              :style="{width: this.$store.state.userHP +'%'}"
              class="user-hp"
            />
          </div>
          <span>{{ this.$store.state.userName }}</span>
        </div>
      </div>
      <button
        class="battle-action-button"
        aria-label="VS"
        @click="showTaskSelector"
      />
      <div class="monster-score">
        <div class="flex-column">
          <div class="hp-wrapper">
            <div
              :style="{width: this.$store.state.monsterHP +'%'}"
              class="monster-hp"
            />
          </div>
          <span>{{ this.$store.state.monsterName }}</span>
        </div>
      </div>
    </div>
    <canvas id="battle-canvas" />
  </div>
</template>

<script>
import keyboardMixin from '../../components/mixins/keyboard';
import animation from './index.js';

export default {
  mixins: [keyboardMixin],
  data() {
    return {
      monsterName: 'злобный дядя Ваня',
    };
  },
  mounted() {
    animation.run(this.getCanvas());
  },
  methods: {
    keyDown(key) {
      if (key === 'Space' || key === 'Enter') {
        this.showTaskSelector();
      }
    },
    showTaskSelector() {
      this.$root.showTaskSelector()
        .then(() => { animation.setMonsterHp(this.$store.state.monsterHP); })
        .then(() => {
          if (this.$store.state.userHP <= 0) { this.$parent.goToScore(); }
        });
    },
    goToLogin() {
      this.$root.gotoLogin();
    },
    getCanvas() {
      return this.$el.querySelector('#battle-canvas');
    },
  },
};
</script>

<style lang="scss" src="../styles.scss" ></style>
<style lang="scss" src="./index.scss" ></style>
