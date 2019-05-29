//@flow
import { combineReducers } from "redux";
import mistReducer from "./mistReducer";


export default combineReducers({
  mist: mistReducer
});