import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { emptyCart } from '../store/cartSlice';
import axios from 'axios';
import API from '../../const/Api';

const OrderForm = () => {
    const location = useLocation();
    const { cartItems, cartTotal, totalItems } = location.state || { cartItems: [], cartTotal: 0, totalItems: 0 };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem("jwt")

    const mapCartItemsToOrderItems = (items) => {
        return items.map(item => ({
            imageUrl: item.imageUrl,
            unitPrice: item.price, // Assuming the price is in the cart item
            quantity: item.quantity,
            productId: item.product_id, // Use productId instead of product_id
        }));
    };

    // Initial values setup
    const getInitialValues = () => ({
        orderTrackingId: 'TRACK12345',
        totalQuantity: totalItems,
        totalPrice: cartTotal,
        status: 'pending',
        deliveryDate: '',
        customer: {
            name: '',
            email: '',
            phno: '',
        },
        address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
        },
        orderItems: mapCartItemsToOrderItems(cartItems),
    });

    const validationSchema = Yup.object({
        customer: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email format').required('Email is required'),
            phno: Yup.string().matches(/^\d{10}$/, 'Phone number should be 10 digits').required('Phone number is required'),
        }),
        address: Yup.object({
            street: Yup.string().required('Street is required'),
            city: Yup.string().required('City is required'),
            state: Yup.string().required('State is required'),
            zipCode: Yup.string().matches(/^\d{6}$/, 'Zip Code should be 6 digits').required('Zip Code is required'),
        }),
    });

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (values, { resetForm }) => {
        setLoading(true);
        setSuccessMessage('');
        setErrorMessage('');

        try {
            const response = await axios.post(`${API}order/save`, values,{
                headers: {
                  'Authorization': `Bearer ${token}`, // Include the Bearer token
                  'Content-Type': 'application/json', // Set the content type
                }
              });
            setSuccessMessage(response.data || 'Order submitted successfully!');
            dispatch(emptyCart());

            // Reset the form to initial values after successful submission
            resetForm({ values: getInitialValues() });
            //   navigate("/cart");
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Formik initialValues={getInitialValues()} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ values }) => (
                <Form className="container mt-5 p-4 border rounded shadow-sm">
                    <h2 className="mb-4">Order Summary</h2>

                    {/* Loading Indicator */}
                    {loading && (
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    )}

                    {/* Success Message */}
                    {successMessage && (
                        <div className="alert alert-success" role="alert">
                            {successMessage}
                            <button className="btn btn-link" onClick={() => navigate('/userOrder')}>View Order</button>
                            <button className="btn btn-link" onClick={() => navigate('/')}>Continue Shopping</button>
                        </div>
                    )}

                    {/* Error Message */}
                    {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    )}

                    {/* Customer Details */}
                    <div className="mb-3">
                        <h4>Customer Details</h4>
                        <div className="row">
                            <div className="col-md-6">
                                <label>Name</label>
                                <Field className="form-control" name="customer.name" />
                                <ErrorMessage name="customer.name" component="div" className="text-danger" />
                            </div>
                            <div className="col-md-6">
                                <label>Email</label>
                                <Field className="form-control" name="customer.email" />
                                <ErrorMessage name="customer.email" component="div" className="text-danger" />
                            </div>
                            <div className="col-md-6 mt-3">
                                <label>Phone Number</label>
                                <Field className="form-control" name="customer.phno" />
                                <ErrorMessage name="customer.phno" component="div" className="text-danger" />
                            </div>
                        </div>
                    </div>

                    {/* Delivery Address */}
                    <div className="mb-3">
                        <h4>Delivery Address</h4>
                        <div className="row">
                            <div className="col-md-6">
                                <label>Street</label>
                                <Field className="form-control" name="address.street" />
                                <ErrorMessage name="address.street" component="div" className="text-danger" />
                            </div>
                            <div className="col-md-6">
                                <label>City</label>
                                <Field className="form-control" name="address.city" />
                                <ErrorMessage name="address.city" component="div" className="text-danger" />
                            </div>
                            <div className="col-md-4 mt-3">
                                <label>State</label>
                                <Field className="form-control" name="address.state" />
                                <ErrorMessage name="address.state" component="div" className="text-danger" />
                            </div>
                            <div className="col-md-4 mt-3">
                                <label>Zip Code</label>
                                <Field className="form-control" name="address.zipCode" />
                                <ErrorMessage name="address.zipCode" component="div" className="text-danger" />
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    {!successMessage && (
                        <div className="mb-3">
                            <h4>Order Items</h4>
                            {values.orderItems.map((item, index) => (
                                <div key={item.product_id || index} className="border rounded p-3 mb-3">
                                    <div className="d-flex align-items-center mb-2">
                                        <img src={item.imageUrl} alt={`Product ${item.product_id}`} className="img-thumbnail" style={{ width: '100px', marginRight: '10px' }} />
                                        <strong>{item.name}</strong>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <label>Unit Price</label>
                                            <Field
                                                className="form-control"
                                                name={`orderItems[${index}].unitPrice`}
                                                value={(item.unitPrice || 0).toFixed(2)}
                                                readOnly
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <label>Quantity</label>
                                            <Field className="form-control" name={`orderItems[${index}].quantity`} value={item.quantity} readOnly />
                                        </div>
                                        <div className="col-md-4">
                                            <label>Total</label>
                                            <Field className="form-control" value={(item.unitPrice * item.quantity).toFixed(2)} readOnly />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Order Summary */}
                    {!successMessage && (
                        <div className="mb-3">
                            <h4>Order Summary</h4>
                            <p><strong>Total Quantity:</strong> {values.totalQuantity}</p>
                            <p><strong>Total Price:</strong> ${values.totalPrice.toFixed(2)}</p>
                        </div>
                    )}


                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        Submit Order
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default OrderForm;
