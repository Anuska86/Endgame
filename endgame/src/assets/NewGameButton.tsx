export default function NewGameButton({ isGameOver, handleNewRandomWord }) {
  if (!isGameOver) {
    return null;
  } else {
    return (
      <div className="game-over-overlay">
        <button className="new-game" onClick={handleNewRandomWord}>
          New Game
        </button>
      </div>
    );
  }
}
