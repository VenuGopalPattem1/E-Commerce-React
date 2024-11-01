import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductCard from '../body/ProductCard';

const ProductByCategory = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const navbarOpen = useSelector((state) => state.navbar.venu);
  const param = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:6060/api/product/search/findByCategory_CategoryId?id=${param.id}`);
      const array = response.data;
      setProducts(array._embedded.products);
      // console.log(array._embedded.products); // Check the API response
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [param]);

  if (error) return <div>Error: {error}</div>;
  if (products.length === 0) return <div>No product data available</div>;

  return (
    <div className='container-fluid d-flex flex-wrap justify-content-center'>
      {products.map(info => (
        <div key={info.product_id} className={`p-2 ${navbarOpen ? "col-md-4 col-lg-3" : "col-md-3 col-lg-2 mx-5"}`}>
          <ProductCard data={info} />
        </div>
      ))}
    </div>
  );
};

export default ProductByCategory;
