import { useState } from "react";
import "./CreatePost.css";
import Post from "./components/post.jsx";
import CompositionPage from "./components/CompositionPage.jsx";

function CreatePost() {
  const [posts, setPosts] = useState([]);
  const [language, setLanguage] = useState(""); // Store selected language
  const [fileInputKey, setFileInputKey] = useState(0); // Reset file input

  // Function to handle adding a post
  const addPost = (event) => {
    const file = event.target.files[0];
    if (
      language &&
      file &&
      (file.type === "audio/mpeg" || file.type === "audio/wav")
    ) {
      const audioURL = URL.createObjectURL(file);
      const newPost = {
        id: Date.now(), // Unique ID using timestamp
        fileName: file.name,
        audioURL: audioURL,
        text: language, // Use selected language as text
      };
      setPosts([...posts, newPost]);
      setLanguage(""); // Clear language dropdown
      setFileInputKey((prev) => prev + 1); // Reset file input by changing its key
    }
  };

  return (
    <div className="create-post-container">
      <div className="post-form">
        <a href="/">
            <button id="back-button">←</button>
        </a>
        {/* Dropdown for selecting language */}
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
            disabled={!language} // Disable when no language is selected
          />
          <span>Upload Audio</span> {/* Wrapped in span for styling */}
        </label>
      </div>
      <div className="posts">
        {posts.map((content) => (
          <Post
            key={content.id}
            audioURL={content.audioURL}
            text={content.text}
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
