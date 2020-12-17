import Anecdote from "./Anecdote";
import React from "react";
import {useSelector, useDispatch} from 'react-redux'
import {fetchAnecdotes} from '../actions/fetchAnecdotes'
import {Link} from "react-router-dom"

interface RenderAnecdotesInput {
    query: string
}

const RenderAnecdotes: React.FC<RenderAnecdotesInput> = (input) => {
    const dispatch = useDispatch()
    const {anecdotes, isLoading} = useSelector((state: State) => state.LoadAnecdote)

    React.useEffect(() => {
        dispatch(fetchAnecdotes(input.query))
    }, [dispatch, input.query]);

    if (isLoading) {
        return (
            <main>
                <Link id="create-anecdote-block" to="/create-anecdote">
                    <button className="default-btn"
                            id="create-new-anecdote-btn">
                        Написать анекдот
                    </button>
                </Link>
                <div>Loading...</div>
            </main>
        )
    }
    return (
        <main>
            <Link id="create-anecdote-block" to="/create-anecdote">
                <button className="default-btn"
                        id="create-new-anecdote-btn">
                    Написать анекдот
                </button>
            </Link>
            {anecdotes.map((anecdote) => (
                <Anecdote anecdote={anecdote}/>))}
        </main>
    )
}

export default RenderAnecdotes;