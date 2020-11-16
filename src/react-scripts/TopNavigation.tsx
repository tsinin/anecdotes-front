import React, {useEffect} from 'react';
import logo from '../pictures/logo.png'
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import {useHistory} from "react-router-dom";

function LoginButton() {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({"type": "updateLogin"})
    }, [dispatch])

    const creds = useSelector((state: State) => state.Login)

    const logOut = React.useCallback(
        async (event: React.SyntheticEvent) => {
            window.localStorage.removeItem("creds")
            dispatch({"type": "logOut"})
            history.push("/")
        }, [dispatch, history]
    )

    if (!creds.loggedIn || creds.user === null) {
        return (
            <Link className="login" to="/sign-in">Войти</Link>
        )
    } else {
        return (
            <a className="login-dropdown">
                <div className="nav-dropdown" id="nav-login-dropdown">
                    <button className="nav-dropbtn">{creds.user.name}<i className="fa fa-caret-down"/>
                    </button>
                    <div className="nav-dropdown-content">
                        <Link to="/my-anecdotes">Мои анекдоты</Link>
                        <a onClick={logOut}>
                            Выйти
                        </a>
                    </div>
                </div>
            </a>
        )
    }
}

function TopNavigation() {
    return (
        <div className="topnav">
            <Link className="home" to="/"><img className="logo" src={logo}/></Link>
            <div className="nav-dropdown">
                <button className="nav-dropbtn">Лучшие<i className="fa fa-caret-down"/>
                </button>
                <div className="nav-dropdown-content">
                    <Link to="/best/day">За сегодня</Link>
                    <Link to="/best/week">За неделю</Link>
                    <Link to="/best/ever">За всё время</Link>
                </div>
            </div>
            {/*<div className="nav-dropdown">*/}
            {/*    <button className="nav-dropbtn">Категории<i className="fa fa-caret-down"/>*/}
            {/*    </button>*/}
            {/*    <div className="nav-dropdown-content">*/}
            {/*        <Link to="/categories/1">1</Link>*/}
            {/*        <Link to="/categories/2">2</Link>*/}
            {/*        <Link to="/categories/3">3</Link>*/}
            {/*        <Link to="/categories/4">4</Link>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<Link className="about" to="/about">О сайте</Link>*/}
            <LoginButton/>
        </div>
    );
}

export default TopNavigation;