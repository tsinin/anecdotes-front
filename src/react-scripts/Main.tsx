import React, {useEffect} from 'react';
import {
    Switch,
    Route
} from "react-router-dom";
import {useHistory} from "react-router-dom";
import {useDispatch} from 'react-redux'
import backendDomain from "../backendDomain";

import HomePage from "./HomePage"
import AboutPage from "./AboutPage";
import SignInPage from "./SignInPage";
import RenderAnecdotes from "./RenderAnecdotes";
import CategoryPage from "./CategoryPage";
import CreateForm from "./CreateAnecdote";
import MyAnecdotesPage from "./MyAnecdotesPage";
import SignUpPage from "./SignUpPage";


function Main() {
    const dispatch = useDispatch()
    const history = useHistory()
    const credsString = window.localStorage.getItem("creds")

    useEffect(() => {
        async function innerAsync() {
            if (credsString === null)
                return
            const creds = JSON.parse(credsString)
            dispatch({"type": "loadingLogin"})
            try {
                const response = await fetch(
                    `${backendDomain}/users?name=${creds.name}&password=${creds.password}`,
                    {
                        headers: {
                            "Content-Type": "Application/json",
                        },
                    });
                let signInAction = {"response": await response.json(),
                    "type": "signInInfo"};
                console.log("fetch results: ", JSON.stringify(creds))
                dispatch(signInAction)
            } catch(err) {
                console.log(err)
                dispatch({"type": "logOut"})
            }
            history.push("/")
        }

        innerAsync()
    }, [dispatch, history, credsString])

    return (
        <div className="wrapper">
            <Switch>
                <Route path="/about" component={AboutPage}/>
                <Route path="/sign-in" component={SignInPage}/>
                <Route path="/sign-up" component={SignUpPage}/>
                <Route path="/my-anecdotes" component={MyAnecdotesPage}/>
                <Route path="/best/day">
                    <RenderAnecdotes query="/top_day"/>
                </Route>
                <Route path="/best/week">
                    <RenderAnecdotes query="/top_week"/>
                </Route>
                <Route path="/best/ever">
                    <RenderAnecdotes query="/top_ever"/>
                </Route>
                <Route path="/categories/1">
                    <CategoryPage name="1"/>
                </Route>
                <Route path="/categories/2">
                    <CategoryPage name="2"/>
                </Route>
                <Route path="/categories/3">
                    <CategoryPage name="3"/>
                </Route>
                <Route path="/categories/4">
                    <CategoryPage name="4"/>
                </Route>
                <Route path="/create-anecdote" component={CreateForm}/>
                <Route path="/">
                    <HomePage/>
                </Route>
            </Switch>
        </div>
    );
}

export default Main;