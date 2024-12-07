import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

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
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate("/products");
            }}
          >
            Our products
          </button>
        </div>
        <div className="carousel carousel-center bg-neutral rounded-box max-w-md space-x-4 p-4">  
          <div className="carousel-item">
            <img
              src="https://img.freepik.com/free-photo/mid-century-modern-living-room-interior-design-with-monstera-tree_53876-129805.jpg"
              className="rounded-box w-96"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://media.istockphoto.com/id/943910360/photo/posters-in-cozy-apartment-interior.jpg?s=612x612&w=0&k=20&c=QzNjsxCNMcFNxpn4E2ocPvSU8Ud2S3B_mHyo5L-HOLo="
              className="rounded-box w-96"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://t3.ftcdn.net/jpg/02/71/05/60/360_F_271056073_C0tbpNLFbcGurqxoMXqPBrx8vzL9VLVY.jpg"
              className="rounded-box w-96"
            />
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
