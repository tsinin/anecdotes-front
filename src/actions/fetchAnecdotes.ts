import {Dispatch} from 'redux'
import backendDomain from '../backendDomain'

export function fetchAnecdotes(query: string) {
    return async (dispatch: Dispatch) => {
        dispatch({"type": "loadingAnecdotes"})
        let anecdotes;

        try {
            const response = await fetch(`${backendDomain}${query}`, {
                headers: {
                    "Content-Type": "Application/json",
                },
            });

            anecdotes = {"response": await response.json(),
                         "type": "saveAnecdotes"};
            console.log(`${backendDomain}/${query}`)
            console.log("fetch results: ", JSON.stringify(anecdotes))

            dispatch(anecdotes)

        } catch(err) {
            console.log(err)
            // dispatch(postsFetchError())
        }
    }

}