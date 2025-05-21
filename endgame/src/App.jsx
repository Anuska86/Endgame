import React from "react";
import { clsx } from "clsx";
import { languages } from "./languages";
import { getFarewellText } from "./utils";

export default function AssemblyEndgame() {
  const [currentWord, setCurrentWord] = React.useState("react");
  const [chosenLetters, setChosenLetters] = React.useState([]);

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const wrongGuessCount = chosenLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;

  const isGameWon = currentWord
    .split("")
    .every((letter) => chosenLetters.includes(letter));
  const isGameLost = wrongGuessCount >= languages.length - 1;
  const isGameOver = isGameWon || isGameLost;

  console.log(wrongGuessCount);

  const lostFarewells = languages.slice(0, wrongGuessCount).map((language) => (
    <div className="farewell" key={language.name}>
      {getFarewellText(language.name)}
    </div>
  ));

  const languageElements = languages.map((language, index) => {
    const isLanguageLost = index < wrongGuessCount;
    const styles = {
      backgroundColor: language.backgroundColor,
      color: language.color,
      position: "relative",
    };
    const className = clsx(
      "language-container",
      isLanguageLost && "language-container--lost"
    );
    return (
      <div className={className} key={language.name} style={styles}>
        {!isLanguageLost && language.name}
      </div>
    );
  });

  //Display the letters of the current word
  const letterSpans = currentWord.split("").map((letter, index) => (
    <span key={index} className="letter-span">
      {chosenLetters.includes(letter) ? letter : " "}
    </span>
  ));

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
            aria-label={`Letter ${letter}`}
            onClick={() => handleLetterClick(letter)}
            disabled={isGameOver}
            aria-disabled={chosenLetters.includes(letter)}
          >
            {letter.toUpperCase()}
          </button>
        );
      })}
    </div>
  );

  const gameStatusClass = clsx(
    "game-status",
    isGameWon && "game-status--won",
    isGameLost && "game-status--lost"
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
      <section aria-live="polite" role="status" className={gameStatusClass}>
        {isGameWon && (
          <>
            <h2>You win! 🎉 </h2>
            <p>Good game!</p>
          </>
        )}
        {isGameLost && (
          <>
            <h2>
              You lose! 😢 Now Assembly is going to be your new best friend 😛{" "}
            </h2>
          </>
        )}
        {lostFarewells}
      </section>
      <section className="languages">{languageElements}</section>
      <section className="word-display">{letterSpans}</section>
      <section className="sr-only" aria-live="polite" role="status">
        <p>
          Current word:
          {currentWord
            .split("")
            .map((letter) =>
              chosenLetters.includes(letter) ? letter + "." : "blank"
            )
            .join(" ")}
        </p>
      </section>
      <section className="keyboard">{keyboard}</section>
      {isGameOver && <button className="new-game">New Game</button>}
    </main>
  );
}
