import rootReducer from './reducers/rootReducer'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const middlewares = [thunk]

// redux dev tools in chrome
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// thunk is required to execute async code in redux action creators
export const store = createStore(persistedReducer, composeEnhancers(
  applyMiddleware(thunk)
))

// store persistor
export const persistor = persistStore(store)


// create store and apply middleware at the same time
// export const createStoreWithMiddleware = composeEnhancers(applyMiddleware(middlewares))(createStore)

// export const store = createStoreWithMiddleware(rootReducer)