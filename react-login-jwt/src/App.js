import "./App.css";
import Login from "./components/Login/Login";
import Products from "./components/Products/Products";
import { Provider } from "react-redux";
import store from "./store";
import { Route, Routes } from "react-router-dom";
import { history } from "./history";
import axios from "axios";
import jwt_decode from "jwt-decode";
import axiosInstance from "./utils/axiosInstance";

function App() {
  const getNewAccessToken = async () => {
    let refreshToken = localStorage.getItem("refreshToken");
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      redirect: "follow", // manual, *follow, error
      data: JSON.stringify({ refreshToken: refreshToken }), // body data type must match "Content-Type" header
    };
    return await axios("http://localhost:4000/token", options);
  };

  axiosInstance.interceptors.request.use(async (request) => {
    let currentDate = new Date();
    let accessToken = jwt_decode(localStorage.getItem("accessToken"));
    if (accessToken.exp < currentDate.getTime()/1000) {	
			await getNewAccessToken().then(
				(response) => {request.headers['authorization'] = response.data.accessToken;
				localStorage.setItem('accessToken', response.data.accessToken)}
			);
		}
    return request;
  });

  return (
    <Provider store={store}>
      <Routes history={history}>
        <Route path="/" element={<Login />} exact />
        <Route path="/product" element={<Products />} />
      </Routes>
      <div>
        {/* <Login /> */}
        {/* <Products /> */}
      </div>
    </Provider>
  );
}

export default App;

//     <div className="App">
//       <h1>Protected Router</h1>
//       <Routes>
//         <Route path='/login' element={<Login/>} />
//         <Route element={<PrivateRoutes/>} >
//           <Route path='/' element={<Home/>} exact/>
//           <Route path='/product' element={<Products/>} />
//         </Route>
//       </Routes>
//       <Register/>
//     </div>
