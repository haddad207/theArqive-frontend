import {GET_ABOUT_US, UPDATE_ABOUT_US} from "../actions/types";

const initialState = {
  about_us: '',
};

export default function(state = initialState, action) {
    switch (action.type) {
        case UPDATE_ABOUT_US:
            return {
                ...state,
                about_us: action.payload.about_us,
            };
        case GET_ABOUT_US:
            console.log(action.payload.about_us);
            console.log("was the data");
            return {
                ...state,
                about_us: action.payload.about_us,
            };
        default:
            return state;
    }
}