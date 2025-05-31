import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios.js";
import { toast } from "react-toastify";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.email || !form.password) {
      return toast.error("Please fill in all fields");
    }

    setLoading(true);
    try {
      await API.post("/auth/register", form);
      toast.success("Registered successfully");
      navigate("/login");
    } catch (err) {
      toast.error(
        err.response?.data?.message || err.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden flex justify-center items-center px-4 bg-gradient-to-br from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d]">
      <div className="w-full max-w-md bg-white border border-gray-300 shadow-lg rounded-2xl p-6 sm:p-8 text-gray-800">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white border border-gray-300 placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white border border-gray-300 placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white border border-gray-300 placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-bold rounded-lg shadow-md transition-all ${
              loading
                ? "bg-yellow-400/60 text-white cursor-not-allowed"
                : "bg-yellow-400 hover:bg-yellow-300 text-black"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-600 hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
