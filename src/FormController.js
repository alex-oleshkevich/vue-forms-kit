import { FormState } from './constants';
import { Config } from './config';

export default {
    props: {
        handler: { type: [Function], required: true },
        errorHandler: {
            type: [Function],
            default: Config.responseErrorHandler,
        },
        validator: { type: Function, default: () => true },
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
            this.responseMessage = null;
            this.fieldErrors = {};
            this.state = FormState.LOADING;
            let { isValid, errors } = await this.validate(this.formData);
            if (isValid) {
                this.doSubmit(this.formData)
                    .then(response => {
                        this.state = FormState.READY;
                        this.$emit('response', response);
                    })
                    .catch(e => {
                        this.state = FormState.ERROR;
                        this.handleResponseError(e);
                    });
            } else {
                this.state = FormState.ERROR;
                this.setErrors(errors);
            }
        },

        async doSubmit(data) {
            return await this.handler(data);
        },

        handleResponseError(e) {
            let { message, errors } = this.errorHandler(e);
            this.setMessage(message);
            this.setErrors(errors);
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
                    submit: e => {
                        e.preventDefault();
                        this.submit(e);
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
