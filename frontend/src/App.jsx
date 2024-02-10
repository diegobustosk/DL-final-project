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
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
