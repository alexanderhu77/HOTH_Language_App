import axios from "axios";

const baseUrl = "/api/posts";

// Create a new post
const createPost = async (formData) => {
  try {
    const response = await axios.post(baseUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || "Failed to create post");
    }
    throw error;
  }
};

// Get all posts
const getAllPosts = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

// Get a single post by ID
const getPost = (id) => {
  return axios.get(`${baseUrl}/${id}`).then((response) => response.data);
};

// Add a comment to a post
const addComment = (postId, content) => {
  return axios
    .post(`${baseUrl}/${postId}/comments`, { content })
    .then((response) => response.data);
};

export { createPost, getAllPosts, getPost, addComment };
