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

    console.error(e);
    return {
        message: e.toString(),
        errors: {},
    };
}
