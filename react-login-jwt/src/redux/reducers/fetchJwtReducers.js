import { FETCH_JWT_TOKEN } from "./types";

const initState = { accessToken: "" };

export default function (state = initState, action) {
    switch (action.type) {
      case FETCH_JWT_TOKEN:
        localStorage.setItem("accessToken",action.payload)
        return { ...state};
      
      default:
        return state;
    }
  }