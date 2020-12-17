import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useDispatch} from 'react-redux'
import {ApiClient} from "../services/ApiClient";

function CreateForm() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({"type": "updateLogin"})
    }, [dispatch])

    const isAuth = Boolean(window.localStorage.getItem("auth_access"))
    const history = useHistory();
    const [text, setText] = React.useState("")

    if (!isAuth) {
        history.push("/sign-in");
    }

    const handleSubmit = React.useCallback(
        async (event: React.SyntheticEvent) => {
            event.preventDefault()
            if (!text) {
                return;
            }

            const date = new Date()
            const anecdote: any = {
                date: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
                text,
                likes: 0,
                whoLikedIt: "[]"
            };

            await ApiClient("anecdotes/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "Application/json",
                    },
                    body: JSON.stringify(anecdote)
                })

            history.push("/")
        },
        [history, text]
    )

    return (
        <div className="center-block">
            <div className="post">
                <form>
                    <h3 id="create-anecdote-header">Добавить анекдот</h3>
                    <div className="form-wrapper">
                        <div className="form-item">
                            <label>
                                <textarea className="new-anecdote"
                                       name="text"
                                       placeholder="Пиши здесь"
                                       value={text}
                                       onChange={(e) => {
                                           e.target.style.cssText = 'height:auto; padding:0';
                                           e.target.style.cssText = 'height:' + (e.target.scrollHeight+30) + 'px';
                                           setText(e.target.value)}}
                                />
                            </label>
                        </div>
                    </div>
                    <button type="submit"
                            className="default-btn"
                            id="post-anecdote-btn"
                            onClick={handleSubmit}>
                        Разместить
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateForm;