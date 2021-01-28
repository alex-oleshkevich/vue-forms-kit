# Vue Forms kit

A set of primitives to build your own forms and inputs with low effort.

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
        components: { TextIput, FormGroup },
        props: {
            label: String,
            help: String,
        }
    };
</script>
<template>
<form-group :label="label" :help="help">
    <text-input v-bind="$attrs" v-on="$listeners">
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
                // does nothing for now, but you may issue an API call in this place
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
        <text-field name="first_name" v-model="formData.first_name" />
        <text-field name="last_name" v-model="formData.last_name" />
        <text-field
            type="email"
            name="email"
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

More information about validation, submission, and error handling you can find in other sections.

## Styling

## Form Validation

## Submit handlers

## Displaying errors

## Setting form group errors

## Custom errors, labels and help messages.

## Built-in fields

## Building custom elements
