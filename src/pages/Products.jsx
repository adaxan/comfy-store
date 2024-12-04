import React, {useState, useEffect} from "react";
import http from "../axios";
import { useNavigate } from "react-router-dom";
function Products() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        http
          .get("products")
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
    <div>
      <div class="py-8 px-12 rounded-lg shadow-md">
        <div class="flex justify-between items-center">
          <div class="w-1/5">
            <label class="block text-sm text-gray-700">Search Product</label>
            <input
              type="text"
              placeholder="Search"
              class="w-full px-3 py-2 border rounded-md mt-1"
            />
          </div>
          <div class="w-1/5">
            <label class="block text-sm text-gray-700">Select Category</label>
            <select class="w-full px-3 py-2 border rounded-md mt-1">
              <option value="all">all</option>
            </select>
          </div>
          <div class="w-1/5">
            <label class="block text-sm text-gray-700">Select Company</label>
            <select class="w-full px-3 py-2 border rounded-md mt-1">
              <option value="all">all</option>
            </select>
          </div>
          <div class="w-1/5">
            <label class="block text-sm text-gray-700">Sort By</label>
            <select class="w-full px-3 py-2 border rounded-md mt-1">
              <option value="a-z">a-z</option>
            </select>
          </div>
        </div>
        <div className="flex justify-between">
          <div class="mt-4">
            <label class="block text-sm text-gray-700">Select Price</label>
            <input type="range" min="0" max="1000" value="0" class="w-full" />
            <div class="flex justify-between text-sm">
              <span>$0.00</span>
              <span>$1,000.00</span>
            </div>
          </div>
          <div class="mt-4 flex items-center">
            <input type="checkbox" class="mr-2" />
            <label class="text-sm">Free Shipping</label>
          </div>
          <div class="mt-6 flex gap-20 justify-between">
            <button class="px-6 py-2 bg-blue-500 text-white rounded-md">
              SEARCH
            </button>
            <button class="px-6 py-2 bg-purple-500 text-white rounded-md">
              RESET
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6 mt-10">
        {products.length > 0 &&
          products.map((product, index) => {
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
                  {product.attributes.price}$
                </h3>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Products;
