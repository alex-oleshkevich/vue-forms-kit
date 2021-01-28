# Vue Forms kit

A set of primitives to build your own forms and inputs with low effort.

## Installation

```bash
yarn install vue-forms-kit
# or
npm i vue-forms-kit
```

## Architecture

Unlike many other libraries, this one aims to provide a low-level set of renderless components
that you may compose to create a higher lever form inputs. The library doesn't enforce any styling
deferring that decision to a developer. It also ships with a collection of ready-to-use form inputs
that you can style and use in your project, or use them as a reference. Moreover, it is better
to implement your form components in the project using these components.

The core building blocks are input, form group, and form.

-   "input" is the most simple form element that renders a native form element or Vue component.
-   "form group" is an optional decorator for the input component that enhances it with extra functionality like errors, help text, or labels.
-   "form" is an (optional) element, that operates with user input data, performs validation, and can handle the form submission.
    It also propagates validation errors to the child form groups.

## Quick start

In this mini-tutorial, we are going to create a simple form with form groups and form inputs.
This form will ask for user information, perform validation and submit the data.
The tutorial assumes that you are familiar with scoped slots.

### Form inputs

Let's start with the smallest entity - the form input:

```html
<script>
    // TextInput.vue
    import { InputController } from 'vue-forms-kit';

    export default {
        components: { InputController },
    };
</script>
<template>
    <input-controller v-on="$listeners" v-slot="{onInput}">
        <input type="text" v-bind="$attrs" @input="onInput" />
    </input-controller>
</template>
```

We just created a simple text input. In real life, you would need handlers for "change", "focus", and "blur" events. At this stage, you can already start using the `<text-input />` component in your forms.

### Form groups

Okay, let's decorate it with a label, with help text and validation errors.
First, we will create a "form group" component that will receive label text and help text via properties.

```html
<script>
    // FormGroup.vue
    import { FormGroupController } from 'vue-forms-kit';

    export default {
        components: { FormGroupController },
        props: {
            label: String,
            help: String,
        },
    };
</script>
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

We created a form group component that decorates `TextInput`. You can implement any other features like icons, floating labels, and so on. The usage may look like this:

```html
<form-group label="Your email" help="The email address must include @ sign">
    <text-input name="email">
</form-group>
```

### Form fields

When you have many forms it feels like you are writing a lot of boilerplate code.
Let's reduce it by introducing a new concept: "form fields". The form field is a component that combines inputs and form groups into a new one.

```html
<script>
    // TextField.vue
    import TextInput from './TextInput.vue';
    import FormGroup from './FormGroup.vue';

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
```

Now our form becomes cleaner:

```html
<text-field
    name="email"
    label="Your email"
    help="The email address must include @ sign"
></text-field>
```

### Forms

Once we have building blocks, let's create our form component with these requirements:

-   it must validate email address length and report an error when invalid
-   it must submit the form via our function
-   it must render errors returned by the submit handler

We won't create a new Vue component for the form in this example. So let's use `FormController` to achieve our goal.
The form controller requires the following properties:

-   `data` - the object containing all user input
-   `handler` - a function that handles form submission
-   `validator` - an optional function that performs validation. It must return a key-value mapping where keys are field names and values are errors for the field.

```html
<script>
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
</script>
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

More information about validation, submission, and error handling you can find in other sections.

## Form Validation

The form validation triggers right before the form submission.
The validator is a pure JavaScript function that receives `formData` as the first argument and returns an object where keys are field names and values are error messages.

Here is an example of such function:

```javascript
function validator(formData) {
    let errors = {};
    if (!formData.email) {
        errors.email = 'This field is required'.
    }
    return errors;
}
```

## Submit handlers

Similar to validators, submit handlers are pure async JavaScript functions.
They accept `formData` as the first argument.
The `FormController` component will handle exceptions or promise rejections and try to guess the error message and field errors.

### Handling response errors

If the submit handler throws an exception or returns promise rejection, the form controller
will try to get message and field errors from this object.
In other words, in case of error your submit handler has to raise an exception which has "message" and "errors" properties or return a promise rejection:

```javascript
// exception based
class CustomError extends Error {
    constructor(message, errors) {
        this.message = message;
        this.errors = errors;
    }
}
function submitWithExceptionRaised() {
    throw new CustomError('Submission error', {
        email: 'This field is not a valid email address'.,
    });
}

// promise based
function submitWithPromiseRejection() {
    return Promise.reject({
        message: 'Submission error',
        errors: {
            email: 'This field is not a valid email address'.,
        }
    })
}
```

You can make your own error handler either by passing `errorHandler` property of the form controller or make it global by setting `Config.responseErrorHandler` parameter.

```html
<script>
    // CustomErrorHandler.vue
    import { FormController } from 'vue-forms-kit';

    export default {
        components: { FormController },
        methods: {
            submit() {
                return Promise.reject({
                    data: {
                        message: 'Rejected',
                        errors: {},
                    },
                });
            },
            async errorHandler(response) {
                // response is the promise rejection value seen in submit() method.
                let { message, errors } = response.data;
                return { message, errors };
            },
        },
    };
</script>

<template>
    <form-controller
        :data="{}"
        :handler="submit"
        :error-handler="errorHandler"
        v-slot="{ message }"
    >
        <p>{{ message }}</p>
        <button>Submit</button>
    </form-controller>
</template>
```

## Configuration

You can set global response error handler via exported `Config` object:

```javascript
import { Config } from 'vue-forms-kit';

Config.responseErrorHandler = response => {
    let { message, errors } = response;
    return { message, errors };
};
```

## API

### InputController

#### Properties

---

| Name           | Type   | Default value | Comment                           |
| -------------- | ------ | ------------- | --------------------------------- |
| input-selector | string | -             | A selector for the input element. |

#### Events

| Name   | Data       | Comment                                                                                                |
| ------ | ---------- | ------------------------------------------------------------------------------------------------------ |
| input  | any        | Triggered on user input. Carries the value of "input" event of the underlying form element.            |
| change | any        | Triggered when input value changes. Carries the value of "input" event of the underlying form element. |
| focus  | FocusEvent | Same as HTML focus event.                                                                              |
| blur   | FocusEvent | Same as HTML blue event.                                                                               |

### FormGroupController

#### Properties

| Name   | Type               | Default value | Comment                 |
| ------ | ------------------ | ------------- | ----------------------- |
| errors | string \| string[] | []            | A list of field errors. |

#### Events

No public events emitted.

### FormController

#### Properties

| Name      | Type     | Default value | Comment                                   |
| --------- | -------- | ------------- | ----------------------------------------- |
| data      | object   | (required)    | Key-value object containing user input.   |
| handler   | function | (required)    | A form submission handler.                |
| validator | function | () => ({})    | A form validator.                         |
| errors    | object   | {}            | Key-value object containing field errors. |

#### Events

| Name     | Data | Comment                                                             |
| -------- | ---- | ------------------------------------------------------------------- |
| response | any  | Triggered after submission handler has been successfully completed. |
| error    | any  | Fired then submission handler finished with an error.               |

## Interfaces

```typescript
type FormData = { [key: string]: any };
type ValidationErrors = { [key: string]: any };

type ValidatorInterface = (formData: FormData) => ValidationErrors;

interface SubmitResponse {
    message?: string;
    errors?: ValidationErrors;
}
type SubmitHandler = (formData: FormData) => SubmitResponse;
```
