/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    settings: { },
    userScore: 0,
    userName: 'никто',
    monsterName: 'Самый злой монстр',
    userHP: 100,
    monsterHP: 100,
  },
  mutations: {
    write(state, data) {
      state.settings[data.name] = data.value;
      return state.settings[data.name];
    },
    writeTaskList(state, data) {
      state.settings.subjects[data.name] = data.value;
      return state.settings.subjects[data.name];
    },
    userScore(state, score) {
      state.userScore = score;
    },
    userName(state, score) {
      state.userName = score;
    },
    userHP(state, hp) {
      state.userHP = hp;
    },
    monsterHP(state, hp) {
      state.monsterHP = hp;
    },
  },
  actions: {
    write(context, data) {
      context.commit('write', data);
    },
    userScore(context, data) {
      context.commit('userScore', data);
    },
    userName(context, data) {
      context.commit('userName', data);
    },
    userHP(context, data) {
      context.commit('userHP', data);
    },
    monsterHP(context, data) {
      context.commit('monsterHP', data);
    },
  },
  getters: {
    settings: state => state.settings,
    userScore: state => state.userScore,
    userName: state => state.userName,
    userHP: state => state.userHP,
    monsterHP: state => state.monsterHP,
  },
});
export default store;
