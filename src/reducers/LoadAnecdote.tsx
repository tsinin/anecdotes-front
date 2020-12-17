const initAnecdotesState: LoadAnecdotesState = {
    anecdotes: [],
    isLoading: false
}


const LoadAnecdote = (state: LoadAnecdotesState = initAnecdotesState, action: any) => {
    if (action.type === "loadingAnecdotes") {
        return {"anecdotes": [], "isLoading": true}
    } else if (action.type === 'saveAnecdotes') {
        return {"anecdotes": action.response, "isLoading": false}
    } else {
        return state
    }
}

export default LoadAnecdote;