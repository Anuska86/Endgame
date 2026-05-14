import { clsx } from "clsx";

export default function WordLetters({
  currentWord,
  chosenLetters,
  isGameLost,
}: any) {
  //Display the letters of the current word and the missing letters
  //If the game is lost, show the missing letters
  //If the game is won, show the letters of the current word

  const letterSpans = currentWord.split("").map((letter, index) => {
    const isRevealed = chosenLetters.includes(letter) || isGameLost;
    const letterClassName = clsx(
      "letter-span",
      !chosenLetters.includes(letter) && isGameLost && "letter-span--missing",
    );
    return (
      <span key={index} className={letterClassName}>
        {isRevealed ? letter : " "}
      </span>
    );
  });
}
