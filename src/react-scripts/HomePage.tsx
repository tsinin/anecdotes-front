import React from "react";
import RenderAnecdotes from "./RenderAnecdotes";

function HomePage() {
    return (
        <RenderAnecdotes query={"anecdotes"}/>
    )
}

export default HomePage;