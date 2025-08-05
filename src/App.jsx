import React from "react"
import {
  BrowserRouter as Router ,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import Home from "./pages/home/Home";
import Order from "./pages/order/Order";
import Cart from "./pages/cart/Cart";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import NoPage from "./pages/nopage/NoPage";
import MyState from "./context/data/myState";
import Signup from "./pages/registration/Signup";
import Login from "./pages/registration/Login";
import ProductInfo from "./pages/productInfo/ProductInfo";
import AddProduct from "./pages/admin/page/AddProduct";
import UpdateProduct from "./pages/admin/page/UpdateProduct";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <MyState>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/order" element={
          <ProtectedRoute>
            <Order/>
          </ProtectedRoute>
        }/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/dashboard" element={
          <ProtectedRouteForAdmin>
            <Dashboard/>
          </ProtectedRouteForAdmin>
        }/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/productinfo/:id" element={<ProductInfo/>}/>
        <Route path="/addproduct" element={
          <ProtectedRouteForAdmin>
            <AddProduct/>
          </ProtectedRouteForAdmin>
        }/>
        <Route path="/updateproduct/:id" element={
          <ProtectedRouteForAdmin>
            <UpdateProduct/>
          </ProtectedRouteForAdmin>
        }/>
        <Route path="/*" element={<NoPage/>}/>
      </Routes>
      <ToastContainer/>
    </Router>
    </MyState>
  )
}
export default App


// user
export const ProtectedRoute = ({children}) => {
  const user = localStorage.getItem('user');
  if(user){
    return children
  }else{
    return <Navigate to={"/login"}/>
  }
}

// admin
export const ProtectedRouteForAdmin = ({children}) => {
  const admin = localStorage.getItem('user');
  if(admin){
    const adminData = JSON.parse(admin);
    if(adminData.user && adminData.user.email === "kumar@gmail.com"){
      return children
    }else{
      return <Navigate to={"/login"}/>
    }
  }else{
    return <Navigate to={"/login"}/>
  }
}