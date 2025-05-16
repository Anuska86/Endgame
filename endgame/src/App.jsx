import React from "react";
import { languages } from "./languajes";

export default function AssemblyEndgame() {
  const [currentWord, setCurrentWord] = React.useState("react");

  const languageElements = languages.map((language) => (
    <div
      className="language-container"
      key={language.name}
      style={{
        backgroundColor: language.backgroundColor,
        color: language.color,
      }}
    >
      {language.name}
    </div>
  ));

  const letterSpans = currentWord.split("").map((letter, index) => (
    <span key={index} className="letter-span">
      {letter}
    </span>
  ));

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <section className="game-status">
        <h2>You win! 🎉 </h2>
        <p>Good game!</p>
      </section>
      <section className="languages">{languageElements}</section>
      <section className="word-display">{letterSpans}</section>
    </main>
  );
}
