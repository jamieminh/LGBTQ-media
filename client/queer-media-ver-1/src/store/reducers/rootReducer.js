import MediaReducer from './mediaFilters'
import AuthReducer from './auth'
import AdminReducer from './admin'
import UserReducer from './userMedia'
import {combineReducers} from 'redux'

export default combineReducers({
  media: MediaReducer,
  auth: AuthReducer,
  admin: AdminReducer,
  user: UserReducer
})