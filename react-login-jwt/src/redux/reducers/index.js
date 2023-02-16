import { combineReducers } from "redux";
import productReducers from "./productReducer";
import cartReducers from "./cartReducers";

export default combineReducers({
  products: productReducers,
  cart: cartReducers,
});