import { FormState } from './constants';
import { Config } from './config';

/**
 * Provides a generic API for forms.
 *
 * Props:
 *  handler (function) - a form submission handler
 *  errorHandler (function) - a submit error handler
 *  validator (function) - a function that performs validation
 *  data (object) - initial form data
 *  errors (object) - initial form errors
 */
export default {
    props: {
        handler: { type: [Function], required: true },
        errorHandler: {
            type: [Function],
            default: Config.responseErrorHandler,
        },
        validator: {
            type: Function,
            default: () => ({}),
        },
        data: { type: Object, required: true },
        errors: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            state: FormState.INITIAL,
            responseMessage: '',
            fields: {},
            formData: {},

            mounted: false,
            fieldErrors: {},
        };
    },
    provide() {
        return {
            $form: {
                attachInput: this.attachInput,
                detachInput: this.detachInput,
            },
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.mounted = true;
            this.setErrors(this.fieldErrors);
        });
    },
    methods: {
        attachInput(input) {
            this.fields[input.name] = input;
        },
        detachInput(input) {
            delete this.fields[input.name];
        },

        async submit() {
            let { isValid, errors } = await this.validate(this.formData);
            if (isValid) {
                try {
                    this.responseMessage = null;
                    this.fieldErrors = {};
                    this.state = FormState.LOADING;
                    const response = await this.handler(this.formData);
                    this.state = FormState.READY;
                    this.$emit('response', response);
                } catch (e) {
                    this.state = FormState.ERROR;
                    let { message, errors } = this.errorHandler(e);
                    this.setMessage(message);
                    this.setErrors(errors);
                    this.$emit('error', e);
                }
            } else {
                this.state = FormState.ERROR;
                this.setErrors(errors);
            }
        },

        async validate(data) {
            let errors = await this.validator(data, this);
            return {
                isValid: Object.keys(errors).length === 0,
                errors,
            };
        },

        setMessage(msg) {
            this.responseMessage = msg;
        },

        setErrors(errors) {
            Object.values(this.fields).forEach(field => field.clearErrors());
            Object.entries(errors).forEach(([name, errors]) => {
                this.fields[name].setErrors(errors);
            });
        },
    },
    render(h) {
        return h(
            'form',
            {
                attrs: this.$attrs,
                on: {
                    submit: async e => {
                        e.preventDefault();
                        await this.submit(e);
                    },
                },
            },
            this.$scopedSlots.default({
                submit: this.submit,
                message: this.responseMessage,
                errors: this.fieldErrors,
                formData: this.formData,
                state: this.state,
            }),
        );
    },
    watch: {
        data: {
            handler(value) {
                this.formData = Object.assign({}, value);
            },
            immediate: true,
            deep: true,
        },
        errors: {
            handler(errors) {
                errors = Object.assign({}, errors);
                if (this.mounted) {
                    this.setErrors(errors);
                } else {
                    this.fieldErrors = errors;
                }
            },
            immediate: true,
        },
    },
};
