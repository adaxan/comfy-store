import React, { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Details from "./pages/Details";
import Products from "./pages/Products";
import MainLayout from "./layouts/MainLayout";
import Register from "./pages/Register";
import Login from "./pages/Login";

export const CartContext = createContext();

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if(localStorage.getItem("cart")) {
       setCart(JSON.parse(localStorage.getItem("cart")))
    }
  }, [])

  
  return (
      <CartContext.Provider value={{ cart, setCart }}>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Home></Home>
              </MainLayout>
            }
          ></Route>
          <Route
            path="/about"
            element={
              <MainLayout>
                <About></About>
              </MainLayout>
            }
          ></Route>
          <Route
            path="/cart"
            element={
              <MainLayout>
                <Cart></Cart>
              </MainLayout>
            }
          ></Route>
          <Route
            path="/products"
            element={
              <MainLayout>
                <Products></Products>
              </MainLayout>
            }
          ></Route>
          <Route
            path="/products/:id"
            element={
              <MainLayout>
                <Details></Details>
              </MainLayout>
            }
          ></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
        </Routes>
      </CartContext.Provider>
  );
}

export default App;