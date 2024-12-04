import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("https://strapi-store-server.onrender.com/api/products?limit=3")
      .then((response) => {
        if (response.status == 200) {
          setProducts(response.data.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleDetails(id) {
    navigate(`/products/${id}`);
  }

  return (
    <div className="container mx-auto mt-20 m-10">
      <div className="flex">
        <div>
          <h1 className="text-5xl w-96 font-bold text-gray-400 mb-10">
            We are changing <br />
            the way people shop
          </h1>
          <p className="w-1/2 font-medium mb-10">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
            repellat explicabo enim soluta temporibus asperiores aut obcaecati
            perferendis porro nobis.
          </p>
          <button className="btn btn-primary" onClick={() => {navigate("/products")}}>Our products</button>
        </div>
        <div className="flex space-x-4 bg-blue-900 p-4 rounded-xl w-1/3">
          <div className="card w-1/2 bg-white shadow-md rounded-xl overflow-hidden">
            <figure>
              <img
                src="https://via.placeholder.com/300x400"
                alt="Sofa"
                className="w-full h-full object-cover"
              />
            </figure>
          </div>
          <div className="card w-1/2 bg-white shadow-md rounded-xl overflow-hidden">
            <figure>
              <img
                src="https://via.placeholder.com/300x400"
                alt="Table"
                className="w-full h-full object-cover"
              />
            </figure>
          </div>
        </div>
      </div>
      <h2 className="mt-32 font-bold text-4xl mb-5">Featured products</h2>
      <hr />
      <div className="grid grid-cols-3 gap-6 mt-10">
        {products.length > 0 &&
          products.slice(0, 3).map((product, index) => {
            return (
              <div
                key={index}
                onClick={() => handleDetails(product.id)}
                className="border border-transparent rounded-lg p-4 shadow-md transition-transform duration-300 transform hover:scale-105 cursor-pointer"
              >
                <img
                  src={product.attributes.image}
                  alt=""
                  className="w-full h-72 object-cover rounded"
                />
                <h2 className="font-semibold text-lg mt-2">
                  {product.attributes.title}
                </h2>
                <h3 className="text-blue-600 font-bold">
                  {product.attributes.price} $
                </h3>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
