import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addCartItem } from '../store/cartSlice';
import API from '../../const/Api';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const param = useParams();
  const dispatch = useDispatch();
  const token = localStorage.getItem("jwt")

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${API}api/product/${param.pid}`,{
          headers: {
            'Authorization': `Bearer ${token}`, // Include the Bearer token
            'Content-Type': 'application/json', // Set the content type
          }
        });
        setProduct(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [param.pid]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const normalizeImagePath = (path) => path.replace(/\\/g, '/');

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center" style={{ minHeight: '70vh' }}>
      {product && (
        <div className="row" style={{ width: '100%', maxWidth: '800px' }}>
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <img
              src={`/${normalizeImagePath(product.imageUrl)}`}
              className="card-img-top"
              alt={product.name}
              style={{ height: '200px', objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <h4>Price: ${product.unitsPrice ? product.unitsPrice.toFixed(2) : 'N/A'}</h4>
            <button
              className="btn btn-primary"
              onClick={() => dispatch(addCartItem({
                product_id: product.product_id,
                name: product.name,
                title: product.title,
                description: product.description,
                price: product.unitsPrice,
                imageUrl: product.imageUrl,
                quantity: 1 // Set the initial quantity to 1 when adding to cart
              }))}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
