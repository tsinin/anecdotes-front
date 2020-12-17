import React, {useEffect, useState} from 'react';
import logo from '../pictures/logo.png'
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import {useHistory} from "react-router-dom";
import {signOut} from "../actions/auth";

function LoginButton() {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({"type": "updateLogin"})
    }, [dispatch])


    dispatch({"type": "updateLogin"})
    let login = useSelector((state: State) => state.Login)

    const handleSignOut = React.useCallback(
        async (event: React.SyntheticEvent) => {
            signOut();
            dispatch({"type": "logOut"})
            history.push("/")
        }, [dispatch, history]
    )

    if (!login.loggedIn || !login.user || !login.user.username) {
        return (
            <Link className="login" to="/sign-in">Войти</Link>
        )
    } else {
        return (
            <a className="login-dropdown">
                <div className="nav-dropdown" id="nav-login-dropdown">
                    <button className="nav-dropbtn">{login.user.username}<i className="fa fa-caret-down"/>
                    </button>
                    <div className="nav-dropdown-content">
                        {/*<Link to="/my-anecdotes">Мои анекдоты</Link>*/}
                        <a onClick={handleSignOut}>
                            Выйти
                        </a>
                    </div>
                </div>
            </a>
        )
    }
}

function TopNavigation() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({"type": "updateLogin"})
    }, [dispatch])
    return (
        <div className="topnav">
            <Link className="home" to="/"><img className="logo" src={logo}/></Link>
            {/*<div className="nav-dropdown">*/}
            {/*    <button className="nav-dropbtn">Лучшие<i className="fa fa-caret-down"/>*/}
            {/*    </button>*/}
            {/*    <div className="nav-dropdown-content">*/}
            {/*        <Link to="/best/day">За сегодня</Link>*/}
            {/*        <Link to="/best/week">За неделю</Link>*/}
            {/*        <Link to="/best/ever">За всё время</Link>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <LoginButton/>
        </div>
    );
}

export default TopNavigation;