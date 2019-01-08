<template>
  <div>
    <div class="subjects">
      <label
        v-for="(subject, index) in subjects"
        :key="subject"
        class="choose"
      >
        <input
          :id="index"
          type="radio"
          name="task"
          value=""
          @click="selectTask($event)"
        >
        <span class="bold">
          {{ subject.name }}
        </span>
      </label>
    </div>
  </div>
</template>

<script>
import keyboardMixin from '../../mixins/keyboard';

const diary = require('./jsons/studentDiary.json');

export default {
  mixins: [keyboardMixin],
  data() {
    return {
      task: 'Домашние задания:',
      subjects: null,
    };
  },
  mounted() {
    this.subjects = diary.subjects;
    this.$parent.setCaption(this.task);
  },
  updated() {
    const subjects = document.querySelector('.subjects');
    if (subjects !== null) {
      const firstElement = subjects.querySelector('input');
      if (firstElement !== null) {
        firstElement.setAttribute('checked', 'checked');
        firstElement.focus();
        this.$parent.setResult(firstElement.id);
      }
    }
  },
  methods: {
    keyDown(key) {
      if (key === 'Space' || key === 'Enter') {
        this.$emit('closeme', '');
      }
    },

    getRandomTask(taskList) {
      return taskList[Math.floor(Math.random() * taskList.length)];
    },

    selectTask(event) {
      const element = event.target;
      this.$parent.setResult(element.id);
    },
  },
};
</script>

<style lang="scss" src="./index.scss" ></style>
