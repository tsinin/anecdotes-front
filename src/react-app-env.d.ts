/// <reference types="react-scripts" />


interface IUser {
    id: number
    username: string
}

interface IAnecdote {
    text: string
    date: string
    author: IUser
    likes: number
    id: number
    whoLikedIt: any
}


interface LoadAnecdotesState {
    isLoading: boolean
    anecdotes: IAnecdote[]
}

interface LoginState {
    isLoading: boolean
    loggedIn: boolean
    access_token: string | null
    refresh_token: string | null
    user: IUser | null
}


interface State {
    LoadAnecdote: LoadAnecdotesState;
    Login: LoginState;
}