import Main from "./react-scripts/Main";
import TopNavigation from "./react-scripts/TopNavigation";
import './styles/main.css';
import './styles/other.css';
import React from "react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import initStore from './initStore'


function App () {
    return (
        <Provider store={initStore()}>
            <BrowserRouter>
                <TopNavigation/>
                <Main/>
            </BrowserRouter>
        </Provider>
    )
}

export default App;
