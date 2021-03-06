import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {DataProvider} from './context/DataContext'
import {ThemeProvider} from './context/ThemeContext'
import {Provider} from 'react-redux'
import { BrowserRouter} from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './store';
import 'font-awesome/css/font-awesome.min.css';

const { persistor, store } = configureStore()

ReactDOM.render(
  
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate persistor={persistor}>
    <DataProvider>
    <ThemeProvider>
      <BrowserRouter>
    <App />
    </BrowserRouter>
    </ThemeProvider>
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
