<script>

import TextInput from './TextInput.vue';
import FormGroup from './FormGroup.vue';

/**
 * When you have many forms it feels like you are writing a lot of boilerplate code.
 * Let's reduce it by introducing a new concept: "form fields". 
 * The form field is a component that combines inputs and form groups into a new one.
 * 
 * ```javascript
 * // TextField.vue
 * import TextInput from './TextInput.vue';
 * import FormGroup from './FormGroup.vue';
 * 
 * export default {
 *     components: { TextInput, FormGroup },
 *     props: {
 *         label: String,
 *         help: String,
 *     },
 * };
 * ````
 * 
 * ```html
 * <template>
 *     <form-group :label="label" :help="help">
 *         <text-input v-bind="$attrs" v-on="$listeners" />
 *     </form-group>
 * </template>
 * ```
 * 
Now our form becomes cleaner:

```html
<text-field
    name="email"
    label="Your email"
    help="The email address must include @ sign"
></text-field>
```
 */
export default {
    components: { TextInput, FormGroup },
    props: {
        label: String,
        help: String,
    },
};
</script>
<template>
    <form-group :label="label" :help="help">
        <text-input v-bind="$attrs" v-on="$listeners" />
    </form-group>
</template>
