import axios from "axios"

const baseURL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:8000/api"

const api = axios.create({
    baseURL: baseURL.startsWith("http://") || baseURL.startsWith("https://") ? baseURL : `http://${baseURL}`,
    withCredentials: true,
})

export default api