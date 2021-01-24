import TextInput from '../TextInput';

export default {
    title: 'Inputs/TextInput',
    component: TextInput,
    argTypes: {
        value: { control: 'text' },
        size: { control: { type: 'select', options: ['sm', 'md', 'lg'] } },
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
        v-bind="$props" 
        @input="onInput" 
        @change="onChange" 
        @focus="onFocus" 
        @blur="onBlur" 
    />`,
});

export const Base = Template.bind({});
Base.args = {
    value: 'This is a text...',
};
