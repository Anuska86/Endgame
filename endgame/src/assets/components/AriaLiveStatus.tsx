export default function AriaLiveStatus({
  currentWord,
  lastChosenLetter,
  chosenLetters,
  numberOfGuesses,
}: any) {
  return (
    <section className="sr-only" aria-live="polite" role="status">
      <p>
        {currentWord.includes(
          lastChosenLetter
            ? `Correct! The letter ${lastChosenLetter} is in the word!`
            : `Wrong! The letter ${lastChosenLetter} is not in the word!`,
        )}
        You have {numberOfGuesses}guesses left.
      </p>
      <p>
        Current word:
        {currentWord
          .split("")
          .map((letter) =>
            chosenLetters.includes(letter) ? letter + "." : "blank",
          )
          .join(" ")}
      </p>
    </section>
  );
}
