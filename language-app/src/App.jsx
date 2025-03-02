import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Post from './components/post.jsx'

function App() {
  const [posts, setPosts] = useState([]);

  const addPost = () => {
    setPosts([...posts, `Post ${posts.length + 1}`]);
  }; 
  return (
    <div className="App"> 
      <h1>Recordings</h1>
      {/* Button to add a post */}
      <button onClick={addPost}>Add Post</button> 
      <div className="posts">
        {posts.map((content, index) => (
          <Post key={index} content={content} />
        ))}
      </div>
    </div>
  );
}

export default App
