import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const fetchUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/users`);
  return response.data;
};

export const fetchPayments = async () => {
  const response = await axios.get(`${API_BASE_URL}/payments`);
  return response.data;
};