import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login';
import Products from './components/Products/Products';
import { Provider } from 'react-redux';
import store from './store';
import { Route, Routes } from 'react-router-dom';
import { history } from './history';

function App() {
  return (
    <Provider store={store}>
      <Routes history={history}>
        <Route path='/' element={<Login/>} exact/>
        <Route path='/product' element={<Products/>} />
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
