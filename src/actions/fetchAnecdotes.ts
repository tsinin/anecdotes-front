import {Dispatch} from 'redux'
import {ApiClient} from "../services/ApiClient";

export function fetchAnecdotes(query: string) {
    return async (dispatch: Dispatch) => {
        dispatch({"type": "loadingAnecdotes"})
        let anecdotes;

        try {
            const response = await ApiClient(`${query}/`,
                {
                    headers: {
                            "Content-Type": "Application/json",
                    },
                })

            anecdotes = {"response": await response.json(),
                         "type": "saveAnecdotes"};
            console.log(anecdotes)
            dispatch(anecdotes)
            console.log(anecdotes)

        } catch(err) {
            console.log(err)
        }
    }

}