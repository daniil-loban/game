<template>
  <div>
    <h2 class="sub-caption">{{ description }}</h2>
    <KeepAlive>
      <Component
        :is="taskComponentLoader"
        id="task-component"
        :component-info="componentInfo"
        :description="description"
        @set-description="setDescription($event)"
      />
    </KeepAlive>
  </div>
</template>

<script>
const painting = require('./jsons/painting.json');

export default {
  data() {
    return {
      task: 'Рисование',
      componentName: null,
      componentData: null,
      description: null,
      taskList: null,
    };
  },
  computed: {
    taskComponentLoader() {
      this.getTask();
      return () => import(`./../../for-task/${this.componentInfo.name}/index.vue`);
    },
  },
  mounted() {
    this.$parent.setCaption(this.task);
  },
  methods: {
    getDescription() {
      return this.description;
    },
    setDescription(description) {
      this.description = description;
    },
    getTask() {
      this.taskList = painting.taskList;
      const random = Math.floor(Math.random() * this.taskList.length);
      this.description = this.taskList[random].description;
      this.componentInfo = this.taskList[random].componentInfo;
    },

    setResult(result) {
      this.$parent.setResult(result);
    },
  },
};
</script>

<style lang="scss" src="./index.scss" ></style>
