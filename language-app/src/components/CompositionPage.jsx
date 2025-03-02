import { useState } from "react";
import { getRandomComposition } from "../services/composition_services";
import Composition from "./Composition";

function CompositionPage() {
  const [composition, setComposition] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerateComposition = () => {
    getRandomComposition()
      .then((randomComposition) => {
        setComposition(randomComposition);
      })
      .catch((error) => {
        console.error("Error fetching random composition:", error);
        setError(error.message);
      });
  };

  return (
    <div>
      <h1>Welcome! Click the button to get a random text!</h1>

      <button onClick={handleGenerateComposition} className="generate-button">
        Generate Random Text
      </button>

      {error && <div className="error">Error: {error}</div>}
      {composition && (
        <div className="composition-container">
          <h2>{composition.name}</h2>
          <p>{composition.content}</p>
        </div>
      )}
    </div>
  );
}

export default CompositionPage;
