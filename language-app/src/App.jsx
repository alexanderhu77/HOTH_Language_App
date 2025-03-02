import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Post from './components/post.jsx'

function App() {
  const [posts, setPosts] = useState([]);

  const addPost = () => {
    const newPost = {
      name: `Post ${posts.length + 1}`,   // Dynamic post name
      text: `This is the content of post ${posts.length + 1}.` // Default text
    };

    setPosts([...posts, newPost]);  // Add the new post object to the posts array
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
