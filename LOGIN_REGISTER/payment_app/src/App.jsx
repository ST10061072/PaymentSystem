import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Register from './Register'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './Login'
import PaymentProcess from './components/PaymentProcess';
import CustomerDashboard from './components/CustomerDashboard';

function App() {

  return (

    <Router>
      <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path="/payment-process" element={<PaymentProcess />} />
          <Route path='/customerDashboard' element={<CustomerDashboard />}></Route>
      </Routes>
    </Router>
  )
}

export default App
