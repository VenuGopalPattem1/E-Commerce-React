import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeNavbar } from '../store/barSlice';
import { setSearchError, setSearchResults, startSearch } from '../store/searchSlice';
import { Link, useNavigate } from 'react-router-dom';
import { clearUser } from '../store/userSlice';
import API from '../../const/Api';


function Navbar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const val = useSelector((state)=>state.user)
    const [debounceTimeout, setDebounceTimeout] = useState(null);
    const token = localStorage.getItem("jwt")

    const calculateCartTotal = (cartItems) => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const cartItems = useSelector((state) => state.cart.items);
    const totalItems = cartItems.length;
    const cartAmount = calculateCartTotal(cartItems);

    const status = JSON.parse(localStorage.getItem("status"))

    const handleSearch = async (query) => {
        dispatch(startSearch());
        try {
            const response = await fetch(`${API}api/product/search/findByNameContaining?name=${query}`,{
                headers: {
                  'Authorization': `Bearer ${token}`, // Include the Bearer token
                  'Content-Type': 'application/json', // Set the content type
                }
              });
            const data = await response.json();
            dispatch(setSearchResults(data._embedded));
        } catch (error) {
            dispatch(setSearchError(error.message));
        }
    };

    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }
        
        const newTimeout = setTimeout(() => {
            navigate(`/search`);
            handleSearch(query);
        }, 300);
        
        setDebounceTimeout(newTimeout);
    };

    const handleLoginLogout = () => {
        // Remove user details from localStorage
        dispatch(clearUser())
        localStorage.removeItem('jwt'); // remove token if stored separately
        localStorage.removeItem('userDetails');
        localStorage.setItem("status",JSON.stringify({
            user:false
        }))
        // Redirect to login page
        navigate('/login')
        // setTimeout(()=>navigate('/login'),3000)
    };

    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-light fixed-top p-3'> {/* Add 'fixed-top' class */}
            <div className='container-fluid'>
                <img
                    src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg"
                    alt="logo"
                    style={{ height: '40px' }}
                    // onClick={() => { dispatch(changeNavbar()) }}
                />
                <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarNav'
                    aria-controls='navbarNav'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNav'>
                    <div className='d-flex mx-auto'>
                        <input
                            type='text'
                            placeholder='Search for Products'
                            className='form-control me-2'
                            style={{ borderRadius: '30px', maxWidth: '300px' }}
                            value={searchQuery}
                            onChange={handleInputChange}
                        />
                        <button
                            className='btn btn-primary'
                            type='button'
                            disabled
                        >
                            Search
                        </button>
                    </div>
                    <div className='d-flex align-items-center mx-2'>
                        {/* <button className='btn btn-primary' onClick={handleLoginLogout}> */}
                            {/* <Link className=' text-decoration-none text-white' to={"/login"}> */}
                            {status.user ? <button className=' btn btn-primary' onClick={handleLoginLogout}>Logout</button> 
                            : <button className=' btn btn-primary'>Login</button>}
                            {/* // }</Link> */}
                        {/* </button> */}
                    </div>
                    <div className='d-none d-lg-flex align-items-center me-3'>
                        <div className='bg-light text-dark border rounded-pill p-2 d-flex justify-content-between align-items-center bg-black text-white p-1 shadow-sm' style={{ minWidth: '180px' }}>
                            <span className='me-2'>Items: {totalItems}</span>
                            <div>|</div>
                            <span className='ms-2'>Total: ${cartAmount.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className='d-flex align-items-center position-relative mx-2'>
                        <Link to={'/cart'}><span className='bi bi-cart-fill icon' style={{ fontSize: '24px', color: '#007bff' }}></span></Link>
                        <span className='badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill'>
                            {totalItems}
                        </span>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
