import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import API from '../../const/Api';

// Sample orders data, replace it with the fetched data
// const ordersData = [
//     {
//         orderTrackingId: "4e6dd446a841408",
//         totalQuantity: 4,
//         totalPrice: 63800,
//         status: "packing",
//         deliveryDate: "2024-11-02",
//         customer: null,
//         address: {
//             id: 1,
//             street: "Sangam",
//             city: "Atmakur(nl)",
//             state: "Andhra Pradesh",
//             zipCode: "524308"
//         },
//         orderItems: [
//             {
//                 id: 3,
//                 imageUrl: "assets/Men's Slim Fit Jeans.jpeg",
//                 unitPrice: 500,
//                 quantity: 1,
//                 productId: 16
//             },
//             {
//                 id: 1,
//                 imageUrl: "assets/Men's Casual Shirt.jpeg",
//                 unitPrice: 2400,
//                 quantity: 1,
//                 productId: 13
//             },
//             {
//                 id: 2,
//                 imageUrl: "assets/Seiko Automatic Diver.jpeg",
//                 unitPrice: 60000,
//                 quantity: 1,
//                 productId: 21
//             },
//             {
//                 id: 4,
//                 imageUrl: "assets/Rolex Submariner.jpeg",
//                 unitPrice: 900,
//                 quantity: 1,
//                 productId: 18
//             }
//         ]
//     },
//     {
//         orderTrackingId: "567af91e5b0f468",
//         totalQuantity: 3,
//         totalPrice: 166000,
//         status: "packing",
//         deliveryDate: "2024-11-02",
//         customer: null,
//         address: {
//             id: 2,
//             street: "Sangam",
//             city: "Atmakur(nl)",
//             state: "Andhra Pradesh",
//             zipCode: "524308"
//         },
//         orderItems: [
//             {
//                 id: 7,
//                 imageUrl: "assets/dell.jpg",
//                 unitPrice: 48000,
//                 quantity: 1,
//                 productId: 5
//             },
//             {
//                 id: 6,
//                 imageUrl: "assets/hp-laptop.jpeg",
//                 unitPrice: 40000,
//                 quantity: 1,
//                 productId: 4
//             },
//             {
//                 id: 5,
//                 imageUrl: "assets/apple.jpg",
//                 unitPrice: 78000,
//                 quantity: 1,
//                 productId: 6
//             }
//         ]
//     }
// ];


const UserOrder = () => {
    const [expandedOrderIndex, setExpandedOrderIndex] = useState(null);
    const [expandedAddressIndex, setExpandedAddressIndex] = useState(null);
    const [expandedItemsIndex, setExpandedItemsIndex] = useState(null);
    const [ordersData ,setOrderData] = useState([]);
    const userDetails = JSON.parse(localStorage.getItem("userDetails"))
    const email = userDetails.email
    const token = localStorage.getItem("jwt") 

    const toggleOrderDetails = (index) => {
        setExpandedOrderIndex(expandedOrderIndex === index ? null : index);
    };

    const toggleAddressDetails = (index) => {
        setExpandedAddressIndex(expandedAddressIndex === index ? null : index);
    };

    const toggleItemsDetails = (index) => {
        setExpandedItemsIndex(expandedItemsIndex === index ? null : index);
    };

    const fetchData = async() =>{
        try {
            const response = await axios.get(`${API}order/find/${email}`,{
                headers: {
                  'Authorization': `Bearer ${token}`, // Include the Bearer token
                  'Content-Type': 'application/json', // Set the content type
                }}
            );
            setOrderData(response.data);
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        fetchData();
    },[])

    return (
        <div className="container mt-4">
            <h2>User Orders</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Order Tracking ID</th>
                        <th>Total Quantity</th>
                        <th>Total Price</th>
                        <th>Status</th>
                        <th>Delivery Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {ordersData.map((order, index) => (
                        <React.Fragment key={order.orderTrackingId}>
                            <tr>
                                <td>{order.orderTrackingId}</td>
                                <td>{order.totalQuantity}</td>
                                <td>${order.totalPrice.toFixed(2)}</td>
                                <td>{order.status}</td>
                                <td>{order.deliveryDate}</td>
                                <td>
                                    <a
                                        href="#"
                                        className="link-primary me-2"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            toggleAddressDetails(index);
                                        }}
                                    >
                                        {expandedAddressIndex === index ? 'Hide Address' : 'Show Address'}
                                    </a>
                                    <a
                                        href="#"
                                        className="link-primary"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            toggleItemsDetails(index);
                                        }}
                                    >
                                        {expandedItemsIndex === index ? 'Hide Order Items' : 'Show Order Items'}
                                    </a>
                                </td>
                            </tr>
                            {expandedAddressIndex === index && (
                                <tr>
                                    <td colSpan="6">
                                        <div className="border rounded p-2 mt-2">
                                            <h5>Address Details:</h5>
                                            <p>{order.address.street}, {order.address.city}, {order.address.state} - {order.address.zipCode}</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            {expandedItemsIndex === index && (
                                <tr>
                                    <td colSpan="6">
                                        <div className="border rounded p-2 mt-2">
                                            <h5>Order Items:</h5>
                                            {order.orderItems.map(item => (
                                                <div key={item.id} className="d-flex align-items-center mb-2">
                                                    <img src={item.imageUrl} alt={`Product ${item.productId}`} className="img-thumbnail" style={{ width: '100px', marginRight: '10px' }} />
                                                    <div>
                                                        <strong>Product ID: {item.productId}</strong>
                                                        <p>Unit Price: ${item.unitPrice.toFixed(2)} | Quantity: {item.quantity}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserOrder;
