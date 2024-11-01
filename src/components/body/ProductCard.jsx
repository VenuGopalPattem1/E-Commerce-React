import React from 'react'
import './ProductCard.css'
import { useDispatch } from 'react-redux';
import { addCartItem } from '../store/cartSlice';
import { Link } from 'react-router-dom';

function ProductCard({ data }) {
  // Helper function to normalize image paths
  const normalizeImagePath = (path) => path.replace(/\\/g, '/');
  const dispatch = useDispatch();

  return (
    <div className=' container-fluid'>
      <div className="container mt-5 ">
        <div className="card" style={{ width: '18rem' }}>
          {/* Normalize the image URL */}
          <img
            src={`/${normalizeImagePath(data.imageUrl)}`}
            className="card-img-top"
            alt={data.name}
            style={{ height: '200px', objectFit: 'cover' }}
          />
          <div className="card-body">
            <h5 className="card-title">{data.title}</h5>
            <p className="card-text">{data.description}</p>
            <p className="card-text"><strong>Price:</strong> ${data.unitsPrice}</p>
            <p className="card-text"><strong>Stock:</strong> {data.unitsStock} units</p>
            {/* <p className="card-text"><strong>Category:</strong> {data.categoryName}</p> */}
            <button
              className="btn btn-primary"
              onClick={() => dispatch(addCartItem({
                product_id: data.product_id,
                name: data.name,
                title: data.title,
                description: data.description,
                price: data.unitsPrice,
                imageUrl: data.imageUrl,
                quantity: 1 // Set the initial quantity to 1 when adding to cart
              }))}
            >
              Add to Cart
            </button>
            <Link to={`/product/${data.product_id}`} className="btn btn-success ms-1">
          View Details
        </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard