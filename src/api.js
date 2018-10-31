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

const cdnApi = axios.create();

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

export const getCreditScore = async () => {
  try {
    const response = await api.get('/get_credit_score/');
    return response;
  } catch (err) {
    return err.response;
  }
}

export const getProducts = async () => {
  try {
    const response = await api.get('/get-product/');
    return response;
  } catch (err) {
    return err.response;
  }
}

export const getProductDetail = async productId => {
  try {
    const response = await api.post('/get-product-detail/', { productId });
    return response;
  } catch (err) {
    return err.response;
  }
}

export const getLoans = async (nonCompleteOnly = 0) => {
  try {
    const response = await api.post('/get-all-loans-by-user/', { nonCompleteOnly });
    return response;
  } catch (err) {
    return err.response;
  }
}

export const getLoanDetail = async loanId => {
  try {
    const response = await api.post('/get-loan-detail/', { loanId });
    return response;
  } catch (err) {
    return err.response;
  }
}

export const postLoan = async productId => {
  try {
    const response = await api.post('/request_loan/', { productId });
    return response;
  } catch (err) {
    return err.response;
  }
}

export const getDocuments = async () => {
  try {
    const response = await api.get('/get_doc/');
    return response;
  } catch (err) {
    return err.response;
  }
}

export const signDocument = async (fileName, fileType) => {
  try {
    const response = await api.post('/sign-s3/', { fileName, fileType });
    return response;
  } catch (err) {
    return err.response;
  }
}

export const uploadDocument = async (url, file, onUploadProgress) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const opts = {
      onUploadProgress,
      headers: {
        'Content-Type': file.type,
      },
    };

    const response = await api.put(url, formData, opts);

    return response;
  } catch (err) {
    return err.response;
  }
}

export const postDocument = async (type, url) => {
  try {
    const response = await api.get('/upload_doc/', { type, url });
    return response;
  } catch (err) {
    return err.response;
  }
}
