<script>
import { FormGroupController } from '../../src/';

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
        v-slot="{ errors, required, inputId, valid }"
        :errors="errors"
    >
        <div class="form-group" :class="{ invalid: !valid }">
            <label class="form-label" :for="inputId">
                <slot name="label" :label="label" :required="required">
                    <span>{{ label }}</span>
                </slot>
                <span class="form-label-asterisk" v-if="required">*</span>
            </label>
            <slot></slot>
            <div class="form-help" v-if="help || $scopedSlots.help">
                <slot name="help" :help="help">
                    {{ help }}
                </slot>
            </div>
            <div
                class="form-errors"
                v-if="errors.length || $scopedSlots.errors"
            >
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
