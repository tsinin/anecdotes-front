import React from "react";
import {useHistory, Link} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import backendDomain from "../backendDomain";

function SignInPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [login, setLogin] = React.useState("")
    const [password, setPassword] = React.useState("")

    const creds = useSelector((state: State) => state.Login)


    const signIn = React.useCallback(
        async (event: React.SyntheticEvent) => {
            dispatch({"type": "loadingLogin"})
            let creds

            try {
                const response = await fetch(
                    `${backendDomain}/users?name=${login}&password=${password}`,
                    {
                        headers: {
                            "Content-Type": "Application/json",
                        },
                    });
                creds = {"response": await response.json(),
                    "type": "signInInfo"};

                // console.log("fetch results: ", JSON.stringify(creds))
                if (JSON.stringify(creds.response) === "[]") {
                    return
                }


                dispatch(creds)
                window.localStorage.setItem("creds", JSON.stringify(
                    {
                        "name": login,
                        "password": password
                    }))

            } catch(err) {
                console.log(err)
                dispatch({"type": "logOut"})
            }

            history.push("/")
        }, [dispatch, history, login, password]
    )

    if (creds.loggedIn) {
        return (
            <div>
                <h3>You're logged in.</h3>

                <button type="submit"
                        className="sign-out-button"
                        onClick={signIn}>
                    Регистрация
                </button>
            </div>
        )
    } else {
        return (
            <div>
                <h3>Войдите</h3>
                <div>
                    <div>
                        <a>Login</a>
                    </div>
                    <input className="login-or-password"
                           name="text"
                           placeholder="login"
                           value={login}
                           onChange={(e) => {
                               setLogin(e.target.value)}}/>

                </div>

                <div>
                    <div>
                        <a>Password</a>
                    </div>
                    <input className="login-or-password"
                           name="text"
                           placeholder="password"
                           value={password}
                           onChange={(e) => {
                               setPassword(e.target.value)}}/>
                </div>

                <button type="submit"
                        className="default-btn"
                        id="sign-in-btn"
                        onClick={signIn}>
                    Войти
                </button>


                <Link to="/sign-up" style={{paddingLeft: 50}}>
                    <button type="submit"
                            className="default-btn"
                            id="sign-up-btn">
                        Регистрация
                    </button>
                </Link>

            </div>
        )
    }
}

export default SignInPage;