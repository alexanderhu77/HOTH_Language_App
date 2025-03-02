import { useState } from 'react';
import './post.css';

function Post({ fileName, audioURL, text }) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  // Handle comment submission
  const handleCommentSubmit = () => {
    if (comment) {
      setComments([...comments, comment]);
      setComment(''); // Clear the input field after comment is added
    }
  };

  return (
    <div className="Post">
      <p>{fileName}</p>
      <p>{text}</p>
      <audio controls>
        <source src={audioURL} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Comment Input and Button */}
      <div className="comment-section">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button onClick={handleCommentSubmit}>Post Comment</button>
      </div>

      {/* Display Comments */}
      <div className="comments-list">
        {comments.map((com, index) => (
          <p key={index} className="comment">{com}</p>
        ))}
      </div>
    </div>
  );
}

export default Post;