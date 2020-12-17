import React, {useEffect} from 'react';
import {
    Switch,
    Route
} from "react-router-dom";
import {useHistory} from "react-router-dom";
import {useDispatch} from 'react-redux'

import HomePage from "./HomePage"
import SignInPage from "./SignInPage";
import RenderAnecdotes from "./RenderAnecdotes";
import CreateForm from "./CreateAnecdote";
import MyAnecdotesPage from "./MyAnecdotesPage";
import SignUpPage from "./SignUpPage";


function Main() {
    const dispatch = useDispatch()
    const history = useHistory()
    const isAuth = window.localStorage.getItem("auth_access")

    useEffect(() => {
        async function innerAsync() {
            if (isAuth === null)
                return
            dispatch({type: "updateLogin"})
            history.push("/")
        }

        innerAsync()
    }, [dispatch, history, isAuth])

    return (
        <div className="wrapper">
            <Switch>
                <Route path="/sign-in" component={SignInPage}/>
                <Route path="/sign-up" component={SignUpPage}/>
                <Route path="/my-anecdotes" component={MyAnecdotesPage}/>
                {/*<Route path="/best/day">*/}
                {/*    <RenderAnecdotes query="top_day"/>*/}
                {/*</Route>*/}
                {/*<Route path="/best/week">*/}
                {/*    <RenderAnecdotes query="top_week"/>*/}
                {/*</Route>*/}
                {/*<Route path="/best/ever">*/}
                {/*    <RenderAnecdotes query="top_ever"/>*/}
                {/*</Route>*/}
                <Route path="/create-anecdote" component={CreateForm}/>
                <Route path="/">
                    <HomePage/>
                </Route>
            </Switch>
        </div>
    );
}

export default Main;