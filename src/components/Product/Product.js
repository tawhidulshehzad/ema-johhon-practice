import { faCode, faCoffee, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Product.css";

const Products = (props) => {
  // const { handleAddToCart } = props;
  const { name, img, seller, price, ratings } = props.product;

  return (
    <div className="product">
      <img src={img} alt="" />
      <div className="product-info">
        <p className="p-name">{name}</p>
        <p>Price: ${price}</p>
        <p>
          <small>Seller: {seller}</small>
        </p>
        <p>
          <small>Rating: {ratings} stars</small>
        </p>
      </div>
      <div>
        <button
          onClick={() => props.handleAddToCart(props.product)}
          className="btn-cart"
        >
          <p>Add to cart</p>
          <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
        </button>
      </div>
    </div>
  );
};

export default Products;
