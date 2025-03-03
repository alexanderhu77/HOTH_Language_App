import { useState, useEffect } from "react";
import { getAllPosts } from "./services/post_services";
import "./Home.css";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts()
      .then((initialPosts) => {
        setPosts(initialPosts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div className="App">
      <h1>monkeyspeak</h1>

      <div className="posts-grid">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h3>{post.fileName}</h3>
            <p>{post.language}</p>
          </div>
        ))}
      </div>

      <a href="/create-post">
        <button id="add-post-button">+</button>
      </a>
    </div>
  );
}

export default Home;
