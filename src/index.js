import { Config } from './config';
export { Config } from './config';
export { FormState } from './constants';
export { default as FormController } from './FormController';
export { default as FormGroupController } from './FormGroupController';
export { default as InputController } from './InputController';

export default {
    install(Vue, options) {
        if (options.responseErrorHandler) {
            Config.responseErrorHandler = options.responseErrorHandler;
        }
    },
};
