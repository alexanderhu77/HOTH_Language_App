import { useState } from 'react';
import './App.css';
import Post from './components/post.jsx';

function App() {
  const [posts, setPosts] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [fileInputKey, setFileInputKey] = useState(0); // Add a key to reset file input

  const addPost = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "audio/mpeg" || file.type === "audio/wav")) {
      const audioURL = URL.createObjectURL(file);
      const newPost = {
        id: Date.now(), // Use timestamp for a unique ID
        fileName: file.name,
        audioURL: audioURL,
        text: textInput || `This is the content of post ${posts.length + 1}`
      };
      setPosts([...posts, newPost]);
      setTextInput(''); // Clear text input
      setFileInputKey(prev => prev + 1); // Reset file input by changing its key
    }
  };

  return (
    <div className="App"> 
      <h1>monkeyspeak</h1>
      <div className="post-form">
        <input
          type="text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="What language is this in?"
        />
        <label className="custom-file-upload">
          <input
            key={fileInputKey} // Reset file input with a new key
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
            key={content.id} // Use unique ID here
           
            audioURL={content.audioURL}
            text={content.text}
          />
        ))}
      </div>
    </div>
  );
}

export default App;