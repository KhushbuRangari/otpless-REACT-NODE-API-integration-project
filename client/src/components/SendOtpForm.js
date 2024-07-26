// src/components/SendOtpForm.js
import React, { useState } from 'react';
import axios from 'axios';

const SendOtpForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [orderId, setOrderId] = useState('');

  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/send-otp', { phoneNumber });
      setOrderId(response.data.orderId); // Assuming orderId is returned from the backend
      setMessage('OTP sent successfully');
    } catch (error) {
      setMessage('Error sending OTP');
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/verify-otp', { phoneNumber, otp, orderId });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error verifying OTP');
    }
  };

  return (
    <div>
      <form onSubmit={sendOtp}>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number"
        />
        <button type="submit">Send OTP</button>
      </form>
      {orderId && (
        <form onSubmit={verifyOtp}>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
          />
          <button type="submit">Verify OTP</button>
        </form>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default SendOtpForm;
