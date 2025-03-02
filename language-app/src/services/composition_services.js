import axios from "axios";

const baseUrl = "/api/compositions";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const getRandomComposition = () => {
  return axios.get(`${baseUrl}/random`).then((response) => response.data);
};

const addComposition = (composition) => {
  return axios.post(baseUrl, composition).then((response) => response.data);
};

const deleteComposition = (id) => {
  console.log(id);
  return axios.delete(`${baseUrl}/${id}`);
};

const updateComposition = (id, composition) => {
  return axios
    .put(`${baseUrl}/${id}`, composition)
    .then((response) => response.data);
};

export {
  getAll,
  addComposition,
  deleteComposition,
  updateComposition,
  getRandomComposition,
};
