import React from "react";
import { clsx } from "clsx";
import Confetti from "react-confetti";
import { languages } from "./languages";
import { getFarewellText, getRandomWord } from "./utils";

export default function AssemblyEndgame() {
  const [currentWord, setCurrentWord] = React.useState(() => getRandomWord());
  const [chosenLetters, setChosenLetters] = React.useState([]);
  const [showNewGameModal, setShowNewGameModal] = React.useState(false);

  //Static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  //Derived values
  const wrongGuessCount = chosenLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;
  const numberOfGuesses = languages.length - 1;
  const isGameWon = currentWord
    .split("")
    .every((letter) => chosenLetters.includes(letter));
  const isGameLost = wrongGuessCount >= languages.length - 1;
  const isGameOver = isGameWon || isGameLost;

  const lastChosenLetter = chosenLetters[chosenLetters.length - 1];
  const lastGuessWasWrong =
    lastChosenLetter && !currentWord.includes(lastChosenLetter);

  //Get the farewells for the languages that have been lost
  const lostFarewells = languages.slice(0, wrongGuessCount).map((language) => (
    <div className="farewell" key={language.name}>
      {getFarewellText(language.name)}
    </div>
  ));

  //Get the farewells for the languages that are still alive
  const lastLostLanguage =
    lastGuessWasWrong && wrongGuessCount > 0
      ? languages[wrongGuessCount - 1]
      : null;

  //Display the languages that have been lost
  //and the ones that are still alive
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

  //Display the letters of the current word and the missing letters
  //If the game is lost, show the missing letters
  //If the game is won, show the letters of the current word

  const letterSpans = currentWord.split("").map((letter, index) => {
    const isRevealed = chosenLetters.includes(letter) || isGameLost;
    const letterClassName = clsx(
      "letter-span",
      !chosenLetters.includes(letter) && isGameLost && "letter-span--missing"
    );
    return (
      <span key={index} className={letterClassName}>
        {isRevealed ? letter : " "}
      </span>
    );
  });
  //Handle the click event for the keyboard buttons
  const handleLetterClick = (letter) => {
    if (!chosenLetters.includes(letter)) {
      setChosenLetters((prev) => [...prev, letter]);
    }
  };

  //Handle the click event for the new random word button
  const handleNewRandomWord = () => {
    setCurrentWord(getRandomWord());
    setChosenLetters([]);
  };

  const keyboard = (
    <div className={`keyboard${isGameLost ? " keyboard--stone" : ""}`}>
      {alphabet.split("").map((letter, idx) => {
        const guessedLetter = chosenLetters.includes(letter);
        const isLetterCorrect = guessedLetter && currentWord.includes(letter);
        const isLetterWrong = guessedLetter && !currentWord.includes(letter);
        const className = clsx("keyboard-button", {
          "keyboard-button--correct": isLetterCorrect,
          "keyboard-button--wrong": isLetterWrong,
        });
        const style = isGameLost ? { transitionDelay: `${idx * 0.04}s` } : {};

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
            style={style}
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
      <div className="main-container">
        {isGameWon && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={800}
            recycle={false}
          />
        )}
        <header>
          <h1>Assembly: Endgame</h1>
          <p className="instructions">
            Guess the word in under 8 attempts to keep the programming world
            safe from Assembly! For every wrong letter, a programming language
            will be sacrificed!😱{" "}
          </p>
        </header>
        <section className="remaining-guesses">
          <strong>
            Remaining guesses: {numberOfGuesses - wrongGuessCount}
          </strong>
        </section>
        <section aria-live="polite" role="status" className={gameStatusClass}>
          {isGameWon && (
            <>
              <h2>You win! 🎉 </h2>
              <p>Good game! You save the world for Assembly, thank you! </p>
            </>
          )}
          {isGameLost && (
            <>
              <h2>
                You lose! 😢 Now Assembly is going to be your new best friend 😛{" "}
                <span className="reveal-word">
                  The word was: <strong>{currentWord}</strong>
                </span>
              </h2>
            </>
          )}
          {!isGameLost && lastLostLanguage && (
            <div className="farewell" key={lastLostLanguage.name}>
              {getFarewellText(lastLostLanguage.name)}
            </div>
          )}
        </section>
        <section className="languages">{languageElements}</section>
        <section className="word-display">{letterSpans}</section>

        {/* Reader-only mode: No interactive elements here */}
        <section className="sr-only" aria-live="polite" role="status">
          <p>
            {currentWord.includes(
              lastChosenLetter
                ? `Correct! The letter ${lastChosenLetter} is in the word!`
                : `Wrong! The letter ${lastChosenLetter} is not in the word!`
            )}
            You have {numberOfGuesses}guesses left.
          </p>
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
        {isGameOver && (
          <button className="new-game" onClick={handleNewRandomWord}>
            New Game
          </button>
        )}
      </div>
    </main>
  );
}
