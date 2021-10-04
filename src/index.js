require('file-loader?name=[name].[ext]!./index.html');
import React from 'react';
import ReactDom from 'react-dom';
import { StrictMode } from "react";
import store from "./redux/store";
import { theme } from "./theme";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import App from './App';


const rootElement = document.getElementById('root');

ReactDom.render(
    <StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </Provider>
    </StrictMode>, 
    rootElement);