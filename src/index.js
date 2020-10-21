import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ThemeProvider} from '@material-ui/core/styles'
import CssBaseline from "@material-ui/core/CssBaseline";
import 'normalize.css';
import theme from './theme';
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {rootReducer} from "./redux/reducers/rootReducer";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <App/>
        </ThemeProvider>
    </Provider>,
    document.getElementById('root')
);
