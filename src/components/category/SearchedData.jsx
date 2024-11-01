import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem } from '../store/cartSlice';

function SearchedData() {
  const searchResults = useSelector((state) => state.search.results);
  const isLoading = useSelector((state) => state.search.isLoading);
  const error = useSelector((state) => state.search.error);
  const dispatch = useDispatch();
  const normalizeImagePath = (path) => path.replace(/\\/g, '/');

  return (
    <div className='container-fluid'>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {searchResults?.products?.length > 0 ? (
        <div className='row mt-4'>
          {searchResults.products.map((data) => (
            <div className='col-md-4 mb-4' key={data.product_id}>
              <div className="card" style={{ width: '18rem' }}>
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
                  <p className="card-text"><strong>Category:</strong> {data.categoryName}</p>
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
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default SearchedData;
