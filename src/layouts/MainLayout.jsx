import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";

function MainLayout({ children }) {
  const navigate = useNavigate()
  return (
    <div className="container mx-auto">
      <div className="flex gap-10 justify-end py-4">
        <Link>Sign in</Link>
        <Link>Create account</Link>
      </div>    
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <a className="text-xl bg-blue-700 py-3 px-5 rounded-md cursor-pointer text-white hover:bg-blue-900">
            C
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="flex gap-10">
            <li><Link className="hover:bg-black py-3 px-4 rounded-md" to="/">Home</Link></li>
            <li><Link className="hover:bg-black py-3 px-4 rounded-md" to="/about">About</Link></li>
            <li><Link className="hover:bg-black py-3 px-4 rounded-md" to="/products">Products</Link></li>
            <li><Link className="hover:bg-black py-3 px-4 rounded-md" to="/cart">Cart</Link></li>
          </ul>
        </div>
        <div className="navbar-end cursor-pointer">
          <IoCartOutline size={30} onClick={() => {navigate("/cart")}}/>
        </div>
      </div>
      <div className="py-8">
        {children}
      </div>
    </div>
  );
}

export default MainLayout;