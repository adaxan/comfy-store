import axios from "axios";

const http = axios.create({
    baseURL: "https://strapi-store-server.onrender.com/api/"
})

export default http;