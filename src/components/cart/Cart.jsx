import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeCartItem, incrementQuantity, decrementQuantity } from '../store/cartSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const calculateCartTotal = (cartItems) => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const cartTotal = calculateCartTotal(cartItems);
  const totalItems = cartItems.reduce((count, item) => count + item.quantity, 0); // Calculate total item count


  const handleCheckout = () => {
    navigate("/order", {
      state: {
        cartItems,
        cartTotal,
        totalItems
      }
    });
  };

  return (
    <div className="container mt-5">
      <div className=' d-flex justify-content-between'>
      <h2 className="mb-4">Shopping Cart</h2>
      <button className="btn btn-light text-dark" onClick={()=>navigate("/")}>Back to Shopping</button>
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">Your cart is empty</td>
            </tr>
          ) : (
            cartItems.map((item) => (
              <tr key={item.product_id}>
                <td>
                  <div className="d-flex align-items-center">
                    <img src={item.imageUrl} alt={item.title} style={{ width: '100px',height:'100px', marginRight: '10px' }} />
                    {item.name}
                  </div>
                </td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-sm btn-secondary me-2"
                      onClick={() => dispatch(decrementQuantity(item.product_id))}
                      disabled={item.quantity === 0}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="btn btn-sm btn-secondary ms-2"
                      onClick={() => dispatch(incrementQuantity(item.product_id))}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => dispatch(removeCartItem(item.product_id))}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="text-right fw-bold">Total</td>
            <td colSpan="2">${cartTotal.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
      
      {/* Checkout Section */}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <div>
          <h5>Total Items: {totalItems}</h5>
          <h5>Total Amount: ${cartTotal.toFixed(2)}</h5>
        </div>
        <button
        className="btn btn-success"
        disabled={cartItems.length === 0}
        onClick={handleCheckout}
      >
        Checkout
      </button>
      </div>
    </div>
  );
};

export default Cart;
