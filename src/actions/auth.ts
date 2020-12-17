import {Dispatch} from "redux"
import {ApiClient} from "../services/ApiClient";

export function signIn(username: string, password: string) {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({"type": "loadingLogin"})
            const response = await ApiClient("token/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "Application/json",
                    },
                    body: JSON.stringify({username, password})
                })

            if (response.status === 200) {
                const {access, refresh} = await response.json()
                window.localStorage.setItem("auth_access", access)
                window.localStorage.setItem("auth_refresh", refresh)
                window.localStorage.setItem("username", username)
                dispatch({
                    "type": "signInInfo",
                    "response": {
                        "user": {username: username, id: 0},
                        "loggedIn": true,
                        "access_token": access,
                        "refresh_token": refresh,
                        "isLoading": false
                    }
                })
            }
        } catch(err) {
            console.log(err)
        }
    }
}

export function signOut() {
    window.localStorage.clear()
}

export function signUp(username: string, password: string, onError: () => void, onSuccess: () => void) {
    return async (dispatch: Dispatch) => {
        try {
            const response = await ApiClient("users/", {
                method: 'POST',
                headers: {
                    "Content-Type": "Application/json",
                }, body: JSON.stringify({username, password})
            });
            if (response.status !== 201) {
                throw new Error('Ошибка при регистрации')
            }
            signIn(username, password)
            onSuccess()

        } catch(err) {
            onError()
        }
    }
}