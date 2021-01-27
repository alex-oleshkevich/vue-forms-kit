import { mount } from '@vue/test-utils';
import { TextInput } from '../../src/index.js';

describe('TextInput.js', () => {
    it('sets text type', () => {
        const wrapper = mount(TextInput);
        expect(wrapper.find('input').attributes('type')).toEqual('text');
    });

    it('renders value', () => {
        const wrapper = mount(TextInput, {
            propsData: {
                value: 'The value.',
            },
        });
        expect(wrapper.find('input').element.value).toBe('The value.');
    });

    it('renders size class', () => {
        const wrapper = mount(TextInput, {
            propsData: {
                size: 'lg',
            },
        });
        expect(wrapper.find('input').attributes('class')).toContain(
            'form-input-lg',
        );
    });

    it('renders required attribute', () => {
        const wrapper = mount(TextInput, {
            propsData: {
                required: true,
            },
        });
        expect(wrapper.find('input').attributes('required')).toBeTruthy();
    });

    it('sets custom attribute', () => {
        const wrapper = mount(TextInput, {
            attrs: { tabindex: 10 },
        });
        expect(wrapper.find('input').attributes('tabindex')).toEqual('10');
    });

    it('emits input event', () => {
        const spy = jest.fn();
        const wrapper = mount(TextInput, { listeners: { input: spy } });
        const input = wrapper.find('input');
        input.element.value = 'new';
        input.trigger('input');

        expect(spy).toBeCalledWith('new');
    });

    it('emits change event', () => {
        const spy = jest.fn();
        const wrapper = mount(TextInput, { listeners: { change: spy } });
        const input = wrapper.find('input');
        input.element.value = 'new';
        input.trigger('change');

        expect(spy).toBeCalledWith('new');
    });

    it('emits focus event', () => {
        const spy = jest.fn();
        const wrapper = mount(TextInput, { listeners: { focus: spy } });
        wrapper.find('input').trigger('focus');

        expect(spy).toBeCalledTimes(1);
    });

    it('emits blur event', () => {
        const spy = jest.fn();
        const wrapper = mount(TextInput, { listeners: { blur: spy } });
        wrapper.find('input').trigger('blur');

        expect(spy).toBeCalledTimes(1);
    });
});
