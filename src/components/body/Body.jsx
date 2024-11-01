import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { useSelector } from 'react-redux';
import API from '../../const/Api';

const Body = () => {
  const [products, setProducts] = useState([]); // State to hold the product data
  const [error, setError] = useState(null); // State to manage error state
  const [loading, setLoading] = useState(true); // Loading state
  const navbarOpen = useSelector((state) => state.navbar.venu);
  const token = localStorage.getItem("jwt");

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API}api/product`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include the Bearer token
          'Content-Type': 'application/json', // Set the content type
        }
      });
      const array = response.data;
      setProducts(array._embedded.products); // Set the products state
    } catch (err) {
      setError(`${err.response?.status}: ${err.response?.data?.message || err.message}`); // Handle errors
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    fetchData(); // Fetch product data on component mount
  }, []);

  // Render loading state if data is still being fetched
  if (loading) return <div>Loading...</div>;

  // Render error message if there's an error
  if (error) return <div>Error: {error}</div>;

  // Check if product data exists
  if (products.length === 0) return <div>No product data available</div>;

  return (
    <div className='container-fluid d-flex flex-wrap justify-content-center'>
      {products.map(info => (
        <div
          key={info.product_id}
          className={`p-2 ${navbarOpen ? "col-md-4 col-lg-3" : "col-md-3 col-lg-2 mx-5"}`} // Adjust columns based on navbar state
        >
          <ProductCard data={info} />
        </div>
      ))}
    </div>
  );
};

export default Body;
