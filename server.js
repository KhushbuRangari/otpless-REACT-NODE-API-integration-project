// server.js
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/send-otp', async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    const response = await axios.post('https://auth.otpless.app/auth/otp/v1/send', {
      phoneNumber: phoneNumber,
      otpLength: 6,
      channel: 'SMS',
      expiry: 60,
    }, {
      headers: {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        'Content-Type': 'application/json',
      },
    });
console.log(response.data.orderId);
    res.json({ message: 'OTP sent successfully', orderId: response.data.orderId });
  } catch (error) {
    res.status(500).json({ message: 'Error sending OTP', error: error.message });
  }
});

app.post('/verify-otp', async (req, res) => {
  const { phoneNumber, otp, orderId } = req.body;

  try {
    const response = await axios.post('https://auth.otpless.app/auth/otp/v1/verify', {
      phoneNumber: phoneNumber,
      otp: otp,
      orderId: orderId,
    }, {
      headers: {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        'Content-Type': 'application/json',
      },
    });

    res.json({ message: 'OTP verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying OTP', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
