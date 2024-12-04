import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from "../axios";

function Details() {
  const [product, setProduct] = useState({});
  const params = useParams();
  const navigate = useNavigate()
  const { id } = params;

  useEffect(() => {
    http
      .get(`products/${id}`)
      .then((response) => {
        if (response.status == 200) {
          setProduct(response.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div>
        <button onClick={() => {navigate("/")}} className="btn btn-outline btn-primary w-32">Back</button>
        <div className="max-w-7xl mx-auto p-8 mt-10">
      {product.id && product.attributes && (
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1">
            <img
              src={product.attributes.image}
              alt={product.attributes.title}
              className="w-full h-full rounded-lg object-cover shadow-lg"
            />
          </div>
          <div className="flex-1 space-y-6">
            <h1 className="text-3xl font-bold text-gray-300">{product.attributes.title}</h1>
            <h2 className="text-xl text-gray-500">{product.attributes.company}</h2>
            <h2 className="text-2xl text-gray-400">${product.attributes.price}</h2>
            <p className="text-gray-400">{product.attributes.description}</p>
            <div>
              <h4 className="text-lg font-semibold text-gray-500 mb-2">Colors</h4>
              <div className="flex gap-2">
                {product.attributes.colors &&
                  product.attributes.colors.map((color) => (
                    <span
                      key={color}
                      style={{ backgroundColor: color }}
                      className="w-8 h-8 rounded-full border border-gray-300 cursor-pointer"
                    ></span>
                  ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">Amount</h4>
              <select
                className="w-40 py-3 px-2 border border-gray-300 rounded-lg bg-white text-black"
                defaultValue="1"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <button className="btn btn-primary w-40">ADD TO BAG</button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default Details;