import React from 'react';
import {useHistory, Link} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import backendDomain from "../backendDomain";

function SignUpPage() {
    const dispatch = useDispatch()
    const history = useHistory();
    const [login, setLogin] = React.useState("")
    const [password, setPassword] = React.useState("")

    const creds = useSelector((state: State) => state.Login)


    const handleSubmit = React.useCallback(
        async (event: React.SyntheticEvent) => {
            dispatch({"type": "loadingLogin"})

            const creds: Omit<IUser, "id"> = {
                name: login,
                password: password
            };

            try {
                await fetch(
                    `${backendDomain}/users?name=${login}&password=${password}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "Application/json",
                        },
                        body: JSON.stringify(creds)
                    });

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
                        onClick={handleSubmit}>
                    Зарегистрироваться
                </button>

            </div>
        )
    }
}

export default SignUpPage;