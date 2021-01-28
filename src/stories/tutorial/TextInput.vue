<script>
import { InputController } from '../../';

export default {
    components: { InputController },
};
</script>
<template>
    <input-controller v-on="$listeners" v-slot="{ onInput }">
        <input type="text" v-bind="$attrs" @input="onInput" />
    </input-controller>
</template>
