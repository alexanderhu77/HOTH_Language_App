import { useState } from "react";
import { getRandomComposition } from "../services/composition_services";
import styles from "./CompositionPage.module.css";

function CompositionPage({ language }) {
  const [composition, setComposition] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerateComposition = () => {
    getRandomComposition(language)
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

      <button
        onClick={handleGenerateComposition}
        className="generate-button"
        disabled={!language}
      >
        Generate random {language || ""} text
      </button>

      {error && <div className="error">Error: {error}</div>}
      {composition && (
        <div className={styles.compositionContainer}>
          <h2 className={styles.compositionName}>{composition.name}</h2>
          <p className={styles.compositionContent}>{composition.content}</p>
        </div>
      )}
    </div>
  );
}

export default CompositionPage;
