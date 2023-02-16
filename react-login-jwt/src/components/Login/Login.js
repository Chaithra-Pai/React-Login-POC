import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate  } from 'react-router-dom';

const Login = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage(null);

    if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userCredentials.email)
    ) {
      setErrorMessage("Invalid Email");
      return;
    }

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },

      redirect: "follow", // manual, *follow, error
      body: JSON.stringify({ username: userCredentials.email, password: userCredentials.password }), // body data type must match "Content-Type" header
    };

    fetch("http://localhost:4000/login", options).then((res) =>
      res.json().then((data) => {
        console.log(data)

        if(data.accessToken && data.refreshToken){
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          routeChange();
        }   
      }).catch((err)=>console.log(err))
    );

  };

  const routeChange = () => {
    // let flag = false;

    const accessToken = localStorage.getItem("accessToken")
    const refreshToken = localStorage.getItem("refreshToken")

    if(accessToken && refreshToken){
      console.log(accessToken);
      navigate('/product', { replace: true });
    }

    // (accessToken && refreshToken) ? flag=true : flag=false
    // return flag
    

    
  }

  return (
    <>
      <div className="logincontainer">
        <div className="container">
          <div className="loginheading">Login</div>
          <div className="logindescription">
            Get access to your orders, Wishlist and Recommendations
          </div>
        </div>
        <div className="loginform">
          <form onSubmit={handleSubmit}>
            <div className="emailBox">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={userCredentials.email}
                onChange={handleChange}
                required
                //placeholder="Enter your Username"
              />
            </div>
            <div className="emailBox">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={userCredentials.password}
                onChange={handleChange}
                required
                // placeholder="Enter your Password"
              />
            </div>
            <button
              type="submit"
              className="loginbutton"
              id="loginButton"
              data-testid="loginButton"
              
            >
              Login
            </button>
            <p className="loginError">{""}</p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
