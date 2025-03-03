import { useState } from "react";
import "./Home.css";

function Home() {
  return (
    <div className="App">
      <h1>monkeyspeak</h1>
      <a href="/create-post">
        <button id="add-post-button">+</button>
      </a>
    </div>
  );
}

export default Home;
