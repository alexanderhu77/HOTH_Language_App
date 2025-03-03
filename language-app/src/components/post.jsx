import { useState, useEffect } from "react";
import { addComment } from "../services/post_services";
import "./post.css";

function Post({
  id,
  fileName,
  audioURL,
  text,
  comments: initialComments = [],
}) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // Only set comments once when component mounts or when initialComments changes
  useEffect(() => {
    if (initialComments && initialComments.length > 0) {
      setComments(initialComments);
    }
  }, []);

  const handleCommentSubmit = async () => {
    if (comment) {
      try {
        const updatedPost = await addComment(id, comment);
        setComments(updatedPost.comments);
        setComment(""); // Clear the input field
      } catch (error) {
        console.error("Error adding comment:", error);
      }
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

      <div className="comment-section">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button onClick={handleCommentSubmit}>Post Comment</button>
      </div>

      <div className="comments-list">
        {comments.map((com, index) => (
          <p key={index} className="comment">
            {com.content}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Post;
