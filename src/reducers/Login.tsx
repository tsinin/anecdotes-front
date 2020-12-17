const initLoginState: LoginState = {
    "user": null,
    "loggedIn": false,
    "access_token": null,
    "refresh_token": null,
    "isLoading": false
}

export default (state: LoginState = initLoginState, action: any) => {
    if (action.type === "updateLogin") {
        state.access_token = window.localStorage.getItem("auth_access")
        state.refresh_token = window.localStorage.getItem("auth_refresh")
        let username = window.localStorage.getItem("username")
        if (username) {
            state.user = {id: 0, username: username}
        } else {
            state.user = null
        }
        state.loggedIn = (state.access_token !== null);
        state.isLoading = false
        return state
    } else if (action.type === "loadingLogin") {
        return {"username": null, "loggedIn": false, "access_token": null,
                "refresh_token": null, "isLoading": true}
    } else if (action.type === "signInInfo") {
        if (action.response != null && action.response !== {}) {
            return action.response
        }
    } else if (action.type === "logOut") {
        return initLoginState;
    } else {
        return state
    }
}