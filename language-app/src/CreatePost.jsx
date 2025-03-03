import { useState } from "react";
import "./CreatePost.css";
import { createPost } from "./services/post_services";
import CompositionPage from "./components/CompositionPage.jsx";
import "./Home.css";
import Post from "./components/post.jsx";

function CreatePost() {
  const [language, setLanguage] = useState("");
  const [fileInputKey, setFileInputKey] = useState(0);
  const [error, setError] = useState(null);
  const [currentPost, setCurrentPost] = useState(null);

  const addPost = async (event) => {
    const file = event.target.files[0];
    if (
      language &&
      file &&
      (file.type === "audio/mpeg" || file.type === "audio/wav")
    ) {
      try {
        const formData = new FormData();
        formData.append("audio", file);
        formData.append("language", language);
        formData.append("text", language);

        const savedPost = await createPost(formData);
        setCurrentPost(savedPost);
        setLanguage("");
        setFileInputKey((prev) => prev + 1);
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

      <div className="composition-container">
        <div className="composition">
          <CompositionPage language={language} />
        </div>
      </div>

      {currentPost && (
        <div className="current-post">
          <Post
            id={currentPost.id}
            fileName={currentPost.fileName}
            audioURL={currentPost.audioURL}
            text={currentPost.text}
          />
        </div>
      )}
    </div>
  );
}

export default CreatePost;
