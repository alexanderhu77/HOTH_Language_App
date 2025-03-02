import { useState, useEffect } from "react";
import { getRandomComposition } from "../services/composition_services";

function Composition() {
  const [composition, setComposition] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getRandomComposition()
      .then((randomComposition) => {
        setComposition(randomComposition);
      })
      .catch((error) => {
        console.error("Error fetching random composition:", error);
        setError(error.message);
      });
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!composition) return <div>Loading...</div>;

  return (
    <div>
      <h1>{composition.name}</h1>
      <p>{composition.content}</p>
    </div>
  );
}

export default Composition;
