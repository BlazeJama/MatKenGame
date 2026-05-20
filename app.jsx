// MatKenGame — main React app
// MVP build: Home → Quiz (10 questions) → End → Play Again
//
// Data is read from window.vehicles, set by data/vehicles.js (loaded before this file).
// Each round picks 10 random vehicles, one random image per vehicle, and 3 random wrong
// answers from the same category for each question.

const { useState, useMemo } = React;

// ============================================================================
// Helpers
// ============================================================================

// Fisher-Yates shuffle — returns a new array, doesn't mutate the input
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Pick n random items from an array without duplicates
function pickRandom(arr, n) {
  return shuffle(arr).slice(0, n);
}

// Build one round: 10 question objects, each with the correct vehicle,
// a randomly chosen image, and 4 shuffled answer options.
function buildRound(vehicles) {
  const QUESTIONS_PER_ROUND = 10;
  const roundVehicles = shuffle(vehicles).slice(0, QUESTIONS_PER_ROUND);

  return roundVehicles.map((vehicle) => {
    const image = pickRandom(vehicle.images, 1)[0];
    // Wrong answers: same category, different vehicle
    const wrongPool = vehicles.filter(
      (v) => v.id !== vehicle.id && v.category === vehicle.category
    );
    const wrongAnswers = pickRandom(wrongPool, 3);
    const options = shuffle([vehicle, ...wrongAnswers]);
    return { vehicle, image, options };
  });
}

// Score message based on final score out of 10
function scoreMessage(score) {
  if (score >= 9) return "Outstanding! 🏆";
  if (score >= 7) return "Great job! 🎯";
  if (score >= 5) return "Not bad — keep going. 👍";
  if (score >= 3) return "Keep practising. 💪";
  return "Worth another try. 🔁";
}

// ============================================================================
// Home Screen
// ============================================================================

function HomeScreen({ onPlay, vehicleCount }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-navy text-white py-6 px-4 shadow">
        <h1 className="text-2xl font-bold tracking-wide text-center">MatKenGame</h1>
        <p className="text-sm text-center text-white/70 mt-1">
          Military vehicle recognition quiz
        </p>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-10 max-w-md mx-auto w-full">
        {/* Stats card */}
        <div className="w-full bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8 text-center">
          <div className="text-4xl font-bold text-navy">{vehicleCount}</div>
          <div className="text-sm text-gray-600 mt-1">Main Battle Tanks in the database</div>
        </div>

        {/* Play button */}
        <button
          onClick={onPlay}
          className="w-full bg-navy text-white text-lg font-semibold rounded-xl px-8 py-4 min-h-[44px] shadow-md active:scale-95 transition mb-6"
        >
          ▶ Play
        </button>

        {/* How to play */}
        <div className="text-sm text-gray-600 text-center leading-relaxed">
          <p className="mb-2"><strong>How to play:</strong></p>
          <p>Look at the photo of a tank, then pick the correct name and country from 4 options. Each round has 10 questions.</p>
        </div>
      </main>

      <footer className="text-center text-xs text-gray-400 py-4">
        v0.2.0 — MVP
      </footer>
    </div>
  );
}

// ============================================================================
// Quiz Screen
// ============================================================================

