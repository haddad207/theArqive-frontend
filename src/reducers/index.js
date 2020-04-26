import { combineReducers } from "redux"
import pins from './pins'
import errors from "./errors";
import messages from "./messages";
import auth from "./auth"
import users from "./auth"
import management from "./management";

export default combineReducers({
    pins,
    auth,
    errors,
    messages,
    users,
    management
})