import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../App";
import http from "../axios";

function Details() {
  const [product, setProduct] = useState({});
  const [color, setColor] = useState("");
  const [count, setCount] = useState(1);
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;
  const {cart, setCart} = useContext(CartContext)

  useEffect(() => {
    http
      .get(`products/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setProduct(response.data.data);
          setColor(response.data.data.attributes.colors[0]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    if (!cart.length) {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(savedCart);
    }
  }, []);  

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  function handleBack(event) {
    event.preventDefault();
    navigate("/");
  }

  function handleCart(event) {
    event.preventDefault();
    const items = {
      count: count,
      color: color,
      id: product.id,
      data: product
    }
  
    let copied = [...cart];
  
    let isExist = copied.find(function(c) {
      return c.id == items.id && color == c.color;
    });
  
    if(!isExist) {
      setCart([...cart, items]);
    } else {
      copied = copied.map(function(val) {
        if(val.id == items.id && val.color == items.color) {
          return {
            ...val,
            count: val.count + Number(items.count)  
          }
        }
        return val;
      });
      setCart(copied);
    }
  }
 
  

  return (
    <div className="max-w-7xl mx-auto p-8 mt-10">
      <button onClick={handleBack} className="btn btn-outline btn-primary w-32 mb-10">
        Back
      </button>
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
            <h1 className="text-3xl font-bold text-white">{product.attributes.title}</h1>
            <h2 className="text-2xl text-gray-300">${product.attributes.price}</h2>
            <p className="text-gray-400">{product.attributes.description}</p>
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Colors</h4>
              <div className="flex gap-2">
                {product.attributes.colors.length > 0 &&
                  product.attributes.colors.map((colorProduct) => (
                    <span
                      key={colorProduct}
                      style={{ backgroundColor: colorProduct }}
                      className={`w-8 h-8 rounded-full border cursor-pointer ${
                        color === colorProduct ? "border-black" : "border-gray-300"
                      }`}
                      onClick={() => setColor(colorProduct)}
                    ></span>
                  ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Amount</h4>
              <select value={count} onChange={(e) => { setCount(Number(e.target.value)) }} className="w-40 py-3 px-2 border border-gray-300 bg-white text-black rounded-lg">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <button onClick={handleCart} className="btn btn-accent btn-primary w-40">
              ADD TO BAG
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;