import checkPropTypes from 'check-prop-types'
import {applyMiddleware, createStore} from 'redux'
import rootReducer from './store/reducers/rootReducer'
import { middlewares } from '../src/store/store'


export const findByTestAttr = (component, attr) => {
    return component.find(`[data-test='${attr}']`)
}

export const checkProps = (component, expectedProps) => {
    return checkPropTypes(component.propTypes, expectedProps, 'props', component.name)
}


// a function to create a test store for integration test
export const testStore = (initialState) => {
    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)
    return createStoreWithMiddleware(rootReducer, initialState)
}