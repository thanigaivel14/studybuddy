import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const Profile = () => {
  const token = localStorage.getItem("token");
  const { user, login } = useAuth();
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    username: user.username,
    email: user.email,
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [starAnimation, setStarAnimation] = useState(false);

  const imguri = user.avatar
    ? `http://localhost:8000/api/uploads/${user.avatar}`
    : "/default-avatar.png";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/private/myposts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(res.data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchPosts();
  }, [token]);

  useEffect(() => {
    setStarAnimation(true);
    const timer = setTimeout(() => setStarAnimation(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const sparkleOffsets = [
    { x: -20, y: -20 },
    { x: 20, y: -20 },
    { x: -15, y: 10 },
    { x: 15, y: 10 },
  ];

  const sparkleVariants = {
    initial: { scale: 0, opacity: 0, x: 0, y: 0 },
    animate: (custom) => ({
      scale: 1,
      opacity: 1,
      x: custom.x,
      y: custom.y,
      transition: { duration: 0.4 },
    }),
    exit: { scale: 0, opacity: 0, transition: { duration: 0.3 } },
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put("/user/profile/update", editData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      login({ ...user, ...res.data.user });
      toast.success("Profile updated!");
      setIsEditing(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return toast.error("Select a file");

    const formData = new FormData();
    formData.append("avatar", selectedFile);

    try {
      await API.post("/user/profile/upload-avatar", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Avatar uploaded");
      window.location.reload();
    } catch (err) {
      toast.error("Failed to upload avatar");
    }
  };

  const handleDeleteAvatar = async () => {
    try {
      await API.delete("/profile/delete-avatar", {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Avatar deleted");
      window.location.reload();
    } catch (err) {
      toast.error("Failed to delete avatar");
    }
  };

return (
  <div className="h-[calc(100vh-128px)] overflow-hidden px-2 sm:px-4 pt-4 pb-4 bg-gradient-to-br from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d] text-black flex gap-4">
    {/* Left Section - My Posts */}
    <motion.div
      animate={{ flex: isEditing ? 1 : 2 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="overflow-y-auto p-4 bg-white rounded-2xl shadow-md"
    >
      <h3 className="text-xl font-semibold mb-4">My Posts</h3>
      {posts.length === 0 ? (
        <p className="text-gray-600">No posts yet.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li
              key={post._id}
              className="bg-white border border-gray-200 shadow p-4 rounded-xl"
            >
              <h4 className="font-bold text-lg">{post.title}</h4>
              <p className="text-xs text-gray-500">
                {new Date(post.createdAt).toLocaleString()}
              </p>
              <p className="mt-2 text-gray-800">
                {post.content.length > 100
                  ? post.content.slice(0, 100) + "..."
                  : post.content}
              </p>
            </li>
          ))}
        </ul>
      )}
    </motion.div>

    {/* Right Section - Profile Info */}
    <motion.div
      animate={{ flex: isEditing ? 1.5 : 0.7 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="h-full overflow-y-auto bg-white rounded-2xl shadow-md p-4 text-center"
    >
      <img
        src={imguri}
        alt="Avatar"
        className="w-24 h-24 rounded-full mx-auto mb-4 border border-gray-300"
      />
      {!isEditing ? (
        <>
          <div className="inline-flex items-center justify-center text-xl font-bold">
            {user?.username}
            <div className="relative ml-2 w-6 h-6 text-yellow-500">
              <AnimatePresence>
                {starAnimation && (
                  <>
                    <motion.span
                      key="pop-star"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1.5, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-0 left-0"
                    >
                      ★
                    </motion.span>
                    <motion.span
                      key="static-star"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-0 left-0"
                    >
                      ★
                    </motion.span>
                    {sparkleOffsets.map((offset, i) => (
                      <motion.span
                        key={`sparkle-${i}`}
                        custom={offset}
                        variants={sparkleVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="absolute text-yellow-400"
                        style={{ top: "0", left: "0", fontSize: "1rem" }}
                      >
                        ✨
                      </motion.span>
                    ))}
                  </>
                )}
                {!starAnimation && (
                  <span className="absolute top-0 left-0 scale-100">★</span>
                )}
              </AnimatePresence>
            </div>
          </div>
          <p className="text-gray-700 mb-4">{user?.email}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:underline text-sm mb-4"
          >
            Edit Profile
          </button>
        </>
      ) : (
        <form onSubmit={handleProfileUpdate} className="space-y-3 text-left">
          <input
            name="username"
            value={editData.username}
            onChange={handleEditChange}
            className="w-full p-2 border rounded"
            placeholder="Username"
          />
          <input
            name="email"
            value={editData.email}
            onChange={handleEditChange}
            className="w-full p-2 border rounded"
            placeholder="Email"
            type="email"
          />
          <div className="relative">
            <input
              name="password"
              value={editData.password}
              onChange={handleEditChange}
              type={showPassword ? "text" : "password"}
              placeholder="New password"
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-2 right-3 text-sm text-gray-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="flex justify-between gap-3">
            <button
              type="submit"
              className="bg-green-600 text-white w-full py-1 rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 text-white w-full py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="mt-4 space-y-2">
        <input type="file" onChange={handleFileChange} className="w-full" />
        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white w-full py-1 rounded"
        >
          {user.avatar ? "Update Avatar" : "Upload Avatar"}
        </button>
        <button
          onClick={handleDeleteAvatar}
          className="bg-red-500 text-white w-full py-1 rounded"
        >
          Remove Avatar
        </button>
      </div>
    </motion.div>
  </div>
);


};

export default Profile;
