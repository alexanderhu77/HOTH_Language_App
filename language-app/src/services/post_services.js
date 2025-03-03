import axios from "axios";

const baseUrl = "/api/posts";

// Get all posts
const getAllPosts = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

// Get a single post by ID
const getPost = (id) => {
  return axios.get(`${baseUrl}/${id}`).then((response) => response.data);
};

// Create a new post
const createPost = (newPost) => {
  return axios.post(baseUrl, newPost).then((response) => response.data);
};

// Add a comment to a post
const addComment = (postId, comment) => {
  return axios
    .post(`${baseUrl}/${postId}/comments`, { content: comment })
    .then((response) => response.data);
};

export { getAllPosts, getPost, createPost, addComment };
