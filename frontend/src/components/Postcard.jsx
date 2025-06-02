import { useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import logo from '../assests/logo.png';

const PostCard = ({ post, currentUserId }) => {
  const [commentText, setCommentText] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [likes, setLikes] = useState(post.likes || []);
  const [comments, setComments] = useState(post.comments || []);
  const [likeAnimation, setLikeAnimation] = useState(false);

  const token = localStorage.getItem("token");
  const likeuser = localStorage.getItem("user");
  const hasLiked = likes.some((id) => id?.toString() === currentUserId);
  

  const handleLike = async () => {
    if (!token) return;
    try {
      setLikeAnimation(true);
      await API.put(
        `/private/like/${post._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      hasLiked
        ? setLikes(likes.filter((id) => id !== currentUserId))
        : setLikes([...likes, currentUserId]);
    } catch {
      toast.error("Failed to toggle like");
    }
    setTimeout(() => setLikeAnimation(false), 600);
  };

  const sparkleVariants = {
    initial: { scale: 0, opacity: 0, x: 0, y: 0 },
    animate: (custom) => ({
      scale: 1,
      opacity: 1,
      x: custom.x,
      y: custom.y,
      transition: { duration: 0.4 },
    }),
    exit: { scale: 0, opacity: 0, transition: { duration: 0.2 } },
  };

  const sparkleOffsets = [
    { x: -20, y: -20 },
    { x: 20, y: -20 },
    { x: -15, y: 10 },
    { x: 15, y: 10 },
  ];

  const handleComment = async () => {
    if (!commentText.trim()) return;
    try {
      const res = await API.post(
        `/private/comment/${post._id}`,
        { text: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments([...comments, res.data.comment]);
      setCommentText("");
      toast.success("Comment posted");
    } catch {
      toast.error("Failed to post comment");
    }
  };

  return (
    <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-2xl p-5 sm:p-6 mb-6 sm:mb-10 w-full transition hover:shadow-blue-200">
      {/* Author Info */}
      <div className="flex items-center gap-4 mb-4">
        {post.author?.avatar && (
          <img
            src={post.author?.avatar || logo}
            alt="avatar"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-white shadow"
          />
        )}
        <p className="text-white font-semibold text-sm sm:text-base drop-shadow">
          {post.author?.username || "Unknown"}
        </p>
      </div>

      {/* Title & Content */}
      <h2 className="text-lg sm:text-xl font-bold text-white drop-shadow mb-1">
        {post.title}
      </h2>
      <p className="text-sm sm:text-base text-blue-50">{post.content}</p>

      {/* Like Button */}
      <div className="relative inline-block mr-4 mt-5">
        {likeuser != null && (
          <button
            onClick={handleLike}
            className="text-2xl sm:text-3xl focus:outline-none"
            disabled={!token}
            title={!token ? "Login to like posts" : ""}
          >
            {hasLiked ? (
              <span className="text-yellow-400">★</span>
            ) : (
              <span className="text-gray-400">☆</span>
            )}{" "}
            <span className="text-sm sm:text-base text-white">
              {likes.length}
            </span>
          </button>
        )}

        {/* Star Pop */}
        <AnimatePresence>
          {likeAnimation && hasLiked && (
            <motion.div
              key="like-star"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute -top-6 left-2 text-yellow-400 text-3xl pointer-events-none"
            >
              ★
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sparkle Animations */}
        <AnimatePresence>
          {likeAnimation &&
            hasLiked &&
            sparkleOffsets.map((offset, index) => (
              <motion.div
                key={`sparkle-${index}`}
                custom={offset}
                variants={sparkleVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute text-yellow-300 text-xl pointer-events-none"
              >
                ✨
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* Toggle Comments */}
      {likeuser !== null && (
        <button
          onClick={() => setShowCommentBox(!showCommentBox)}
          className="text-blue-100 font-medium mt-4 text-sm sm:text-base hover:underline"
        >
          💬 {comments.length} Comments
        </button>
      )}

      {/* Comment Section */}
      {showCommentBox && (
        <div className="mt-4">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="bg-white/60 text-black border border-gray-300 p-2 w-full rounded mb-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Write a comment..."
          />
          <button
            onClick={handleComment}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded text-sm sm:text-base transition"
          >
            Post Comment
          </button>

          <div className="mt-4 space-y-3 max-h-56 overflow-y-auto">
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="bg-white/30 backdrop-blur-sm border border-white/30 rounded p-3 text-white shadow"
              >
                <p className="text-xs sm:text-sm font-semibold">
                  {comment.user?.username || "User"}:
                </p>
                <p className="text-sm sm:text-base">{comment.text}</p>
                <p className="text-xs text-blue-100">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
