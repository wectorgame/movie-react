import { combineReducers } from "redux";
import authReducer from "./auth";
import filmReducer from "./films";

export default combineReducers({
  auth: authReducer,
  film: filmReducer,
});
