import TextInput from '../TextInput.vue';

export default {
    title: 'Controllers/InputController',
    component: TextInput,
    argTypes: {
        value: { control: 'text' },
        required: { control: 'boolean' },
        onInput: { action: 'onInput' },
        onChange: { action: 'onChange' },
        onFocus: { action: 'onFocus' },
        onBlur: { action: 'onBlur' },
    },
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { TextInput },
    template: `
    <text-input 
        @input="onInput" 
        @change="onChange" 
        @focus="onFocus" 
        @blur="onBlur" 
        v-bind="$props" 
    />`,
});

export const Base = Template.bind({});
Base.args = {
    value: 'This is a text...',
};
