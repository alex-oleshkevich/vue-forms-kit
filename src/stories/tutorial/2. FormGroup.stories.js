import './styles.css';

import FormGroup from './FormGroup.vue';
import TextInput from './TextInput.vue';

export default {
    title: 'Tutorial/Step 2. FormGroup.vue',
    component: FormGroup,
    argTypes: {
        required: { control: 'boolean' },
        value: { control: 'text' },
        label: { control: 'text' },
        help: { control: 'text' },
    },
};

const FormGroupTemplate = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { FormGroup, TextInput },
    data() {
        return {
            inputValue: '',
        };
    },
    template: `
    <form-group :label="label" :help="help">
        <text-input name="email" :required="required" v-model="inputValue" />
    </form-group>`,
    watch: {
        value(v) {
            this.inputValue = v;
        },
        immediate: true,
    },
});

export const CreateFormGroup = FormGroupTemplate.bind({});
CreateFormGroup.args = {
    label: 'Your email ',
    help: 'The email address must include @ sign',
};
