import { useState, useEffect } from "react";
import { getAllPosts } from "./services/post_services";
import { Link } from "react-router-dom";
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
          <Link to={`/post/${post.id}`} key={post.id} className="post-link">
            <div className="post-card">
              <h3>{post.fileName}</h3>
              <p>{post.language}</p>
            </div>
          </Link>
        ))}
      </div>

      <Link to="/create-post">
        <button id="add-post-button">+</button>
      </Link>
    </div>
  );
}

export default Home;
