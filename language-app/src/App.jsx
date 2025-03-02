import { useState } from "react";
import "./App.css";
import Post from "./components/post.jsx";
import CompositionPage from "./components/CompositionPage.jsx";

function App() {
  const [posts, setPosts] = useState([]);
  const [language, setLanguage] = useState(""); // Store selected language
  const [fileInputKey, setFileInputKey] = useState(0); // Reset file input

  // Function to handle adding a post
  const addPost = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "audio/mpeg" || file.type === "audio/wav")) {
      const audioURL = URL.createObjectURL(file);
      const newPost = {
        id: Date.now(), // Unique ID using timestamp
        fileName: file.name,
        audioURL: audioURL,
        text: language || `This is the content of post ${posts.length + 1}`, // Default text
      };
      setPosts([...posts, newPost]);
      setLanguage(""); // Clear language dropdown
      setFileInputKey((prev) => prev + 1); // Reset file input by changing its key
    }
  };

  return (
    <div className="App">
      <h1>monkeyspeak</h1>
      <div className="post-form">
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
          />
          Upload Audio
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

      <CompositionPage language={language} />
    </div>
  );
}

export default App;
