import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BlogDetail = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`https://mern-blog-app-d4h9.onrender.com/api/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!blog) return <p>Blog not found.</p>;

  return (
    <div className="card">
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>
      <p>By: {blog.author.username}</p>
      <p>Created: {new Date(blog.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default BlogDetail;
