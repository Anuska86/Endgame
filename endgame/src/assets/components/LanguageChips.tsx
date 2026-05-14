import { clsx } from "clsx";

//Display the languages that have been lost
//and the ones that are still alive

export default function LanguageChips({ language, wrongGuessCount }) {
  const languageElements = languages.map((language, index) => {
    const isLanguageLost = index < wrongGuessCount;
    const styles = {
      backgroundColor: language.backgroundColor,
      color: language.color,
      position: "relative",
    };
    const className = clsx(
      "language-container",
      isLanguageLost && "language-container--lost",
    );
    return (
      <div className={className} key={language.name} style={styles}>
        {!isLanguageLost && language.name}
      </div>
    );
  });

  return <section className="language-chips">{languageElements}</section>;
}
