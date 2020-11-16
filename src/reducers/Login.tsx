const initLoginState: LoginState = {
    "user": null,
    "loggedIn": false,
    "token": null,
    "isLoading": false
}

export default (state: LoginState, action: any) => {
    if (state === undefined) {
        return initLoginState;
    }
    if (action.type === "updateLogin") {
        return state
    }
    if (action.type === "loadingLogin") {
        return {"user": null, "loggedIn": false, "token": null, "isLoading": true}
    }
    if (action.type === "signInInfo") {
        if (action.response != null && action.response !== {}) {
            return {"user": action.response[0], "loggedIn": true, "isLoading": false}
        }
    }
    if (action.type === "logOut") {
        return initLoginState;
    }
    return state
}