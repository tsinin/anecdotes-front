import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import backendDomain from "../backendDomain";

interface AnecdoteInput {
    anecdote: IAnecdote
}


const Anecdote: React.FC<AnecdoteInput> = (input) => {
    const login = useSelector((state: State) => state.Login)
    const [rerenderState, rerender] = useState(false)

    const LikeClick = React.useCallback(
        async (event: React.SyntheticEvent) => {
            if (login.user === null || login.user.id === null) {
                return
            }
            if (input.anecdote.who_liked_it !== null &&
                input.anecdote.who_liked_it.includes(login.user.id)) {

                input.anecdote.likes--
                const index = input.anecdote.who_liked_it.indexOf(login.user.id)
                input.anecdote.who_liked_it.splice(index, 1)

            } else {
                input.anecdote.likes++
                if (input.anecdote.who_liked_it === null) {
                    input.anecdote.who_liked_it = []
                }
                input.anecdote.who_liked_it.push(login.user.id)
            }

            try {
                console.log(JSON.stringify(input.anecdote))
                await fetch(
                    `${backendDomain}/anecdotes/${input.anecdote.id}`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "Application/json",
                        },
                        body: JSON.stringify(input.anecdote)
                    });
                rerender(!rerenderState)
            } catch (err) {
                console.log(err)
            }
        }, [input, login, rerenderState])


    const LikeButton = () => {
        if (login.loggedIn) {
            return (
                <div className="anecdote-like-block">
                    <a className="anecdote-likes">
                        {input.anecdote.likes}
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
                    {input.anecdote.likes}
                </a>
            </div>
        )
    }
    return (
        <div className="anecdote-wrapper">
            <div className="anecdote-body">
                <div className="anecdote-author">
                    {input.anecdote.author}
                </div>
                <div className="anecdote-text">
                    {input.anecdote.text}
                </div>
                <LikeButton/>
                <div className="anecdote-date">
                    {input.anecdote.date}
                </div>
            </div>
            <div className="anecdote-separator">***</div>
        </div>
    );
}

export default Anecdote;