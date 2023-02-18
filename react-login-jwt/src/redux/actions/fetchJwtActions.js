import { FETCH_JWT_TOKEN } from "./types";

export const fetchJwtToken = () => (dispatch) => {
  let refreshToken = localStorage.getItem("refreshToken");
console.log(JSON.stringify(refreshToken))
let options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },

  redirect: "follow", // manual, *follow, error
  body: JSON.stringify({refreshToken:refreshToken}), // body data type must match "Content-Type" header
};
  fetch("http://localhost:4000/token",options) 
  .then((res) => res.json())
  .then((data) => {
    //console.log(data.accessToken);
    dispatch({ type: FETCH_JWT_TOKEN, payload: data.accessToken });
  }).catch(error=>dispatch());

};
