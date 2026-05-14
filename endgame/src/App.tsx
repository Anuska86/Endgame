import { useState } from "react";
import { languages } from "./languages.ts";
import { getRandomWord } from "./utils";

import ConfettiContainer from "./assets/components/ConfettiContainer.tsx";
import Header from "./assets/components/Header.tsx";
import GameStatus from "./assets/components/GameStatus.tsx";
import LanguageChips from "./assets/components/LanguageChips.tsx";
import WordLetters from "./WordLetters.tsx";
import AriaLiveStatus from "./assets/components/AriaLiveStatus.tsx";
import Keyboard from "./assets/components/Keyboard.tsx";
import NewGameButton from "./assets/NewGameButton.tsx";

export default function AssemblyEndgame() {
  const [currentWord, setCurrentWord] = useState<string>((): string =>
    getRandomWord(),
  );
  const [chosenLetters, setChosenLetters] = useState<string[]>([]);

  //Static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  //Derived values
  const wrongGuessCount: number = chosenLetters.filter(
    (letter: string) => !currentWord.includes(letter),
  ).length;
  const numberOfGuesses: number = languages.length - 1;
  const isGameWon: boolean = currentWord
    .split("")
    .every((letter: string) => chosenLetters.includes(letter));
  const isGameLost: boolean = wrongGuessCount >= languages.length - 1;
  const isGameOver: boolean = isGameWon || isGameLost;

  const lastChosenLetter: string = chosenLetters[chosenLetters.length - 1];
  const lastGuessWasWrong: boolean | "" =
    lastChosenLetter && !currentWord.includes(lastChosenLetter);

  //Handle the click event for the keyboard buttons
  function handleLetterClick(letter: string): void {
    if (!chosenLetters.includes(letter)) {
      setChosenLetters((prev: string[]): string[] => [...prev, letter]);
    }
  }

  //Handle the click event for the new random word button
  function handleNewRandomWord(): void {
    setCurrentWord(getRandomWord());
    setChosenLetters([]);
  }

  return (
    <main>
      <div className="main-container">
        <ConfettiContainer isGameWon={isGameWon} />
        <Header />
        <GameStatus
          isGameWon={isGameWon}
          isGameLost={isGameLost}
          isGameOver={isGameOver}
          lastGuessWasWrong={lastGuessWasWrong}
          wrongGuessCount={wrongGuessCount}
        ></GameStatus>

        <section className="remaining-guesses">
          <strong>
            Remaining guesses: {numberOfGuesses - wrongGuessCount}
          </strong>
        </section>

        <section className="languages">
          <LanguageChips
            languages={languages}
            wrongGuessCount={wrongGuessCount}
          ></LanguageChips>
        </section>

        <section className="word-display">
          <WordLetters
            currentWord={currentWord}
            chosenLetters={chosenLetters}
            isGameLost={isGameLost}
          ></WordLetters>

          <AriaLiveStatus
            currentWord={currentWord}
            lastChosenLetter={lastChosenLetter}
            chosenLetters={chosenLetters}
            numberOfGuesses={numberOfGuesses}
          ></AriaLiveStatus>
        </section>

        <section className="keyboard">
          <Keyboard
            alphabet={alphabet}
            chosenLetters={chosenLetters}
            currentWord={currentWord}
            isGameOver={isGameOver}
            handleLetterClick={handleLetterClick}
          ></Keyboard>
        </section>

        <NewGameButton
          isGameOver={isGameOver}
          handleNewRandomWord={handleNewRandomWord}
        ></NewGameButton>
      </div>
    </main>
  );
}
