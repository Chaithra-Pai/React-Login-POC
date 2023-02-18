import { FETCH_JWT_TOKEN } from "./types";

export const fetchJwtToken = () => (dispatch) => {
  let refreshToken = localStorage.getItem("refreshToken");

  fetch("http://localhost:4000/token", {
    method: "POST",
    body: JSON.stringify({ refreshToken: refreshToken }), 
  }) 
  .then((res) => res.json())
  .then((data) => {
    //console.log(data.accessToken);
    dispatch({ type: FETCH_JWT_TOKEN, payload: data.accessToken });
  });

};
