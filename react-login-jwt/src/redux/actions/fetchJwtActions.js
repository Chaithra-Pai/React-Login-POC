import { FETCH_JWT_TOKEN } from "./types";

export const fetchJwtToken = () => (dispatch) => {

  let accessToken = localStorage.getItem("accessToken");
  let refreshToken = localStorage.getItem("refreshToken");

  fetch("http://localhost:4000/token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    body: JSON.stringify({ accessToken: accessToken, refreshToken: refreshToken }), 
  }) 
  .then((res) => res.json())
  .then((data) => {
    //console.log(data.accessToken);
    dispatch({ type: FETCH_JWT_TOKEN, payload: data.accessToken });
  });

};
