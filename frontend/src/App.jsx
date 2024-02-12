import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  UNSAFE_RouteContext,
} from "react-router-dom";
import "./App.css";
import Products from "./components/Products";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import userContext from "./context/userContext";
import ProductDetail from "./components/ProductDetail";
import Register from "./components/Register";
import Cart from "./components/Cart";
import AdminRoute from "./components/AdminRoute";
import CreateProduct from "./components/admin/CreateProduct";
import AdminDashboard from "./components/admin/AdminDashboard";
import UserRoute from "./components/UserRoute";
import Profile from "./components/user/Profile";
import Orders from "./components/user/Orders";

function App() {
  return (
    <>
      <userContext.Provider value={{ name: "Diego" }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/detail" element={<ProductDetail />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <UserRoute exact path="/user" component={Profile} />
            <UserRoute exact path="/user/favorite" component={Profile} />
            <UserRoute exact path="/orders" component={Orders} />

            <AdminRoute
              exact
              path="/admin/createproduct"
              component={CreateProduct}
            />

            <AdminRoute
              exact
              path="/admin/admindashboard"
              component={AdminDashboard}
            />
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
    </>
  );
}

export default App;
