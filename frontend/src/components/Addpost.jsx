import { useState } from "react";
import { toast } from "react-toastify";
import API from "../api/axios";

const Addpost = ({ closeModal }) => {
  const [form, setForm] = useState({ title: "", content: "" });
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/private/post", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Posted successfully!");
      closeModal();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 w-full max-w-md shadow-2xl sm:max-w-lg md:max-w-2xl text-white">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center text-blue-100 drop-shadow">
          ✨ Create a Post
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/30 text-white placeholder-white/70 p-3 rounded-lg text-sm sm:text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur"
            required
          />
          <textarea
            name="content"
            placeholder="What's on your mind?"
            value={form.content}
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/30 text-white placeholder-white/70 p-3 rounded-lg h-32 text-sm sm:text-base md:text-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur"
            required
          />
          <div className="flex flex-col sm:flex-row justify-end sm:space-x-4 space-y-3 sm:space-y-0 pt-2">
            <button
              type="button"
              onClick={closeModal}
              className="w-full sm:w-auto px-5 py-2 border border-white/40 text-white rounded-lg hover:bg-white/20 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition"
            >
              Post ✨
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addpost;
