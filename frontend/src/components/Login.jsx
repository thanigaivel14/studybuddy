import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setform] = useState({ email: "", password: "" });

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful");
      login(res.data.user);
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Login failed");
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden flex items-center justify-center px-4 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400">
      <div className="bg-white border border-gray-300 rounded-xl w-full max-w-md sm:max-w-lg p-6 sm:p-8 shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
          🔐 Login to Your Account
        </h2>
        <form onSubmit={handlesubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            onChange={handlechange}
            value={form.email}
            placeholder="Email"
            required
            className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-300 p-3 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={handlechange}
            value={form.password}
            placeholder="Password"
            required
            className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-300 p-3 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-sm text-blue-600 hover:underline"
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition font-semibold shadow"
          >
            🚀 Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-700">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-700 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
