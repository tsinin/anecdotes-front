/// <reference types="react-scripts" />

interface IAnecdote {
    text: string
    date: string
    author: string
    likes: number
    id: number
    who_liked_it: any
}
interface IUser {
    id: number
    name: string
    password: string
}



interface LoadAnecdotesState {
    isLoading: boolean
    anecdotes: []
}
interface LoginState {
    isLoading: boolean
    loggedIn: boolean
    token: string | null
    user: IUser | null
}


interface State {
    LoadAnecdote: LoadAnecdotesState;
    Login: LoginState;
}