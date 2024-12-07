import React, { useState, useEffect } from "react";
import http from "../axios";
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [company, setCompany] = useState("all");
  const [price, setPrice] = useState(0);
  const [freeShipping, setFreeShipping] = useState(false);
  const [sort, setSort] = useState("a-z");

  const navigate = useNavigate();

  useEffect(() => {
    http
      .get("products")
      .then((response) => {
        if (response.status == 200) {
          setProducts(response.data.data);
          setFilteredProducts(response.data.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    filterProducts();
  }, [search, category, company, price, freeShipping, sort]);

  function filterProducts() {
    let filtered = [...products];
    if (search) {
      filtered = filtered.filter((product) =>
        product.attributes.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category != "all") {
      filtered = filtered.filter(
        (product) => product.attributes.category == category
      );
    }
    if (company != "all") {
      filtered = filtered.filter(
        (product) => product.attributes.company == company
      );
    }
    filtered = filtered.filter(
      (product) => product.attributes.price <= price
    );
    if (freeShipping) {
      filtered = filtered.filter(
        (product) => product.attributes.freeShipping == true
      );
    }
    if (sort == "a-z") {
      filtered = filtered.sort((a, b) =>
        a.attributes.title.localeCompare(b.attributes.title)
      );
    } else if (sort == "z-a") {
      filtered = filtered.sort((a, b) =>
        b.attributes.title.localeCompare(a.attributes.title)
      );
    } else if (sort == "low-high") {
      filtered = filtered.sort(
        (a, b) => a.attributes.price - b.attributes.price
      );
    } else if (sort == "high-low") {
      filtered = filtered.sort(
        (a, b) => b.attributes.price - a.attributes.price
      );
    }

    setFilteredProducts(filtered);
  }

  function handleDetails(id) {
    navigate(`/products/${id}`);
  }

  function resetFilters() {
    setSearch("");
    setCategory("all");
    setCompany("all");
    setPrice(1000);
    setFreeShipping(false);
    setSort("a-z");
  }

  return (
    <div>
      <div className="py-8 px-12 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <div className="w-1/5">
            <label className="block text-sm text-white">Search Product</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="w-full px-3 py-2 border rounded-md mt-1"
            />
          </div>
          <div className="w-1/5">
            <label className="block text-sm text-white">Select Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border bg-white text-black rounded-md mt-1"
            >
              <option value="all">all</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home</option>
            </select>
          </div>
          <div className="w-1/5">
            <label className="block text-sm text-white">Select Company</label>
            <select
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-3 py-2 bg-white text-black border rounded-md mt-1"
            >
              <option value="all">all</option>
              <option value="apple">Apple</option>
              <option value="samsung">Samsung</option>
              <option value="sony">Sony</option>
            </select>
          </div>
          <div className="w-1/5">
            <label className="block text-sm text-white">Sort By</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full px-3 py-2 bg-white text-black border rounded-md mt-1"
            >
              <option value="a-z">a-z</option>
              <option value="z-a">z-a</option>
              <option value="low-high">low-high</option>
              <option value="high-low">high-low</option>
            </select>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="mt-4">
            <label className="block text-sm text-white">Select Price</label>
            <input
              type="range"
              min="0"
              max="1000"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full bg-white text-black"
            />
            <div className="flex justify-between text-sm">
              <span>$0.00</span>
              <span>${price.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              checked={freeShipping}
              onChange={(e) => setFreeShipping(e.target.checked)}
              className="mr-2"
            />
            <label className="text-sm">Free Shipping</label>
          </div>
          <div className="mt-6 flex gap-20 justify-between">
            <button
              onClick={filterProducts}
              className="px-6 py-2 bg-blue-500 text-white rounded-md"
            >
              SEARCH
            </button>
            <button
              onClick={resetFilters}
              className="px-6 py-2 bg-purple-500 text-white rounded-md"
            >
              RESET
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6 mt-10">
        {filteredProducts.length > 0 &&
          filteredProducts.map((product, index) => {
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