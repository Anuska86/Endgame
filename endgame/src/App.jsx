import React from "react";
import { languages } from "./languajes";
import { clsx } from "clsx";

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
  const isGameLost = wrongGuessCount >= languages.length;
  const isGameOver = isGameWon || isGameLost;

  console.log(wrongGuessCount);

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
        {language.name}
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
        {isGameWon && (
          <>
            <h2>You win! 🎉 </h2>
            <p>Good game!</p>
          </>
        )}
        {isGameLost && (
          <>
            <h2>You lose! 😢</h2>
          </>
        )}
      </section>
      <section className="languages">{languageElements}</section>
      <section className="word-display">{letterSpans}</section>
      <section className="keyboard">{keyboard}</section>
      {isGameOver && <button className="new-game">New Game</button>}
    </main>
  );
}
