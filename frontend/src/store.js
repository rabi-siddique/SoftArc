import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = { // configuration object for redux-persist
    key: 'root',
    storage, // define which storage to use
    whitelist: ['auth']
}

const persistedReducer = persistReducer(persistConfig, rootReducer) // create a persisted reducer


const initialState = {}
const middleware = [thunk]


const configureStore = () =>{

const store = createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))

)

const persistor = persistStore(store); 
return {store,persistor}
}

export default configureStore