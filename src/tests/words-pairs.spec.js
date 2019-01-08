import { shallowMount } from '@vue/test-utils';
import WordPairs from '../components/for-task/words-pairs/index.vue';

const geography = require('../components/tasks/geography/jsons/geography.json');

const { taskList } = geography;
const random = Math.floor(Math.random() * taskList.length);
const { description } = taskList[random];
const { componentInfo } = taskList[random];

componentInfo.data.countries = [
  { country: 'country0', capital: 'capital0' },
  { country: 'country1', capital: 'capital1' },
  { country: 'country2', capital: 'capital2' },
  { country: 'country3', capital: 'capital3' },
  { country: 'country4', capital: 'capital4' },
];

describe('words-pairs', () => {
  test('check whether words are in correct variables', () => {
    const wrapper = shallowMount(WordPairs, {
      propsData: {
        description,
        componentInfo,
      },
    });
    expect(wrapper.vm.countries.length).not.toBe(0);
    expect(wrapper.vm.capitals.length).not.toBe(0);

    for (let i = 0; i < 5; i += 1) {
      expect(wrapper.vm.countries[i]).toMatch(/country0|country1|country2|country3|country4/);
    }
    for (let i = 0; i < 5; i += 1) {
      expect(wrapper.vm.capitals[i]).toMatch(/capital0|capital1|capital2|capital3|capital4/);
    }
  });
});

describe('words-pairs', () => {
  test('check words in container', () => {
    const wrapper = shallowMount(WordPairs, {
      propsData: {
        description,
        componentInfo,
      },
    });
    expect(wrapper.vm.countries.length).not.toBe(0);
    expect(wrapper.vm.capitals.length).not.toBe(0);

    for (let i = 0; i < 5; i += 1) {
      const element = wrapper.find(`span[id=capital${[i]}`);
      expect(element).not.toBe(undefined);
    }
  });
});
