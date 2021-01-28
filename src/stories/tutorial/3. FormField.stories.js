import './styles.css';

import TextField from './TextField.vue';

export default {
    title: 'Tutorial/Step 3. TextField.vue',
    component: TextField,
    argTypes: {
        required: { control: 'boolean' },
        value: { control: 'text' },
        label: { control: 'text' },
        help: { control: 'text' },
    },
};

const TextFieldTemplate = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { TextField },
    data() {
        return {
            inputValue: '',
        };
    },
    template: `
    <text-field name="email" :label="label" :help="help" :required="required" v-model="inputValue" />`,
    watch: {
        value(v) {
            this.inputValue = v;
        },
        immediate: true,
    },
});

export const CreateTextField = TextFieldTemplate.bind({});
CreateTextField.args = {
    label: 'Your email ',
    help: 'The email address must include @ sign',
};
