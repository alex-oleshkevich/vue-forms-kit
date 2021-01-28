import './styles.css';

import EditUserForm from './EditUserForm.vue';

export default {
    title: 'Tutorial/Step 4. Forms',
    component: EditUserForm,
};

const EditUserFormTemplate = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { EditUserForm },
    template: `<edit-user-form />`,
});

export const CreateEditUserForm = EditUserFormTemplate.bind({});
