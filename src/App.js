import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import Navbar from './components/Navbar/Navbar.jsx';
import SideBar from './components/sidebar/SideBar.jsx';
import Body from './components/body/Body.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductByCategory from './components/category/ProductsByCategory.jsx';
import SearchedData from './components/category/SearchedData.jsx';
import Cart from './components/cart/Cart.jsx';
import ProductDetail from './components/cart/ProductDetail.jsx';
import OrderForm from './components/order/OrderForm.jsx';
import UserOrder from './components/order/UserOrders.jsx';
import Login from './components/login/Login.jsx';
import Signup from './components/login/Signup.jsx';
import RecoverAccount from './components/login/Recover.jsx';
import ChangePassword from './components/login/ChangePassword.jsx';
import ProductCURD from './components/admin/ProductCURD.jsx';
import OrderDetails from './components/admin/OrderDetails.jsx';
import ProtectedRoute from './components/protectedRoutes/UserProtectedRoutes.js';
import AdminProtectedRoute from './components/protectedRoutes/AdminProtecedRoutes.js';
import ProductTable from './components/admin/ProductTable.jsx';
import Logout from './components/login/Logout.jsx';

function App() {
  const venu = useSelector((state) => state.navbar.venu);
  const user = useSelector((state) => state.user); // Access user state from Redux
  const [userRole, setUserRole] = useState(null);
  const isUserActive = useSelector((state) => state.user.active);
  const status = JSON.parse(localStorage.getItem("status"))

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (userDetails) {
      setUserRole(userDetails.role);
    }
    // console.log(userDetails);
    
  }, [status.user]);

  // console.log(userRole);

  useEffect(() => {
    // Function to handle storage changes
    const handleStorageChange = () => {
      window.location.reload(); // Reload the entire app
    };

    // Listen for storage events
    window.addEventListener('storage', handleStorageChange);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [status.user]);
  
  if(user.active){

  }


  return (
    <div className="container-fluid">
      <BrowserRouter>
        <Navbar />
        <div className="row flex-nowrap" style={{ marginTop: '70px' }}>
          {status.user ==true? (
            <div className="col-lg-2 col-md-3 d-none d-md-block sidebar bg-light">
              <SideBar userRole={userRole}/>
            </div>
          ):null}
          <div className={`main-content ${!isUserActive ? 'col-lg-12' : 'col-md-9 col-lg-10'}`}>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/recover" element={<RecoverAccount />} />
              <Route path="/changePass" element={<ChangePassword />} />
              <Route path="/logout" element={<Logout />} />


              {/* Protected Routes for logged-in users */}
              <Route path="/" element={<ProtectedRoute><Body /></ProtectedRoute>} />
              <Route path="prod/:id" element={<ProtectedRoute><ProductByCategory /></ProtectedRoute>} />
              <Route path="search" element={<ProtectedRoute><SearchedData /></ProtectedRoute>} />
              <Route path="cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
              <Route path="product/:pid" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
              <Route path="order" element={<ProtectedRoute><OrderForm /></ProtectedRoute>} />
              <Route path="userOrder" element={<ProtectedRoute><UserOrder /></ProtectedRoute>} />

              {/* Admin Protected Routes */}
              <Route path="/products" element={<AdminProtectedRoute><ProductCURD /></AdminProtectedRoute>} />
              <Route path="/orderDetails" element={<AdminProtectedRoute><OrderDetails /></AdminProtectedRoute>} />
              <Route path="/productList" element={<AdminProtectedRoute><ProductTable/></AdminProtectedRoute>} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
