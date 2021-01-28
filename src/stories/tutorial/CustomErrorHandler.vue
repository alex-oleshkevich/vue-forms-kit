<script>
import { FormController } from '../../';

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
