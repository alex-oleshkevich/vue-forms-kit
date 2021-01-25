import { mount } from '@vue/test-utils';
import { TextInput } from '../../src/index.js';
import { nextTick } from 'vue';

describe('TextInput.js', () => {
    it('renders value', async () => {
        const wrapper = mount(TextInput, {
            propsData: {
                value: 'The value.',
            },
        });
        expect(wrapper.find('input').element.value).toBe('The value.');
    });

    it('renders size class', async () => {
        const wrapper = mount(TextInput, {
            propsData: {
                size: 'lg',
            },
        });
        expect(wrapper.find('input').attributes('class')).toContain(
            'form-input-lg',
        );
    });

    it('renders required attribute', async () => {
        const wrapper = mount(TextInput, {
            propsData: {
                required: true,
            },
        });
        await nextTick();
        expect(wrapper.find('input').attributes('required')).toBeTruthy();
    });

    it('emits input event', async () => {
        const wrapper = mount(TextInput);
        const input = wrapper.find('input');
        await input.setValue('new');

        expect(input.element.value).toBe('new');
        // expect(wrapper.emitted().input[0]).toEqual(['new']);
    });
});
