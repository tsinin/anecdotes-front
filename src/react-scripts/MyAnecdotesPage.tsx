import React from "react";
import RenderAnecdotes from "./RenderAnecdotes";
import {useSelector} from 'react-redux'
import HomePage from "./HomePage";

function MyAnecdotesPage() {
    const login = useSelector((state: State) => state.Login)

    if (!login.loggedIn || login.user === null) {
        return (
            <HomePage/>
        )
    } else {
        return (
            <RenderAnecdotes query={`/anecdotes?author=${login.user.name}`}/>
        )
    }
}

export default MyAnecdotesPage;