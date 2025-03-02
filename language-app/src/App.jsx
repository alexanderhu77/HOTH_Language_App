import { useState } from "react";
import "./App.css";
import Post from "./components/post.jsx";
import CompositionPage from "./components/CompositionPage.jsx";

function App() {
  const [posts, setPosts] = useState([]);
  const [textInput, setTextInput] = useState("");

  const addPost = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "audio/mpeg" || file.type === "audio/wav")) {
      const audioURL = URL.createObjectURL(file);
      const newPost = {
        id: posts.length,
        fileName: file.name,
        audioURL: audioURL,
        text: textInput || `This is the content of post ${posts.length + 1}`,
      };
      setPosts([...posts, newPost]);
      setTextInput(""); // Clear the text input after adding
    }
  };

  return (
    <div className="App">
      <h1>Recordings</h1>
      <div className="post-form">
        <input
          type="text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="What language is this in?"
        />
        <label className="custom-file-upload">
          <input type="file" accept="audio/mpeg,audio/wav" onChange={addPost} />
          Add Post
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

      <CompositionPage />
    </div>
  );
}

export default App;
