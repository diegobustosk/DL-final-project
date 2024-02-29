import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Products from "./components/Products";
import Landing from "./components/Landing";
import Login from "./components/Login";
import userContext from "./context/userContext";
import { CartProvider } from "./context/cartContext";
import ProductDetail from "./components/ProductDetail";
import Register from "./components/Register";
import Cart from "./components/Cart";
import CreateProduct from "./components/admin/CreateProduct";
import AdminDashboard from "./components/admin/AdminDashboard";
import UserRoute from "./components/UserRoute";
import Profile from "./components/user/Profile";
import Orders from "./components/user/Orders";
import Favorites from "./components/user/Favorites";
import Layout from "./components/display/Layout";
import { FavoritesProvider } from "./context/favoritesContext";
import AboutUs from "./components/AboutUs";


function App() {
  const [user, setUser] = useState(null)

  return (
    <>
      <userContext.Provider value={{ user, setUser}}>
        <CartProvider>
          <FavoritesProvider>
            
          <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/products" element={<Products />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/product/detail" element={<ProductDetail />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/user" element={<Profile />} />
              <Route
                path="/user/favorites"
                element={<Favorites/>}
              />
              <Route
                path="/admin/createproduct"
                element={<CreateProduct/>}
              />
              <Route
                path="/admin/admindashboard"
                element={<AdminDashboard/>}
              />
            </Routes>
          </Layout>
        </BrowserRouter>
        </FavoritesProvider>
        </CartProvider>
      </userContext.Provider>
    </>
  );
}

export default App;
