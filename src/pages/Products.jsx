import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    company: "all",
    order: "a-z",
    price: 100000,
    freeShipping: false,
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [filters, page]);

  function fetchProducts() {
    const queryParams = new URLSearchParams({
      page,
      search: filters.search,
      category: filters.category,
      company: filters.company,
      order: filters.order,
      price: filters.price,
      freeShipping: filters.freeShipping,
    });

    http.get(`products?${queryParams.toString()}`)
      .then((response) => {
        if (response.status === 200) {
          setProducts(response.data.data);
          setTotalPages(response.data.meta?.pagination?.pageCount || 1);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }

  function handleFilterChange(e) {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === "checkbox" ? checked : value,
    });
    setPage(1);
  }

  function resetFilters() {
    setFilters({
      search: "",
      category: "all",
      company: "all",
      order: "a-z",
      price: 100000,
      freeShipping: false,
    });
    setPage(1);
  }

  function handleDetails(id) {
    navigate(`/products/${id}`);
  }

  function handlePageChange(newPage) {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  }

  return (
    <div className="p-8">
      <div className="bg-gray-900 text-gray-300 p-6 rounded-lg shadow-md mb-8 flex flex-wrap gap-6 items-center">
        <div className="flex flex-col w-1/5">
          <label className="text-gray-400 font-semibold mb-1 text-sm">
            Search Product
          </label>
          <input
            type="text"
            name="search"
            placeholder="Search"
            value={filters.search}
            onChange={handleFilterChange}
            className="bg-black text-gray-300 border border-gray-600 p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col w-1/5">
          <label className="text-gray-400 font-semibold mb-1 text-sm">
            Select Category
          </label>
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="bg-gray-800 text-gray-300 border border-gray-600 p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="furniture">Furniture</option>
          </select>
        </div>

        <div className="flex flex-col w-1/5">
          <label className="text-gray-400 font-semibold mb-1 text-sm">
            Select Company
          </label>
          <select
            name="company"
            value={filters.company}
            onChange={handleFilterChange}
            className="bg-gray-800 text-gray-300 border border-gray-600 p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          >
            <option value="all">All Companies</option>
            <option value="apple">Apple</option>
            <option value="samsung">Samsung</option>
          </select>
        </div>

        <div className="flex flex-col w-1/5">
          <label className="text-gray-400 font-semibold mb-1 text-sm">
            Sort By
          </label>
          <select
            name="order"
            value={filters.order}
            onChange={handleFilterChange}
            className="bg-gray-800 text-gray-300 border border-gray-600 p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          >
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>

        <div className="flex flex-col w-1/2">
          <div className="flex">
            <div className="w-1/3">
              <label className="text-gray-400 font-semibold mb-1 text-sm">
                Select Price
              </label>
              <input
                type="range"
                name="price"
                min="0"
                max="100000"
                value={filters.price}
                onChange={handleFilterChange}
                className="w-full bg-gray-800 focus:ring focus:ring-blue-500"
              />
              <span className="text-sm mt-1">
                ${filters.price.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center w-full ml-32">
              <input
                type="checkbox"
                name="freeShipping"
                checked={filters.freeShipping}
                onChange={handleFilterChange}
                className="mr-2 accent-blue-500"
              />
              <label className="text-gray-400 font-semibold text-sm">
                Free Shipping
              </label>
            </div>

            <div className="flex gap-10 mt-4">
              <button
                onClick={fetchProducts}
                className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
              >
                SEARCH
              </button>
              <button
                onClick={resetFilters}
                className="bg-purple-500 text-white px-4 py-2 rounded-md shadow hover:bg-purple-600"
              >
                RESET
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {products.length > 0 &&
          products.map((product, index) => (
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
              <h2 className="font-semibold text-lg mt-2 text-gray-300">
                {product.attributes.title}
              </h2>
              <h3 className="text-blue-500 font-bold">
                ${product.attributes.price}
              </h3>
            </div>
          ))}
      </div>

      <div className="flex justify-center items-center mt-8 gap-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 disabled:bg-gray-800"
        >
          Previous
        </button>
        <span className="text-gray-400">Page {page} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 disabled:bg-gray-800"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Products;  