import axios from "axios";

// const url = process.env.NEXT_PUBLIC_API_BASE_URL;
const url = "https://ticket-management-api-kq8s.onrender.com/api/v1";

const customFetch = axios.create({
  baseURL: url,
});

export default customFetch;
