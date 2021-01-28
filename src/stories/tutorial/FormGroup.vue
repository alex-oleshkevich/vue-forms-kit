<script>
import { FormGroupController } from '../../';

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
