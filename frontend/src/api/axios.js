import axios from "axios";
const dev="http://localhost:8000/api"
const live="https://studybuddy-idnp.onrender.com/api" 
const API =axios.create({
   baseURL:  live,
    withCredentials:true,
})
export default API;