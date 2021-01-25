<script>
import InputController from './InputController';

export default {
    components: { InputController },
    inheritAttrs: false,
    props: {
        value: { type: String, default: '' },
        size: { type: String, default: 'md' },
        required: Boolean,
    },
    computed: {
        cssClasses() {
            return {
                'form-input': true,
                [`form-input-${this.size}`]: true,
            };
        },
    },
};
</script>

<template>
    <input-controller
        v-slot="{ onInput, onChange, onFocus, onBlur }"
        v-on="$listeners"
    >
        <input
            type="text"
            :class="cssClasses"
            :required="required"
            :value="value"
            v-bind="$attrs"
            @input="onInput"
            @change="onChange"
            @focus="onFocus"
            @blur="onBlur"
        />
    </input-controller>
</template>
