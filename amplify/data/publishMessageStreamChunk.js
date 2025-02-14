// This handler simply passes through the arguments of the mutation through as the result
export function request() {
    return {}
}

/**
 * @param {import('@aws-appsync/utils').Context} ctx
 */
export function response(ctx) {
    return ctx.args
    // return {
    //     outcome: "SUCCESS",
    // }
    // return JSON.stringify(ctx.args)
}