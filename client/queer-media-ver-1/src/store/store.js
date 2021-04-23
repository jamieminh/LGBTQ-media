import rootReducer from './reducers/rootReducer'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

export const middlewares = [thunk]

// redux dev tools in chrome
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// thunk is required to execute async code in redux action creators
export const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
))


// create store and apply middleware at the same time
// export const createStoreWithMiddleware = composeEnhancers(applyMiddleware(middlewares))(createStore)

// export const store = createStoreWithMiddleware(rootReducer)