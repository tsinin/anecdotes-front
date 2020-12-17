import React from "react";
import {useHistory, Link} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import {signIn, signOut} from "../actions/auth";

interface IAuthFormProps {
    onSuccess: () => void
    onRegisterButtonClick: () => void
}

const SignInPage: React.FC<IAuthFormProps> = ({onSuccess, onRegisterButtonClick}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")

    const isAuth = useSelector((state: State) => state.Login.loggedIn)
    // const isAuth = Boolean(window.localStorage.getItem("auth_access"))

    const handleSignIn = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        await dispatch(signIn(username, password))
        history.push("/")
    }

    const handleSignOut = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        await dispatch(signOut())
        history.push("/")
    }


    if (isAuth) {
        return (
            <div>
                <h3>You're logged in.</h3>
                <button type="submit"
                        className="sign-out-button"
                        onClick={handleSignOut}>
                    Выйти
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
                        onClick={handleSignIn}>
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