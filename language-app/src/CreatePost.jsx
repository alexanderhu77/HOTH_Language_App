import { useState, useEffect } from "react";
import "./CreatePost.css";
import Post from "./components/post.jsx";
import CompositionPage from "./components/CompositionPage.jsx";
import { createPost, getAllPosts } from "./services/post_services";
import "./Home.css";

function CreatePost() {
  const [posts, setPosts] = useState([]);
  const [language, setLanguage] = useState("");
  const [fileInputKey, setFileInputKey] = useState(0);
  const [error, setError] = useState(null);

  // Fetch posts on component mount
  useEffect(() => {
    getAllPosts()
      .then((initialPosts) => {
        setPosts(initialPosts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setError("Failed to load posts");
      });
  }, []);

  const addPost = async (event) => {
    const file = event.target.files[0];
    if (
      language &&
      file &&
      (file.type === "audio/mpeg" || file.type === "audio/wav")
    ) {
      try {
        const audioURL = URL.createObjectURL(file);
        const newPost = {
          fileName: file.name,
          audioURL: audioURL,
          text: language,
          language: language,
        };

        const savedPost = await createPost(newPost);
        setPosts((prevPosts) => [...prevPosts, savedPost]);
        setLanguage(""); // Clear language dropdown
        setFileInputKey((prev) => prev + 1); // Reset file input
      } catch (error) {
        console.error("Error creating post:", error);
        setError("Failed to create post");
      }
    }
  };

  return (
    <div className="create-post-container">
      {error && <div className="error-message">{error}</div>}
      <div className="post-form">
        <a href="/">
          <button id="back-button">←</button>
        </a>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="">Select a language</option>
          <option value="English">English</option>
          <option value="French">French</option>
          <option value="Pidgin">Pidgin</option>
        </select>

        <label className="custom-file-upload">
          <input
            key={fileInputKey}
            type="file"
            accept="audio/mpeg,audio/wav"
            onChange={addPost}
            disabled={!language}
          />
          <span>Upload Audio</span>
        </label>
      </div>

      <div className="posts">
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            fileName={post.fileName}
            audioURL={post.audioURL}
            text={post.text}
            comments={post.comments}
          />
        ))}
      </div>

      <div className="composition-container">
        <div className="composition">
          <CompositionPage language={language} />
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
