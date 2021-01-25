import { mount } from '@vue/test-utils';
import { TextField } from '../../src/index.js';

describe('TextField.js', () => {
    it('renders label', async () => {
        const wrapper = mount(TextField, {
            propsData: {
                label: 'The label.',
            },
        });
        expect(wrapper.find('.form-label').text()).toEqual('The label.');
    });

    it('renders help', async () => {
        const wrapper = mount(TextField, {
            propsData: {
                help: 'The help.',
            },
        });
        expect(wrapper.find('.form-help').text()).toEqual('The help.');
    });

    it('renders errors', async () => {
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
});
