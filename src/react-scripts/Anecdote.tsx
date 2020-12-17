import React, {useState} from 'react'
import {ApiClient} from "../services/ApiClient";

interface AnecdoteInput {
    anecdote: IAnecdote
}


const Anecdote: React.FC<AnecdoteInput> = (input) => {
    let anecdote: IAnecdote = input.anecdote
    const isAuth = Boolean(window.localStorage.getItem("auth_access"))
    const [likeNum, setLikeNum] = useState(anecdote.likes)
    const [rerenderState, rerender] = useState(false)


    const LikeClick = React.useCallback(
        async (event: React.SyntheticEvent) => {
            try {
                const response = await ApiClient(`likes/${anecdote.id}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "Application/json",
                        }
                    })
                setLikeNum((await response.json()).new_likes)
                anecdote.likes = likeNum
                rerender(!rerenderState)
            } catch (err) {
                console.log(err)
            }
        }, [anecdote, likeNum, rerenderState])


    const LikeButton = () => {
        if (isAuth) {
            return (
                <div className="anecdote-like-block">
                    <a className="anecdote-likes">
                        {likeNum}
                    </a>
                    <button className="anecdote-like-btn"
                            onClick={LikeClick}>
                        +
                    </button>
                </div>
            )
        }
        return (
            <div>
                <a className="anecdote-likes">
                    {likeNum}
                </a>
            </div>
        )
    }
    return (
        <div className="anecdote-wrapper">
            <div className="anecdote-body">
                <div className="anecdote-author">
                    {anecdote.author.username}
                </div>
                <div className="anecdote-text">
                    {anecdote.text}
                </div>
                <LikeButton/>
                <div className="anecdote-date">
                    {anecdote.date}
                </div>
            </div>
            <div className="anecdote-separator">***</div>
        </div>
    );
}

export default Anecdote;