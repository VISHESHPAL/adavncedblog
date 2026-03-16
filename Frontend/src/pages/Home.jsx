import React, { useEffect, useState } from "react";
import API from "../api/axios";

const Home = () => {
  const [posts, setPostes] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await API.get("/posts");
      //  console.log(res.data.posts)
      setPostes(res.data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map((post) => (
        <div key={post._id}>
          <h1>{post.title}</h1>
          <p>{post.content.slice(0, 100)}..</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
