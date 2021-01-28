import './styles.css';

import TextInput from './TextInput.vue';

export default {
    title: 'Tutorial/Step 1. TextInput.vue',
    component: TextInput,
    argTypes: {
        value: { control: 'text' },
        onInput: { action: 'onInput' },
        onChange: { action: 'onChange' },
        onFocus: { action: 'onFocus' },
        onBlur: { action: 'onBlur' },
    },
};

const TextInputTemplate = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { TextInput },
    data() {
        return {
            inputValue: '',
        };
    },
    template: `
    <div>
        <div>your input is: {{ inputValue }}</div>
        <text-input 
            name="first_name"
            v-model="inputValue"
            v-bind="$props" 
            @input="onInput" 
            @change="onChange" 
            @focus="onFocus" 
            @blur="onBlur" 
        />
    </div>`,
    watch: {
        value(v) {
            this.inputValue = v;
        },
        immediate: true,
    },
});

export const CreateTextInput = TextInputTemplate.bind({});
