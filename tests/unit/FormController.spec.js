import { mount } from '@vue/test-utils';
import { FormController, FormState } from '../../src/';
import TextField from './TextField.vue';
import { nextTick } from 'vue';

const noop = async () => {};

function factory({
    handler = noop,
    errorHandler = undefined,
    validator = undefined,
    errors = undefined,
}) {
    return {
        components: { FormController, TextField },
        data() {
            return {
                formData: {
                    first_name: '',
                    last_name: '',
                    email: '',
                },
            };
        },
        computed: {
            form() {
                return this.$refs.form;
            },
            errorHandler() {
                return errorHandler;
            },
            validator() {
                return validator;
            },
            errors() {
                return errors;
            },
        },
        methods: {
            async onSubmit(data) {
                return await handler(data);
            },
        },
        template: `
        <form-controller 
            :data="formData" 
            :handler="onSubmit" 
            :error-handler="errorHandler" 
            :validator="validator"
            :errors="errors"
            v-slot="{state, message}"
        >
            <span id="state">{{ state }}</span>
            <span id="message">{{ message }}</span>
            <text-field name="first_name" v-model="formData.first_name" />
            <text-field name="last_name" v-model="formData.last_name" />
            <text-field name="email" v-model="formData.email" />
            <button type="submit">submit</button>
        </form-controller>
    `,
    };
}

describe('FormController.js', () => {
    it('successfully submits form', async () => {
        const spy = jest.fn(() => ({ message: 'Success.' }));

        const FormComponent = factory({ handler: spy });
        const wrapper = mount(FormComponent);
        expect(wrapper.get('#state').text()).toEqual(FormState.INITIAL);

        await wrapper.find('form').trigger('submit');
        await nextTick(); // state transition to LOADING

        expect(wrapper.get('#state').text()).toEqual(FormState.LOADING);
        await nextTick(); // state transition to READY

        expect(wrapper.get('#state').text()).toEqual(FormState.READY);
        expect(spy).toBeCalledTimes(1);
    });

    it('handles response error using default handler', async () => {
        const spy = jest.fn(() => {
            let error = new Error('HTTP Failure.');
            error.response = {
                data: {
                    message: 'Validation error.',
                    errors: {
                        first_name: 'This field is required.',
                    },
                },
            };
            throw error;
        });

        const FormComponent = factory({ handler: spy });
        const wrapper = mount(FormComponent);
        expect(wrapper.get('#state').text()).toEqual(FormState.INITIAL);

        await wrapper.find('form').trigger('submit');
        await nextTick(); // state transition to LOADING

        expect(wrapper.get('#state').text()).toEqual(FormState.LOADING);
        await nextTick(); // state transition to ERROR

        expect(wrapper.get('#state').text()).toEqual(FormState.ERROR);
        await nextTick(); // rendering errors

        expect(
            wrapper
                .findAll('form .form-group')
                .at(0)
                .text(),
        ).toEqual('This field is required.');
    });

    it('handles response error using custom handler', async () => {
        const spy = jest.fn(() => {
            throw new Error('HTTP Failure.');
        });
        const errorHandler = jest.fn(() => {
            return {
                message: 'Custom error.',
                errors: {
                    first_name: 'Error handled.',
                },
            };
        });

        const FormComponent = factory({
            handler: spy,
            errorHandler: errorHandler,
        });
        const wrapper = mount(FormComponent);
        await wrapper.find('form').trigger('submit');
        await nextTick(); // state transition to LOADING
        await nextTick(); // state transition to ERROR
        await nextTick(); // rendering errors

        expect(wrapper.find('form .form-group').text()).toEqual(
            'Error handled.',
        );

        expect(wrapper.find('#message').text()).toEqual('Custom error.');
    });

    it('performs validation', async () => {
        const spy = jest.fn(() => {
            throw new Error('HTTP Failure.');
        });
        const validator = jest.fn(() => {
            return {
                first_name: 'Validation error.',
            };
        });

        const FormComponent = factory({
            handler: spy,
            validator: validator,
        });
        const wrapper = mount(FormComponent);
        await wrapper.find('form').trigger('submit');
        await nextTick();

        expect(wrapper.find('form .form-group').text()).toEqual(
            'Validation error.',
        );
        expect(spy).toBeCalledTimes(0);
    });

    it('can accept errors via props', async () => {
        const spy = jest.fn(() => {});
        const FormComponent = factory({
            handler: spy,
            errors: {
                first_name: 'Passed error.',
            },
        });
        const wrapper = mount(FormComponent);
        await wrapper.find('form').trigger('submit');
        await nextTick();

        expect(wrapper.find('form .form-group').text()).toEqual(
            'Passed error.',
        );
    });
});
