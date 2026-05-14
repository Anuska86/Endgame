import Confetti from "react-confetti";

export default function ConfettiContainer({ isGameWon }) {
  if (!isGameWon) {
    return null;
  } else {
    return (
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={800}
        recycle={false}
      />
    );
  }
}
