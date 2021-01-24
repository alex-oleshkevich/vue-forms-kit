import TextField from '../TextField';

export default {
    title: 'Fields/TextField',
    component: TextField,
    argTypes: {
        value: { control: 'text' },
        size: { control: { type: 'select', options: ['sm', 'md', 'lg'] } },
        required: { control: 'boolean' },
        errors: { control: 'text' },
        help: { control: 'text' },
        label: { control: 'text' },
        onInput: { action: 'onInput' },
        onChange: { action: 'onChange' },
        onFocus: { action: 'onFocus' },
        onBlur: { action: 'onBlur' },
    },
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { TextField },
    template: `
    <text-field 
        name="first_name"
        v-bind="$props" 
        @input="onInput" 
        @change="onChange" 
        @focus="onFocus" 
        @blur="onBlur" 
    />`,
});

export const FullExample = Template.bind({});
FullExample.args = {
    label: 'First name',
    required: true,
    value: 'This is a text...',
    help: 'Use only alphabetical symbols.',
    errors: [
        'This field is required.',
        'Only alphabetical symbols are allowed.',
    ],
};

export const WithHelpText = Template.bind({});
WithHelpText.args = {
    help: 'Use only alphabetical symbols.',
};

export const WithErrors = Template.bind({});
WithErrors.args = {
    errors: 'Only alphabetical symbols are allowed.',
};
