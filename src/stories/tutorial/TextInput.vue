<script>
import { InputController } from '../../';

/**
 * In this mini-tutorial, we are going to create a simple form with form groups and form inputs.
 * This form will ask for user information, perform validation and submit the data.
 * The tutorial assumes that you are familiar with scoped slots.
 *
 * Let's start with the smallest entity - the form input.
 * 
```javascript
// TextInput.vue
import { InputController } from 'vue-forms-kit';

export default {
    components: { InputController },
};
```

```html
<template>
    <input-controller v-on="$listeners" v-slot="{onInput}">
        <input type="text" v-bind="$attrs" @input="onInput" />
    </input-controller>
</template>
```
 *
 * We just created a simple text input. In real life,
 * you would need handlers for "change", "focus", and "blur" events. At this stage,
 * you can already start using the `<text-input />` component in your forms.
 */
export default {
    components: { InputController },
};
</script>
<template>
    <input-controller v-on="$listeners" v-slot="{ onInput }">
        <input type="text" v-bind="$attrs" @input="onInput" />
    </input-controller>
</template>
