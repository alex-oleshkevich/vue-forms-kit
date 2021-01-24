<script>
import FormController from './src/FormController.js';
import TextField from './src/TextField.vue';

export default {
    components: { FormController, TextField },
    data() {
        return {
            required: false,
            errors: { first_name: 'Hui tam' },
            formData: {
                first_name: 'Alex',
                last_name: '',
                email: '',
            },
        };
    },

    created() {
        setTimeout(() => {
            this.errors = {
                email: 'Ebany email',
            };
        }, 2000);
    },
    methods: {
        async onSubmit() {
            let response = await fetch(
                'http://192.168.2.100:8081/sockjs-node/',
            );
            let data = await response.json();
            console.log(data);
        },
        validator(data) {
            console.log(data);
            let errors = {};
            if (!data.first_name) {
                errors.first_name = 'First name is required.';
            }
            if (!data.last_name) {
                errors.last_name = 'Last name is required.';
            }
            if (!data.email) {
                errors.email = 'Email is required.';
            }
            return errors;
        },
    },
};
</script>

<template>
    <div>
        you name: {{ formData.first_name }}
        <br />
        <br />

        <form-controller
            :data="formData"
            :handler="onSubmit"
            :validator="validator"
            :errors="errors"
            v-slot="{ message }"
        >
            error message: "{{ message }}"
            <text-field
                :required="required"
                label="First name"
                name="first_name"
                v-model="formData.first_name"
            />
            <text-field
                :required="required"
                label="Last name"
                name="last_name"
                v-model="formData.last_name"
            />
            <text-field
                :required="required"
                label="Email"
                name="email"
                v-model="formData.email"
            />
            <button type="submit">submit</button>
        </form-controller>
        <br />
        <br />
        <input type="checkbox" v-model="required" />
    </div>
</template>
