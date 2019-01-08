import Vue from 'vue';
import store from './components/store/store';
import homePage from './screens/home/index.vue';
import loginPage from './screens/login/index.vue';
import battlePage from './screens/battle/index.vue';
import scorePage from './screens/score/index.vue';
import loaderComponent from './components/loading/index';
import modalComponent from './components/modal-dialog/index';

const initDocument = () => {
  document.title = 'Game';
  const appDiv = document.createElement('div');
  appDiv.setAttribute('id', 'app');
  document.body.appendChild(appDiv);
};

const initMeta = () => {
  const meta = document.createElement('meta');
  meta.setAttribute('name', 'viewport');
  meta.setAttribute('content', 'width=device-width, initial-scale=1');
  document.querySelector('head').appendChild(meta);
};

initDocument();
initMeta();

const about = [
  'Эта игра проверит твои способности!',
  'Эта игра проверит твои знания!',
  'Тебе придется сразиться с монстром и одалеть его',
];

const greating = [
  'Хочешь сразиться?',
  'Даже не начинай играть!',
  'Да кто ты такой?!',
  'Я готов к сватке, а ты?',
  'Уроки сделал?',
  'Мама разрешила?',
  'Мал еще сражаться!',
  'Я сегодня выходной...',
];

const sounds = {
  intro: './sounds/detskie-uchat-v-shkole_min.mp3',
};

const loginPagePhrases = {
  promptToInputName: 'Ты можешь ввести свое имя...',
};

const settings = {
  subjects: null,
  greating,
  about,
  sounds,
  loginPagePhrases,
};

function loaderResources() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 10);
  });
}

async function loaderFunc(resources) {
  await loaderResources(resources);
  loaderComponent.hide();
}

const app = new Vue({
  el: '#app',
  store,
  data: {
    currentRoute: homePage,
    userName: 'никто',
  },
  computed: {
    ViewComponent() {
      return this.currentRoute;
    },
  },
  methods: {
    getMonsterHP() {
      return this.monsterHP;
    },
    getUserHP() {
      return this.userHP;
    },
    setCurrentScore(answer) {
      if (answer === true) {
        this.$store.dispatch('userScore', this.$store.state.userScore + 5);
        this.$store.dispatch('monsterHP', Math.max(0, this.$store.state.monsterHP - 5));
      } else {
        this.$store.dispatch('userHP', Math.max(0, this.$store.state.userHP - 5));
        this.$store.dispatch('monsterHP', Math.min(100, this.$store.state.monsterHP + 5));
      }
    },
    openTask(taskName) {
      return modalComponent.show(taskName, this)
        .then(result => this.setCurrentScore(result));
    },
    showTaskSelector() {
      return modalComponent.show('studentDiary', this)
        .then(result => this.openTask(result));
    },
    getSettings(key) {
      return settings[key];
    },
    setSettings(key, value) {
      settings[key] = value;
    },
    getSubject(key) {
      return settings.subjects[key];
    },
    setSubject(key, value) {
      settings.subjects[key] = value;
    },
    gotoLogin() {
      this.currentRoute = loginPage;
    },
    goToBattle() {
      loaderComponent.show();
      loaderFunc('');
      this.$store.dispatch('userScore', 0);
      this.$store.dispatch('monsterHP', 100);
      this.$store.dispatch('userHP', 100);

      this.currentRoute = battlePage;
    },
    goToScore() {
      this.currentRoute = scorePage;
    },
  },
  render(h) {
    return h(this.ViewComponent);
  },
});


function playSound(url) {
  const audio = document.createElement('audio');
  audio.style.display = 'none';
  audio.src = url;
  audio.autoplay = true;
  audio.onended = () => {
    audio.remove();
  };
}
playSound(settings.sounds.intro);


export default {
  app,
};
