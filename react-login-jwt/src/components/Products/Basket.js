import React, { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import util from "../../util";
import { removeFromCart } from "../../redux/actions/cartActions";

const Basket = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  return (
    <div className="alert alert-info">
      {cartItems.length === 0 ? (
        "Basket is empty"
      ) : (
        <div>
          You have {cartItems.length} items in the basket. <hr />
        </div>
      )}
      {cartItems.length > 0 && (
        <div>
          <ul style={{ marginLeft: -25 }}>
            {cartItems.map((item) => (
              <li key={item.id}>
                <b>{item.title}</b>
                <button
                  style={{ float: "right" }}
                  className="btn btn-danger btn-xs"
                  onClick={(e) =>
                    dispatch(removeFromCart(cartItems, item))
                  }
                >
                  X
                </button>
                <br />
                {item.count} X {util.formatCurrency(item.price)}
              </li>
            ))}
          </ul>

          <b>
            Sum:{" "}
            {util.formatCurrency(
              cartItems.reduce((a, c) => a + c.price * c.count, 0)
            )}
          </b>
          <button
            onClick={() => alert("Todo: Implement checkout page.")}
            className="btn btn-primary"
          >
            checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Basket;

