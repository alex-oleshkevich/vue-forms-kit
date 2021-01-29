export function axiosErrorHandler(e) {
    let { message, errors } = e.response.data;
    return { message, errors };
}

/**
 *
 * @param {Error} e
 */
export function guessErrorHandler(e) {
    if ('response' in e) {
        return axiosErrorHandler(e);
    }

    if ('errors' in e) {
        let { message, errors } = e;
        return { message, errors };
    }

    return {
        message: e.toString(),
        errors: {},
    };
}
