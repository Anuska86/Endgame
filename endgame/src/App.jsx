import React from "react";
import { languages } from "./languajes";
import { clsx } from "clsx";

export default function AssemblyEndgame() {
  const [currentWord, setCurrentWord] = React.useState("react");
  const [chosenLetters, setChosenLetters] = React.useState([]);
  console.log(chosenLetters);

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

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const handleLetterClick = (letter) => {
    if (!chosenLetters.includes(letter)) {
      setChosenLetters((prev) => [...prev, letter]);
    }
  };

  const keyboard = (
    <div className="keyboard">
      {alphabet.split("").map((letter) => {
        const guessedLetter = chosenLetters.includes(letter);
        const isLetterCorrect = guessedLetter && currentWord.includes(letter);
        const isLetterWrong = guessedLetter && !currentWord.includes(letter);
        const className = clsx("keyboard-button", {
          "keyboard-button--correct": isLetterCorrect,
          "keyboard-button--wrong": isLetterWrong,
        });

        return (
          <button
            key={letter}
            className={className}
            type="button"
            tabIndex={0}
            aria-label={letter}
            onClick={() => handleLetterClick(letter)}
          >
            {letter.toUpperCase()}
          </button>
        );
      })}
    </div>
  );

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p className="instructions">
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
      <section className="keyboard">{keyboard}</section>
      <button className="new-game">New Game</button>
    </main>
  );
}
