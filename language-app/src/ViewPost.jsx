import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "./services/post_services";
import Post from "./components/post";
import "./ViewPost.css";

function ViewPost() {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getPost(id)
      .then((fetchedPost) => {
        setPost(fetchedPost);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
        setError("Failed to load post");
      });
  }, [id]);

  return (
    <div className="view-post-container">
      <a href="/" className="back-link">
        <button className="back-button">←</button>
      </a>

      {error && <div className="error-message">{error}</div>}

      {post && (
        <div className="post-container">
          <Post
            id={post.id}
            fileName={post.fileName}
            audioURL={post.audioURL}
            text={post.text}
            comments={post.comments} // Pass comments from the post
          />
        </div>
      )}
    </div>
  );
}

export default ViewPost;
