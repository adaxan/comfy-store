import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Details from './pages/Details';
import MainLayout from './layouts/MainLayout';
import About from './pages/About';
import Cart from './pages/Cart';

function App() {
  return (
    <div>
        <Routes>
          <Route index element={<MainLayout><Home></Home></MainLayout>}></Route>
          <Route path='/about' element={<MainLayout><About></About></MainLayout>}></Route>
          <Route path='/cart' element={<MainLayout><Cart></Cart></MainLayout>}></Route>
          <Route path='/products' element={<MainLayout><Products></Products></MainLayout>}></Route>
          <Route path='/products/:id' element={<MainLayout><Details></Details></MainLayout>}></Route>
        </Routes>
    </div>
  )
}

export default App;