import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import FormGroup from './FormGroup.vue';
import TextInput from './TextInput.vue';

describe('FormGroup.js', () => {
    it('renders input', async () => {
        const wrapper = mount(FormGroup, {
            components: { TextInput },
            props: {
                label: 'First name',
            },
            slots: {
                default: '<text-input />',
            },
        });
        expect(wrapper.find('input[type="text"]')).toBeTruthy();
    });

    it('renders labels', async () => {
        const wrapper = mount(FormGroup, {
            propsData: {
                label: 'First name',
            },
        });
        await nextTick();
        expect(wrapper.find('.form-label').text()).toEqual('First name');
    });

    it('renders label has "for" attribute and points to the input', async () => {
        const wrapper = mount(FormGroup, {
            components: { TextInput },
            propsData: {
                label: 'First name',
            },
            slots: {
                default: '<text-input />',
            },
        });
        await nextTick();
        expect(wrapper.find('.form-label').attributes('for')).toMatch(/vfk_/);
    });

    it('renders custom label slot', async () => {
        const wrapper = mount(FormGroup, {
            components: { TextInput },
            propsData: {
                label: 'A label.',
            },
            scopedSlots: {
                label:
                    '<template v-slot="{label}"><div>New: {{ label }}</div></template>',
            },
        });
        await nextTick();
        expect(wrapper.find('.form-label').text()).toEqual('New: A label.');
    });

    it('renders help', async () => {
        const wrapper = mount(FormGroup, {
            propsData: {
                help: 'Use your first name.',
            },
        });
        await nextTick();
        expect(wrapper.find('.form-help').text()).toEqual(
            'Use your first name.',
        );
    });

    it('renders .form-help when no "help" prop passed but "help" slot is defined.', async () => {
        const wrapper = mount(FormGroup, {
            slots: {
                help: '<span>Use your first name.</span>',
            },
        });
        await nextTick();
        expect(wrapper.find('.form-help').text()).toEqual(
            'Use your first name.',
        );
    });

    it('renders custom help slot', async () => {
        const wrapper = mount(FormGroup, {
            components: { TextInput },
            propsData: {
                help: 'The help.',
            },
            scopedSlots: {
                help: `
                    <template v-slot="{help}">
                        <div>New: {{ help }}</div>
                    </template>`,
            },
        });
        await nextTick();
        expect(wrapper.find('.form-help').text()).toEqual('New: The help.');
    });

    it('renders errors', async () => {
        const wrapper = mount(FormGroup, {
            propsData: {
                errors: 'This field is required.',
            },
        });
        await nextTick();
        expect(wrapper.find('.form-errors').text()).toEqual(
            'This field is required.',
        );

        const wrapper2 = mount(FormGroup, {
            propsData: {
                errors: ['This field is required.'],
            },
        });
        await nextTick();
        expect(wrapper2.find('.form-errors').text()).toEqual(
            'This field is required.',
        );
    });

    it('renders .form-errors when no "errors" prop passed but "errors" slot is defined.', async () => {
        const wrapper = mount(FormGroup, {
            slots: {
                errors: '<span>The error.</span>',
            },
        });
        await nextTick();
        expect(wrapper.find('.form-errors').text()).toEqual('The error.');
    });

    it('has .invalid class when there are errors', async () => {
        const wrapper = mount(FormGroup, {
            propsData: {
                errors: 'An error.',
            },
        });
        await nextTick();
        expect(wrapper.attributes('class')).toMatch('invalid');
    });

    it('renders custom errors slot', async () => {
        const wrapper = mount(FormGroup, {
            components: { TextInput },
            propsData: {
                errors: 'An error.',
            },
            scopedSlots: {
                errors: `
                    <template v-slot="{errors}">
                        <div>New: {{ errors.join('.') }}</div>
                    </template>`,
            },
        });
        await nextTick();
        expect(wrapper.find('.form-errors').text()).toEqual('New: An error.');
    });

    it('renders asterisk for required fields', async () => {
        const wrapper = mount(FormGroup, {
            components: { TextInput },
            slots: {
                default: '<text-input required />',
            },
        });
        await nextTick();
        expect(wrapper.find('.form-label').text()).toContain('*');
    });
});
