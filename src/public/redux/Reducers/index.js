import { combineReducers } from "redux";
import AuthReducer from './Auth'
import bagReducer from "./Bag";
import addressReducer from "./Address"

const reducers = combineReducers({
    auth: AuthReducer,
    bag: bagReducer,
    address: addressReducer

})

export default reducers