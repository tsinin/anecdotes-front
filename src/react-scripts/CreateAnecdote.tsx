import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import backendDomain from "../backendDomain";

function CreateForm() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({"type": "updateLogin"})
    }, [dispatch])

    const history = useHistory();
    const [text, setText] = React.useState("")
    const [author, setAuthor] = React.useState("anon")
    const login = useSelector((state: State) => state.Login)


    const handleSubmit = React.useCallback(
        async (event: React.SyntheticEvent) => {
            event.preventDefault()
            if (!text) {
                return;
            }

            const date = new Date()
            const anecdote: Omit<IAnecdote, "id"> = {
                date: date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear(),
                text,
                author: (author === "myself" && login.user !== null) ? login.user.name : author,
                likes: 0,
                who_liked_it: []
            };

            await fetch(`${backendDomain}/anecdotes`,
                {
                    method: "POST",
                    headers: {
                    "Content-Type": "Application/json",
                    },
                    body: JSON.stringify(anecdote)
            });

            history.push("/")
        },
        [author, history, login, text]
    )

    function Publisher(props: any) {
        if (props.isLoggedIn) {
            return (
                <div className="form-item">
                    <label><p id="create-anecdote-publisher">От кого публиковать</p></label>
                    <label>
                        <select className="new-publisher"
                                name="publisher"
                                value={author}
                                onChange={(event => {
                                    setAuthor(event.target.value)
                                })}>
                            <option value="Аноним">Анонимно</option>
                            <option value="myself">От моего имени</option>
                        </select>
                    </label>
                </div>
            )
        } else {
            return (
                <div className="form-item">
                    <label><p id="create-anecdote-publisher">От кого публиковать</p></label>
                    <label>
                        <select className="new-publisher"
                                name="publisher"
                                value={author}
                                onChange={(event => {
                                    setAuthor(event.target.value)
                                })}>
                            <option value="Аноним">Анонимно</option>
                        </select>
                    </label>
                </div>
                )
        }
    }

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
                        <Publisher isLoggedIn={login.loggedIn}/>
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