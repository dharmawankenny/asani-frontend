import axios from 'axios';

// TODO change PREFIX_API_URL to development server
let PREFIX_API_URL = 'https://asani-backend-app.herokuapp.com';
// let PREFIX_API_URL = 'http://localhost:8080';

if (process.env.NODE_ENV === 'production') {
  PREFIX_API_URL = 'https://asani-backend-app.herokuapp.com';
}

export const api = axios.create({
  baseURL: PREFIX_API_URL,
});

export const postSendOTP = async (telNumber) => {
  try {
    const response = await api.post('/send_otp/', { phone_number: telNumber });
    return response;
  } catch (err) {
    return err.response;
  }
};

export const postCheckOTPLogin = async (telNumber, otpCode) => {
  try {
    const response = await api.post('/check_otp_login/', { phone_number: telNumber, otp: otpCode });
    return response;
  } catch (err) {
    return err.response;
  }
};
