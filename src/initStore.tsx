import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from './reducers'

const loggerMiddleware = (storeAPI: any) => (next: any) => (action: any) => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', storeAPI.getState())
    return result
}

export default function initStore() {
    const store = {}
    return createStore(reducers, store, composeWithDevTools(applyMiddleware(thunk), applyMiddleware(loggerMiddleware)))
}