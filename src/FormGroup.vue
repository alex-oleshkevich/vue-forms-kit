<script>
import FormGroupController from './FormGroupController';

export default {
    components: { FormGroupController },
    props: {
        label: String,
        help: String,
        errors: { type: [Array, String], default: () => [] },
    },
};
</script>

<template>
    <form-group-controller
        v-slot="{ errors, required, inputId }"
        :errors="errors"
    >
        <div class="form-group">
            <label class="form-label" :for="inputId">
                <slot name="label" :label="label" :required="required">
                    <span>{{ label }}</span>
                </slot>
                <span class="form-label-asterisk" v-if="required">*</span>
            </label>
            <slot></slot>
            <div class="form-help">
                <slot name="help" :help="help">
                    {{ help }}
                </slot>
            </div>
            <div class="form-errors" v-if="errors.length">
                <slot name="errors" :errors="errors">
                    <ul>
                        <li
                            v-for="(error, index) in errors"
                            :key="error + index"
                        >
                            {{ error }}
                        </li>
                    </ul>
                </slot>
            </div>
        </div>
    </form-group-controller>
</template>
