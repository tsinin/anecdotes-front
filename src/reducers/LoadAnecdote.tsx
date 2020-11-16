const initAnecdotesState: LoadAnecdotesState = {
    "anecdotes": [],
    "isLoading": false
}


export default (state: LoadAnecdotesState, action: any) => {
    if (state === undefined) {
        return initAnecdotesState;
    } else if (action.type === "loadingAnecdotes") {
        return {"anecdotes": [], "isLoading": true}
    } else if (action.type === 'saveAnecdotes') {
        return {"anecdotes": action["response"], "isLoading": false}
    } else {
        return state
    }
}