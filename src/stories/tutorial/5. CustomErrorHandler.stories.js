import './styles.css';

import CustomErrorHandler from './CustomErrorHandler.vue';

export default {
    title: 'Tutorial/Step 5. CustomErrorHandler',
    component: CustomErrorHandler,
};

const CustomErrorHandlerTemplate = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { CustomErrorHandler },
    template: `<custom-error-handler />`,
});

export const UseCustomErrorHandler = CustomErrorHandlerTemplate.bind({});
