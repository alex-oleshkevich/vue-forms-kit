<script>
import { FormGroupController } from '../../';

/**
 * Okay, let's decorate it with a label, with help text and validation errors.
 * First, we will create a "form group" component that will receive label text and help text via properties.
 * 
```javascript
// FormGroup.vue
import { FormGroupController } from 'vue-forms-kit';

export default {
    components: { FormGroupController },
    props: {
        label: String,
        help: String,
    },
};
```

```html
<template>
    <form-group-controller v-slot="{required, errors}">
        <div class="form-group">
            <label class="form-label">
                <span>{{ label }}</span>
                <span class="form-label-asterisk" v-if="required">*</span>
            </label>
            <slot></slot>
            <div v-if="help" class="form-help">{{ help }}</div>
            <ul v-if="errors" class="form-errors">
                <li v-for="(error, index) in errors" :key="error + index">
                    {{ error}}
                </li>
            </ul>
        </div>
    </form-group-controller>
</template>
```
We created a form group component that decorates `TextInput`. 
You can implement any other features like icons, floating labels, and so on. 
The usage may look like this:

```html
<form-group label="Your email" help="The email address must include @ sign">
    <text-input name="email">
</form-group>
```
 */
export default {
    components: { FormGroupController },
    props: {
        label: String,
        help: String,
    },
};
</script>
<template>
    <form-group-controller v-slot="{ required, errors }">
        <div class="form-group">
            <label class="form-label">
                <span>{{ label }}</span>
                <span class="form-label-asterisk" v-if="required">*</span>
            </label>
            <slot></slot>
            <div v-if="help" class="form-help">{{ help }}</div>
            <ul v-if="errors" class="form-errors">
                <li v-for="(error, index) in errors" :key="error + index">
                    {{ error }}
                </li>
            </ul>
        </div>
    </form-group-controller>
</template>
