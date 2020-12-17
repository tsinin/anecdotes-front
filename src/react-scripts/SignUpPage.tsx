import React from 'react';
import {useHistory} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import {ApiClient} from "../services/ApiClient";
import {signIn} from "../actions/auth";

function SignUpPage() {
    const dispatch = useDispatch()
    const history = useHistory();
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    // const isAuth = Boolean(window.localStorage.getItem("auth_access"))
    const isAuth = useSelector((state: State) => state.Login.loggedIn)

    const handleSubmit = React.useCallback(
        async (event: React.SyntheticEvent) => {
            dispatch({"type": "loadingLogin"})
            try {
                const response = await ApiClient(
                    `users/`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "Application/json",
                        },
                        body: JSON.stringify({username, password})
                    })
                console.log(response)

                signIn(username, password)

            } catch(err) {
                console.log(err)
                dispatch({"type": "logOut"})
            }
            history.push("/")
        }, [dispatch, history, username, password]
    )

    if (isAuth) {
        return (
            <div>
                <h3>You're logged in.</h3>
                <button type="submit"
                        className="sign-out-button"
                        onClick={handleSubmit}>
                    Регистрация
                </button>
            </div>
        )
    } else {
        return (
            <div>
                <h3>Регистрация</h3>
                <div>
                    <div>
                        <a>Login</a>
                    </div>
                    <input className="login-or-password"
                           name="text"
                           placeholder="login"
                           value={username}
                           onChange={(e) => {
                               setUsername(e.target.value)}}/>
                </div>
                <div>
                    <div>
                        <a>Password</a>
                    </div>
                    <input className="login-or-password"
                           name="text"
                           type="password"
                           placeholder="password"
                           value={password}
                           onChange={(e) => {
                               setPassword(e.target.value)}}/>
                </div>
                <button type="submit"
                        className="default-btn"
                        id="sign-in-btn"
                        onClick={handleSubmit}>
                    Зарегистрироваться
                </button>
            </div>
        )
    }
}

export default SignUpPage;