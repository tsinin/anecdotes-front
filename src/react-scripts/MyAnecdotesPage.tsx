import React from "react";
import RenderAnecdotes from "./RenderAnecdotes";
import HomePage from "./HomePage";

function MyAnecdotesPage() {
    const isAuth = Boolean(window.localStorage.getItem("auth_access"))

    if (!isAuth) {
        return (
            <HomePage/>
        )
    } else {
        const username = window.localStorage.getItem("username")
        return (
            <RenderAnecdotes query={`anecdotes?author=${username}`}/>
        )
    }
}

export default MyAnecdotesPage;