<script>
import { FormController } from '../../';
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
