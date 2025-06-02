import React from "react";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-800 dark:text-balck-200">
      <h1 className="text-3xl font-bold mb-6 text-center text-black" >About StudyBuddy</h1>

      <section className="mb-8" >
        <h2 className="text-xl font-semibold mb-2 text-black">📌 Project Overview</h2>
        <p>
          <strong >StudyBuddy</strong> is a social learning platform designed for students and self-learners to
          connect, share knowledge, and collaborate effectively. Whether it’s posting study notes or asking questions,
          users can interact in a clean, responsive, and modern interface.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">✨ Key Features</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>User authentication (Register/Login)</li>
          <li>Create, update, and delete posts</li>
          <li>Like and comment on posts</li>
          <li>Profile with avatar upload/remove</li>
          <li>View and manage personal posts</li>
          <li>Dark/light theme toggle</li>
          <li>Responsive and mobile-friendly UI</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl text-black font-semibold mb-2">🛠 Tech Stack</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Frontend:</strong> React, Tailwind CSS, Toastify</li>
          <li><strong>Backend:</strong> Node.js, Express.js</li>
          <li><strong>Database:</strong> MongoDB</li>
          <li><strong>Authentication:</strong> JWT</li>
          <li><strong>File Upload:</strong> Multer</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">🎯 Why StudyBuddy?</h2>
        <p>
          With the rise of online and remote learning, students need a space to exchange ideas and
          help one another. StudyBuddy aims to create a collaborative and motivational environment to enhance self-paced learning.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">🚀 Future Enhancements</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Real-time chat or group discussions</li>
          <li>Tag or topic-based post filtering</li>
          <li>Search functionality</li>
          <li>Bookmark or save posts</li>
          <li>Admin dashboard for moderation</li>
        </ul>
      </section>
    </div>
  );
};

export default About;