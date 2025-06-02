import { useContext, useEffect, useState } from "react";
import API from "../api/axios";
import Postcard from "../components/Postcard";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const {user} =useAuth();

  const fetchPosts = async () => {
    try {
      const res = await API.get("/private/getallpost");
      setPosts(res.data);
    } catch (error) {
      toast.error(error.message || "Failed to fetch posts");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (token) {
          const userRes = await API.get("/user/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCurrentUserId(userRes.data._id);
        }
      } catch (error) {
        toast.error("Failed to load user data");
      }
      await fetchPosts();
      setLoading(false);
    };

    fetchData();
  }, [token,user]);

  const handleLikeToggle = async (postId) => {
    try {
      const res = await API.put(
        `/private/like/${postId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const updatedPost = res.data;
      setPosts((prev) =>
        prev.map((post) => (post._id === postId ? updatedPost : post))
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to like/unlike");
    }
  };

  return (
    <div className="pt-20 pb-24 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-64px-64px)] bg-gradient-to-br from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d] text-white">
      <div className="max-w-4xl mx-auto w-full space-y-6">
        {loading ? (
          <p className="text-center text-white/90 text-lg">Loading posts...</p>
        ) : posts.length > 0 ? (
          posts.map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
            >
              <Postcard
                post={post}
                currentUserId={currentUserId}
                onLikeToggle={handleLikeToggle}
              />
            </motion.div>
          ))
        ) : (
          <h1 className="text-center text-white/90 text-lg">No posts available</h1>
        )}
      </div>
    </div>
  );
};

export default Home;
