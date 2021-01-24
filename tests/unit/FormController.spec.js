import { shallowMount, mount } from '@vue/test-utils';
import FormController from '../../src/FormController.js';
import { FormState } from '../../src/index.js';
import TextField from '../../src/TextField.vue';

const noop = () => {};

function factory({ handler = noop }) {
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
        methods: {
            async submit() {
                await this.$el.submit();
            },
            async onSubmit(data) {
                await handler(data);
            },
        },
        template: `
        <form-controller :data="formData" :handler="onSubmit">
            <text-field name="first_name" v-model="formData.first_name" />
            <text-field name="last_name" v-model="formData.last_name" />
            <text-field name="email" v-model="formData.email" />
        </form-controller>
    `,
    };
}

describe('FormController.js', () => {
    it('successfully submits form', async () => {
        const spy = jest.fn(() => {});

        const FormComponent = factory({ handler: spy });
        const wrapper = mount(FormComponent);
        await wrapper.vm.submit();
        expect(spy.mock.calls.length).toBe(1);
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
        await wrapper.vm.submit();
        expect(wrapper.vm.state).toEqual(FormState.ERROR);
        expect(wrapper.vm.responseMessage).toEqual('Validation error.');
        expect(spy.mock.calls.length).toBe(1);
    });
    it('handles response error using custom handler', () => {});
    it('performs validation', () => {});
    it('can accept errors via props', () => {});
});
