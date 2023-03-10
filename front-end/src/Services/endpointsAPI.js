import axios from 'axios';

const port = 3001;

const PORT = process.env.PORT || port;

const api = axios.create({
  baseURL: `http://localhost:${PORT}`,
});

const apiForAdm = (token) => axios.create({
  baseURL: `http://localhost:${PORT}`,
  headers: { authorization: token },
});

export const doLogin = async (email, password) => {
  const result = await api.post('/login', { email, password });
  return result.data;
};

export const createNewUser = async (name, email, password) => {
  const result = await api.post('/register', { name, email, password });
  return result.data;
};

export const getAllOrdersBySaleId = async (saleId) => {
  const result = await api.get(`/sale/${saleId}, { saleId }`);
  return result.data;
};

export const getAllOrdersBySellerId = async (sellerId) => {
  const result = await api.get(`/sale/seller/${sellerId}, { sellerId }`);
  return result.data;
};

export const getAllOrdersByUserId = async (userId) => {
  const result = await api.get(`/sale/user/${userId}, { userId }`);
  return result.data;
};

export const getAllSellers = async () => {
  const result = await api.get('/user/seller');
  return result.data;
};

export const getAllCustomers = async () => {
  const result = await api.get('/user/customer');
  return result.data;
};

export const createNewSale = async (obj, products, userData) => {
  const { totalPrice, deliveryAddress, deliveryNumber, sellerId } = obj;
  const result = await apiForAdm(userData.token).post('/sale', {
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    userId: userData.id,
    sellerId,
    products,
  });
  return result.data;
};

export const createNewUserByAdmin = async (obj) => {
  const { name, email, password, role, token } = obj;
  const result = await apiForAdm(token).post('/register/admin', {
    name,
    email,
    password,
    role,
  });
  return result.data;
};

export const changeSaleStatus = async (obj) => {
  const { id, status, token } = obj;
  const result = await apiForAdm(token).put(`/sale/status/${id}`, { status });
  return result.data;
};
