import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
// import './SideNavbar.css'
const SideNavbar = () => {
  const [error, setError] = useState('');
  const [data, setData] = useState([]);
  // const user = useSelector((state) => state.user);


  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  // console.log(userDetails.user);
  const user = userDetails
  



  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:6060/api/productcategory');
      setData(response.data._embedded.productCategories);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (user.email && user.role === 'user') {
      fetchData();
    }
  }, []);

  return (
    <div className="d-flex flex-column bg-light p-3 vh-100" style={{ width: '220px' }}>
      {user.role === 'admin' ? (
        <div>
          <Link className="d-block text-center text-decoration-none text-primary fw-bold py-2 my-2 rounded" to="/productList">
            Product List
          </Link>
          <Link className="d-block text-center text-decoration-none text-primary fw-bold py-2 my-2 rounded" to="/products">
           Add Product 
          </Link>
          <Link className="d-block text-center text-decoration-none text-primary fw-bold py-2 my-2 rounded" to="/orderDetails">
            Order Management
          </Link>
        </div>
      ) : (
        <div>
          {data.length > 0 ? (
            data.map((info) => (
              <div key={info.categoryId} className="text-center my-2">
                <Link
                  className="d-block text-dark fw-bold py-2 rounded text-decoration-none"
                  to={`/prod/${info.categoryId}`}
                >
                  {info.categoryName.toUpperCase()}
                </Link>
              </div>
              
            ))
            
          ) : (
            <p className="text-muted text-center">No categories available</p>
          )}
                <Link to={'/userOrder'} className="d-block text-dark fw-bold py-2 text-center rounded text-decoration-none">Order Details</Link>

        </div>
      )}
    </div>
  );
};

export default SideNavbar;
