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
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Welcome! Select a language and click the button to get a random text!
      </h1>

      <div className={styles.buttonContainer}>
        <button
          onClick={handleGenerateComposition}
          className={styles.generateButton}
          disabled={!language}
        >
          Generate random {language || ""} text
        </button>
      </div>

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
