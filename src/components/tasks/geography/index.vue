<template>
  <div>
    <h2>{{ description }}</h2>
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
const geography = require('./jsons/geography.json');
const geographyResourses = require('./jsons/countries.json');

const options = {
  subjectTitle: 'География',
  subjectName: 'geography',
};
export default {
  data() {
    return {
      task: options.subjectTitle,
      componentName: null,
      componentData: null,
      componentInfo: null,
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
      this.taskList = geography.taskList;
      const random = Math.floor(Math.random() * this.taskList.length);
      this.description = this.taskList[random].description;
      this.componentInfo = this.taskList[random].componentInfo;
      this.componentInfo.data.countries = geographyResourses.countries;
      this.componentName = this.componentInfo.name;
    },

    setResult(result) {
      this.$parent.setResult(result);
    },
  },
};
</script>


<style lang="scss" src="./index.scss" ></style>
