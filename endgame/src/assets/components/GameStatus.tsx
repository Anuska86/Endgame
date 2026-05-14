import { clsx } from "clsx";
import { getFarewellText } from "../../utils.ts";
import { languages } from "../../languages.ts";

export default function GameStatus({
  isGameWon,
  isGameLost,
  isGameOver,
  lastGuessWasWrong,
  wrongGuessCount,
}: any) {
  const gameStatusClass = clsx(
    "game-status",
    isGameWon && "game-status--won",
    isGameLost && "game-status--lost",
  );

  //Get the farewells for the languages that are still alive
  const lastLostLanguage =
    lastGuessWasWrong && wrongGuessCount > 0
      ? languages[wrongGuessCount - 1]
      : null;

  //Get the farewells for the languages that have been lost
  const lostFarewells = languages.slice(0, wrongGuessCount).map((language) => (
    <div className="farewell" key={language.name}>
      {getFarewellText(language.name)}
    </div>
  ));

  return (
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
            You lose! 😢 Now Assembly is going to be your new best friend
            😛{" "}
          </h2>
        </>
      )}
      {!isGameLost && lastLostLanguage && (
        <div className="farewell" key={lastLostLanguage.name}>
          {getFarewellText(lastLostLanguage.name)}
        </div>
      )}
    </section>
  );
}
