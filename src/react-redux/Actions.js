
export const INIT = "INIT";

export const init = (userName) => {
    return {
        type: INIT,
        userName: userName
    }
}