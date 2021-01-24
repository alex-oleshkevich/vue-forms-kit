const formGroupStub = {
    attachInput() {},
    detachInput() {},
    clearErrors() {},
};

export default {
    props: {
        inputSelector: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            inputId: null,
            name: '',
            required: false,
        };
    },
    inject: {
        $formGroup: { default: formGroupStub },
    },
    mounted() {
        this.$nextTick(() => {
            let el = this.findInput();
            this.inputId = el.id || this.makeId('id');
            el.id = this.inputId;

            this.name = el.name || el.dataset.name || this.makeId('name');
            el.name = this.name;

            this.required = el.required;

            this.$formGroup.attachInput(this);
            this.$once('hooks:beforeDestroy', () =>
                this.$formGroup.detachInput(this),
            );
        });
    },
    methods: {
        findInput() {
            let el = this.$el;
            if (this.inputSelector) {
                el = el.querySelector(this.inputSelector);
            }

            if (!el) {
                throw new Error(
                    '[InputController] Child element not found' +
                        (this.inputSelector
                            ? `(using inputSelector="${this.inputSelector}")`
                            : '') +
                        '.',
                );
            }
            return el;
        },

        makeId(prefix) {
            return `vfk_${prefix}_${this._uid}`;
        },

        /**
         *
         * @param {InputEvent|any} e
         */
        onInput(e) {
            if (e instanceof Event) {
                this.$emit('input', e.target.value);
            } else {
                this.$emit('input', e);
            }
        },

        /**
         *
         * @param {Event} e
         */
        onChange(e) {
            this.$emit('change', e);
        },

        /**
         *
         * @param {FocusEvent} e
         */
        onFocus(e) {
            this.$emit('focus', e);
        },

        /**
         *
         * @param {FocusEvent} e
         */
        onBlur(e) {
            this.$emit('blur', e);
        },

        setErrors(errors) {
            this.$emit('error', errors);
        },

        clearErrors() {
            this.$formGroup.clearErrors();
        },
    },
    render() {
        return this.$scopedSlots.default({
            inputId: this.inputId,
            inputName: this.name,
            onInput: this.onInput,
            onChange: this.onChange,
            onFocus: this.onFocus,
            onBlur: this.onBlur,
        });
    },
};
