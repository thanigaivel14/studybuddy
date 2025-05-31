import axios from "axios";
const API =axios.create({
   baseURL: "https://studybuddy-idnp.onrender.com/api",
    withCredentials:true,
})
export default API;
