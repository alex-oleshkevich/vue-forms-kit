<script>
import { FormController } from '../../';
import TextField from './TextField.vue';

/**

Once we have building blocks, let's create our form component with these requirements:

-   it must validate email address length and report an error when invalid
-   it must submit the form via our function
-   it must render errors returned by the submit handler

We won't create a new Vue component for the form in this example. So let's use `FormController` to achieve our goal.
The form controller requires the following properties:

-   `data` - the object containing all user input
-   `handler` - a function that handles form submission
-   `validator` - an optional function that performs validation. It must return a key-value mapping where keys are field names and values are errors for the field.

```javascript
// EditUserForm.vue
import { FormController } from 'vue-forms-kit';
import TextField from './TextField.vue';

export default {
    components: { FormController, TextField },
    data() {
        return {
            formData: {
                first_name: '',
                last_name: '',
                email: '',
            },
        };
    },
    methods: {
        async validate(formData) {
            let errors = {};
            if (!formData.email) {
                errors.email = 'This field is required.';
            }
            return errors;
        },
        async submit(formData) {
            async function wait() {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        if (formData.email.indexOf('error') !== -1) {
                            reject({
                                message: 'Form submission error.',
                                errors: {
                                    email: 'This value is invalid.',
                                },
                            });
                        } else {
                            resolve();
                        }
                    }, 1000);
                });
            }
            await wait();
        },
    },
};
```

```html
<template>
    <form-controller
        :data="formData"
        :handler="submit"
        :validator="validate"
        v-slot="{state, message}"
    >
        <div v-if="message">Error message: {{ message }}</div>
        <text-field
            name="first_name"
            label="First name"
            v-model="formData.first_name"
        />
        <text-field
            name="last_name"
            label="Last name"
            v-model="formData.last_name"
        />
        <text-field
            type="email"
            name="email"
            label="Email"
            required
            v-model="formData.email"
        />
        <button type="submit" :disabled="state === 'loading'">Submit</button>
    </form-controller>
</template>
```

The form is ready to use. I want to point you at some moments.
First, the form exposes the `state` property that you can use to react to form state transition.
For example, we disabled the submit button while the form was handling the submission.
Second, if the API returns an error message, we can display it to use. Use the `message` key to access the message value.

If you want to test error response, include "error" string in the email input.
For example, "error@example.com".
 */
export default {
    components: { FormController, TextField },
    data() {
        return {
            formData: {
                first_name: '',
                last_name: '',
                email: '',
            },
        };
    },
    methods: {
        async validate(formData) {
            let errors = {};
            if (!formData.email) {
                errors.email = 'This field is required.';
            }
            return errors;
        },
        async submit(formData) {
            async function wait() {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        if (formData.email.indexOf('error') !== -1) {
                            reject({
                                message: 'Form submission error.',
                                errors: {
                                    email: 'This value is invalid.',
                                },
                            });
                        } else {
                            resolve();
                        }
                    }, 1000);
                });
            }
            await wait();
        },
    },
};
</script>
<template>
    <form-controller
        :data="formData"
        :handler="submit"
        :validator="validate"
        v-slot="{ state, message }"
    >
        <div v-if="message">Error message: {{ message }}</div>
        <text-field
            name="first_name"
            label="First name"
            v-model="formData.first_name"
        />
        <text-field
            name="last_name"
            label="Last name"
            v-model="formData.last_name"
        />
        <text-field
            type="email"
            name="email"
            label="Email"
            v-model="formData.email"
        />
        <button type="submit" :disabled="state === 'loading'">Submit</button>
    </form-controller>
</template>
