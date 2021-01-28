<script>
    import TextInput from './TextInput.vue';
    import FormGroup from './FormGroup.vue';

    export default {
        components: { TextInput, FormGroup },
        props: {
            label: String,
            help: String,
        }
    };
</script>
<template>
    <form-group :label="label" :help="help">
        <text-input v-bind="$attrs" v-on="$listeners" />
    </form-group>
</template>