function QuizScreen({ round, onComplete }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedId, setSelectedId] = useState(null);

  const question = round[questionIndex];
  const isLastQuestion = questionIndex === round.length - 1;
  const hasAnswered = selectedId !== null;
  const isCorrect = hasAnswered && selectedId === question.vehicle.id;

  const handleSelect = (vehicleId) => {
    if (hasAnswered) return; // can't change answer once given
    setSelectedId(vehicleId);
    if (vehicleId === question.vehicle.id) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(score);
    } else {
      setQuestionIndex((i) => i + 1);
      setSelectedId(null);
    }
  };

  // Tailwind class helper for each answer button based on its state
  const optionClasses = (optionId) => {
    const base =
      "w-full text-left flex items-center gap-4 rounded-xl border-2 px-4 py-3 min-h-[44px] transition";
    if (!hasAnswered) {
      return `${base} bg-white border-gray-200 active:bg-gray-50`;
    }
    const isThisCorrect = optionId === question.vehicle.id;
    const isThisSelected = optionId === selectedId;
    if (isThisCorrect) {
      return `${base} bg-green-50 border-green-500 text-green-800`;
    }
    if (isThisSelected) {
      return `${base} bg-red-50 border-red-500 text-red-800`;
    }
    return `${base} bg-white border-gray-200 opacity-50`;
  };

  const letters = ["A", "B", "C", "D"];
  const progressPercent = ((questionIndex + (hasAnswered ? 1 : 0)) / round.length) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navy header with progress + counter + score */}
      <header className="bg-navy text-white px-4 pt-4 pb-3 shadow">
        <div className="max-w-md mx-auto w-full">
          <div className="flex items-center justify-between text-sm mb-2">
            <span>Question {questionIndex + 1} / {round.length}</span>
            <span>Score: {score}</span>
          </div>
          <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </header>

      {/* Vehicle image */}
      <div className="max-w-md mx-auto w-full">
        <img
          src={question.image.url}
          alt="Military vehicle to identify"
          className="w-full h-52 object-cover bg-gray-200"
        />
      </div>

      {/* Question + answers */}
      <main className="flex-1 max-w-md mx-auto w-full px-4 py-5">
        <p className="text-sm font-medium text-gray-700 mb-4">Which vehicle is this?</p>

        <div className="flex flex-col gap-3">
          {question.options.map((option, i) => {
            const isThisCorrect = option.id === question.vehicle.id;
            const isThisSelected = option.id === selectedId;
            return (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className={optionClasses(option.id)}
                disabled={hasAnswered}
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-semibold text-sm shrink-0">
                  {letters[i]}
                </span>
                <span className="flex-1">
                  <span className="block font-semibold">{option.name}</span>
                  <span className="block text-xs opacity-75">{option.country}</span>
                </span>
                {hasAnswered && isThisCorrect && <span className="text-2xl">✓</span>}
                {hasAnswered && isThisSelected && !isThisCorrect && (
                  <span className="text-2xl">✗</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Fun fact panel — shown only after answering */}
        {hasAnswered && (
          <div
            className={`mt-5 rounded-xl border-2 p-4 ${
              isCorrect
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <p className="text-sm font-semibold mb-1">
              {isCorrect ? "Correct!" : `That was the ${question.vehicle.name}.`}
            </p>
            <p className="text-sm text-gray-700">💡 {question.vehicle.funFact}</p>
          </div>
        )}

        {/* Next button — shown only after answering */}
        {hasAnswered && (
          <button
            onClick={handleNext}
            className="w-full mt-5 bg-navy text-white text-lg font-semibold rounded-xl px-8 py-4 min-h-[44px] shadow-md active:scale-95 transition"
          >
            {isLastQuestion ? "See Results →" : "Next Question →"}
          </button>
        )}
      </main>
    </div>
  );
}

// ============================================================================
// End Screen
// ============================================================================

function EndScreen({ score, total, onPlayAgain }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-navy text-white py-6 px-4 shadow">
        <h1 className="text-2xl font-bold tracking-wide text-center">Round Complete</h1>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-10 max-w-md mx-auto w-full">
        <div className="text-center mb-10">
          <div className="text-6xl font-bold text-navy mb-2">
            {score}<span className="text-gray-400"> / {total}</span>
          </div>
          <p className="text-lg text-gray-700">{scoreMessage(score)}</p>
        </div>

        <button
          onClick={onPlayAgain}
          className="w-full bg-navy text-white text-lg font-semibold rounded-xl px-8 py-4 min-h-[44px] shadow-md active:scale-95 transition"
        >
          🔁 Play Again
        </button>
      </main>

      <footer className="text-center text-xs text-gray-400 py-4">
        v0.2.0 — MVP
      </footer>
    </div>
  );
}

// ============================================================================
// App (screen router)
// ============================================================================

function App() {
  const [screen, setScreen] = useState("home"); // "home" | "quiz" | "end"
  const [round, setRound] = useState(null);
  const [finalScore, setFinalScore] = useState(0);

  const vehicles = window.vehicles || [];

  const startGame = () => {
    setRound(buildRound(vehicles));
    setFinalScore(0);
    setScreen("quiz");
  };

  const finishGame = (score) => {
    setFinalScore(score);
    setScreen("end");
  };

  const goHome = () => {
    setRound(null);
    setScreen("home");
  };

  // Safety net — if data didn't load, show a clear message
  if (vehicles.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div>
          <p className="text-red-700 font-semibold mb-2">No vehicle data loaded.</p>
          <p className="text-sm text-gray-600">
            Check that <code>data/vehicles.js</code> loads before <code>app.jsx</code>.
          </p>
        </div>
      </div>
    );
  }

  if (screen === "quiz") {
    return <QuizScreen round={round} onComplete={finishGame} />;
  }

  if (screen === "end") {
    return <EndScreen score={finalScore} total={round.length} onPlayAgain={startGame} />;
  }

  return <HomeScreen onPlay={startGame} vehicleCount={vehicles.length} />;
}

// Mount the app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
