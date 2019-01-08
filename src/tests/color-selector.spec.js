import { shallowMount } from '@vue/test-utils';
import ColorSelector from '../components/for-task/color-selector/index.vue';

describe('color-selector', () => {
  test('colors', () => {
    const wrapper = shallowMount(ColorSelector, {
      propsData: {
        description: 'baz',
        componentInfo:
          {
            name: 'color-selector',
            data: [
              { name: 'красный', value: 'red' },
              { name: 'синий', value: 'blue' },
              { name: 'желтый', value: 'yellow' },

            ],
          },
      },
    });
    expect(wrapper.vm.color1).toMatch(/yellow|red|blue/);
    expect(wrapper.vm.color2).toMatch(/yellow|red|blue/);
    expect(wrapper.vm.color3).toMatch(/yellow|red|blue/);
    expect(wrapper.vm.color1).not.toBe('white');
    expect(wrapper.vm.color2).not.toBe('white');
    expect(wrapper.vm.color3).not.toBe('white');
  });
});
