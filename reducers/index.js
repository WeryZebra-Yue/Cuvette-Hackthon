import { combineReducers } from "redux";
import update from "./update";
import access from "./access"
let rootReducer = combineReducers({update,access})
export default rootReducer;