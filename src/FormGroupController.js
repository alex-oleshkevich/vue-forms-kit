const formStub = {
    attachInput() {},
    detachInput() {},
};

export default {
    props: {
        errors: { type: [Array, String], default: () => [] },
    },
    data() {
        return {
            inputId: null,
            fieldErrors: [],
            required: false,
        };
    },
    provide() {
        return {
            $formGroup: {
                attachInput: this.attachInput,
                detachInput: this.detachInput,
                clearErrors: this.clearErrors,
            },
        };
    },
    inject: {
        $form: {
            default: formStub,
        },
    },
    computed: {
        valid() {
            return this.fieldErrors.length === 0;
        },
    },
    methods: {
        attachInput(input) {
            this.required = input.required;
            this.inputId = input.inputId;
            const onInput = () => {
                this.fieldErrors = [];
            };
            const onError = fieldErrors => {
                this.setErrors(fieldErrors);
            };
            input.$on('input', onInput);
            input.$on('error', onError);

            this.$form.attachInput(input);
            this.$once('hook:beforeDestroy', () => {
                input.$off('input', onInput);
                input.$off('error', onError);
            });
        },
        detachInput(input) {
            this.$form.detachInput(input);
        },
        setErrors(errors) {
            if (!errors) {
                return;
            }
            if (errors.constructor === String) {
                errors = [errors];
            }
            this.fieldErrors = errors;
        },
        clearErrors() {
            this.fieldErrors = [];
        },
    },
    render() {
        return this.$scopedSlots.default({
            inputId: this.inputId,
            valid: this.valid,
            errors: this.fieldErrors,
            required: this.required,
        });
    },
    watch: {
        errors: {
            handler: 'setErrors',
            immediate: true,
        },
    },
};
