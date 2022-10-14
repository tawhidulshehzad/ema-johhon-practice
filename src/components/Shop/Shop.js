import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { addToDb, getStoreCart } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Products from "../Product/Product";

import "./Shop.css";

const Shop = () => {
  const products = useLoaderData();
  const [cart, setCart] = useState([]);

  // Load data from database
  useEffect(() => {
    const storedCart = getStoreCart();
    const savedCart = [];
    for (const id in storedCart) {
      // console.log(id);
      const addedProduct = products.find((product) => product.id == id);
      if (addedProduct) {
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        savedCart.push(addedProduct);
      }
    }
    setCart(savedCart);
  }, [products]);

  const handleAddToCart = (selectedProduct) => {
    let newCart = [];
    const exists = cart.find((product) => product.id == selectedProduct.id);
    if (!exists) {
      selectedProduct.quantity = 1;
      newCart = [...cart, selectedProduct];
    } else {
      const rest = cart.filter((product) => product.id !== selectedProduct.id);
      exists.quantity = exists.quantity + 1;
      newCart = [...rest, exists];
    }
    setCart(newCart);
    addToDb(selectedProduct.id);
  };
  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map((product) => (
          <Products
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          ></Products>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
