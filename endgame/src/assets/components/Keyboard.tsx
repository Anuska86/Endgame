import { clsx } from "clsx";

export default function Keyboard({
  alphabet,
  chosenLetters,
  currentWord,
  isGameLost,
  isGameOver,
  handleLetterClick,
}: any) {
  const keyboardElements = alphabet.split("").map((letter, idx) => {
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
  });

  return (
    <section className={`keyboard${isGameLost ? " keyboard--stone" : ""}`}>
      {keyboardElements}
    </section>
  );
}
