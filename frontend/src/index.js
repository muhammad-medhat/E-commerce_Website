import React from 'react'
import  ReactDOM  from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { Provider } from 'react-redux';
import { persistor, store } from "./features/store";
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';

ReactDOM.render(      

    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>

, document.getElementById("root"));