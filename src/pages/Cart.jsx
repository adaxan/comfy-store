import React, { useContext } from "react";
import { CartContext } from "../App";

function Cart() {
  const { cart, setCart } = useContext(CartContext);

  function handleRemove(id, color) {
    let copied = [...cart];
    copied = copied.filter(item => !(item.id === id && item.color === color));
    setCart(copied);
    localStorage.setItem('cart', JSON.stringify(copied));
  }  

  function handleChangeCount(newCount, id) {
    let copied = [...cart];
    copied = copied.map((item) =>
      item.id == id ? { ...item, count: newCount } : item
    );
    setCart(copied);
    localStorage.setItem("cart", JSON.stringify(copied));
  }

  const subtotal = cart.reduce(
    (acc, item) => acc + item.data.attributes.price * item.count,
    0
  );
  const shipping = 5.0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6">Shopping Cart</h2>
      {cart.length > 0 && (
        <>
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center mb-6 pb-6 border-b border-gray-300"
            >
              <div className="w-1/4">
                <img
                  className="w-full h-40 rounded-lg object-cover shadow-md"
                  src={item.data.attributes.image}
                  alt={item.data.attributes.title}
                />
              </div>
              <div className="w-1/3 px-4">
                <h3 className="text-lg font-semibold">
                  {item.data.attributes.title}
                </h3>
                <h4 className="text-sm text-gray-500">
                  {item.data.attributes.company}
                </h4>
                <div className="flex items-center mt-2">
                  <span className="text-gray-600 mr-2">Color:</span>
                  <span
                    className="inline-block w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: item.color }}
                  ></span>
                </div>
              </div>
              <div className="w-1/4 text-center flex flex-col items-center gap-2">
                <label className="text-gray-500 text-sm block mb-1">
                  Amount
                </label>
                <select
                  onChange={(e) => handleChangeCount(e.target.value, item.id)}
                  className="w-20 py-2 px-2 border border-gray-300 bg-white text-black rounded-lg"
                  value={item.count}
                >
                  {[...Array(5)].map((_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <button
                  className="btn btn-error cursor-pointer"
                  onClick={() => handleRemove(item.id, item.color)}
                >
                  remove
                </button>
              </div>
              <div className="w-1/5 text-right">
                <h3 className="text-lg font-bold">
                  ${item.data.attributes.price}
                </h3>
              </div>
            </div>
          ))}

          <div className="w-full flex justify-end">
            <div className="w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold mb-4">Order Summary</h3>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-800">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-800">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-800">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Order Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
