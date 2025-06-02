import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./context/AuthContext";
import React, { useState } from "react";

import Addpost from "./components/Addpost";
import About from "./components/About";

const App = () => {
  const { user } = useAuth();
  const [showAddPost, setShowAddPost] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d] text-gray-900 relative overflow-x-hidden">
      <Router>
        {/* Fixed Navbar */}
        <div className="fixed top-0 left-0 w-full z-50 shadow-md bg-white">
          <Navbar />
        </div>

        <ToastContainer position="top-right" autoClose={2000} />

        {/* Page Content with padding below fixed navbar */}
        <main className="pt-24 pb-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
          <div className="bg-white border border-gray-300 shadow-lg rounded-2xl p-6 sm:p-8 transition-all">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />


            </Routes>
          </div>
        </main>

        {/* Footer with Add Post Button (if user logged in) */}
        {user && (
          <>
            <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 shadow-md py-3 px-4 z-50">
              <div className="max-w-4xl mx-auto flex justify-end">
                <button
                  onClick={() => setShowAddPost(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-xl shadow transition duration-200 w-full sm:w-auto"
                >
                  + Add Post
                </button>
              </div>
            </footer>

            {showAddPost && <Addpost closeModal={() => setShowAddPost(false)} />}
          </>
        )}
      </Router>
    </div>
  );
};

export default App;
