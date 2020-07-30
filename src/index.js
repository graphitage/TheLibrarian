import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose, combineReducers } from "redux"
import thunk from 'redux-thunk';

import detailsReducer from './store/reducers/details';
import uiReducer from './store/reducers/ui';

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css"

const rootReducer = combineReducers({
    details: detailsReducer,
    ui: uiReducer,
})

const logger = store => {
    return (next) => {
        return action => {
            console.log('[Middleware] Dispatching', action);
            const result = next(action);
            console.log('[Middleware] next state', store.getState());
            return result;
        }
    }
}

//for Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
