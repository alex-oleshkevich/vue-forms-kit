<script>
import FormGroup from './FormGroup.vue';
import TextInput from './TextInput.vue';

export default {
    components: { FormGroup, TextInput },
    inheritAttrs: false,
    props: {
        label: String,
        help: String,
        errors: { type: [String, Array], default: () => [] },
    },
};
</script>

<template>
    <form-group :label="label" :help="help" :errors="errors">
        <div v-if="$scopedSlots.left" class="form-before-field">
            <slot :name="left"></slot>
        </div>

        <text-input v-bind="$attrs" v-on="$listeners" />

        <div v-if="$scopedSlots.right" class="form-after-field">
            <slot :name="right"></slot>
        </div>

        <template v-slot:label="props">
            <slot name="label" v-bind="props"></slot>
        </template>
        <template v-slot:help="props">
            <slot name="help" v-bind="props"></slot>
        </template>
        <template v-slot:errors="props">
            <slot name="errors" :props="props"></slot>
        </template>
    </form-group>
</template>
