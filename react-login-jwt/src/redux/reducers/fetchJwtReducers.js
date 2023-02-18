import { FETCH_JWT_TOKEN } from "./types";

const initState = { accessToken: "",error:"" };

export default function (state = initState, action) {
    switch (action.type) {
      case FETCH_JWT_TOKEN:
        return { ...state, accessToken: action.payload};
      
      default:
        return state;
    }
  }