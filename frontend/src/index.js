import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {DataProvider} from './DataContext'
import {Provider} from 'react-redux'
import { BrowserRouter} from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './store';
const { persistor, store } = configureStore()

ReactDOM.render(
  
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate persistor={persistor}>
    <DataProvider>
      <BrowserRouter>
    <App />
    </BrowserRouter>
    </DataProvider>
    </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
