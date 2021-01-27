import { mount } from '@vue/test-utils';
import { TextField } from '../../src/index.js';

describe('TextField.js', () => {
    it('renders label', () => {
        const wrapper = mount(TextField, {
            propsData: {
                label: 'The label.',
            },
        });
        expect(wrapper.find('.form-label').text()).toEqual('The label.');
    });

    it('renders help', () => {
        const wrapper = mount(TextField, {
            propsData: {
                help: 'The help.',
            },
        });
        expect(wrapper.find('.form-help').text()).toEqual('The help.');
    });

    it('renders errors', () => {
        const wrapper = mount(TextField, {
            propsData: {
                errors: 'The error.',
            },
        });
        expect(wrapper.find('.form-errors').text()).toEqual('The error.');

        const wrapper2 = mount(TextField, {
            propsData: {
                errors: ['The error.'],
            },
        });
        expect(wrapper2.find('.form-errors').text()).toEqual('The error.');
    });

    it('sets custom attribute', () => {
        const wrapper = mount(TextField, {
            attrs: { tabindex: 10 },
        });
        expect(wrapper.find('input').attributes('tabindex')).toEqual('10');
    });

    it('emits input event', () => {
        const spy = jest.fn();
        const wrapper = mount(TextField, { listeners: { input: spy } });
        const input = wrapper.find('input');
        input.element.value = 'new';
        input.trigger('input');

        expect(spy).toBeCalledWith('new');
    });

    it('emits change event', () => {
        const spy = jest.fn();
        const wrapper = mount(TextField, { listeners: { change: spy } });
        const input = wrapper.find('input');
        input.element.value = 'new';
        input.trigger('change');

        expect(spy).toBeCalledWith('new');
    });

    it('emits focus event', () => {
        const spy = jest.fn();
        const wrapper = mount(TextField, { listeners: { focus: spy } });
        wrapper.find('input').trigger('focus');

        expect(spy).toBeCalledTimes(1);
    });

    it('emits blur event', () => {
        const spy = jest.fn();
        const wrapper = mount(TextField, { listeners: { blur: spy } });
        wrapper.find('input').trigger('blur');

        expect(spy).toBeCalledTimes(1);
    });
});
