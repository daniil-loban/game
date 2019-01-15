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
const math = require('./jsons/math.json');

export default {
  data() {
    return {
      task: 'Математика',
      description: null,
      componentName: null,
      componentData: null,
      componentInfo: null,
      taskList: null,
    };
  },
  computed: {
    taskComponentLoader() {
      this.getTask();
      return () => import(`./../../for-task/${this.componentName}/index.vue`);
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
      this.taskList = math.taskList;
      const random = Math.floor(Math.random() * this.taskList.length);
      this.description = this.taskList[random].description;
      this.componentInfo = this.taskList[random].componentInfo;
      this.componentData = this.componentInfo.data;
      this.componentName = this.componentInfo.name;
    },

    setResult(result) {
      this.$parent.setResult(result);
    },
  },
};
</script>


<style lang="scss" src="./index.scss" ></style>
