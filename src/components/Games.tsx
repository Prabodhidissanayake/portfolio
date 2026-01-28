"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gamepad2,
  RotateCcw,
  Trophy,
  Zap,
  Target,
  Sparkles,
  Play,
  Pause,
} from "lucide-react";
import dynamic from "next/dynamic";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

const MemoryGame = () => {
  const [cards, setCards] = useState<number[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const initializeGame = useCallback(() => {
    const numbers = [1, 2, 3, 4]; // 4 pairs = 8 cards
    const shuffled = [...numbers, ...numbers].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameWon(false);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setGameWon(true);
    }
  }, [matched, cards]);

  const handleCardClick = (index: number) => {
    if (flipped.length === 2) return;
    if (flipped.includes(index)) return;
    if (matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped;
      if (cards[first] === cards[second]) {
        setTimeout(() => {
          setMatched([...matched, first, second]);
          setFlipped([]);
        }, 500);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Memory Game
        </h3>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Moves: {moves}
          </span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={initializeGame}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <RotateCcw size={16} />
          </motion.button>
        </div>
      </div>
      {!gameWon && (
        <div className="grid grid-cols-4 gap-3 mb-4">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              whileHover={matched.includes(index) ? {} : { scale: 1.05 }}
              whileTap={matched.includes(index) ? {} : { scale: 0.95 }}
              animate={
                matched.includes(index)
                  ? {
                      scale: 0,
                      opacity: 0,
                      rotateY: 180,
                    }
                  : {
                      scale: 1,
                      opacity: 1,
                      rotateY: 0,
                    }
              }
              transition={{ duration: 0.3 }}
              className={`aspect-square rounded-lg cursor-pointer flex items-center justify-center text-xl font-bold transition-all duration-300 ${
                matched.includes(index)
                  ? "invisible" 
                  : flipped.includes(index)
                  ? "bg-blue-500 text-white transform-gpu"
                  : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
              onClick={() => !matched.includes(index) && handleCardClick(index)}
            >
              {!matched.includes(index) &&
                (flipped.includes(index) ? card : "?")}
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {gameWon && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            className="text-center p-6 bg-green-100 dark:bg-green-900/30 rounded-lg"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
              className="w-24 h-24 mx-auto mb-4"
            >
              <Player
                autoplay
                loop={false}
                src="/animations/won.json"
                style={{ height: "100%", width: "100%" }}
              />
            </motion.div>

            <p className="text-green-800 dark:text-green-200 font-semibold">
              🎉 Congratulations! You won in {moves} moves! 🎉
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ReactionGame = () => {
  const [gameState, setGameState] = useState<
    "waiting" | "ready" | "playing" | "result" | "finished"
  >("waiting");
  const [currentRound, setCurrentRound] = useState(0);
  const [targetEmoji, setTargetEmoji] = useState("");
  const [emojis, setEmojis] = useState<string[]>([]);
  const [startTime, setStartTime] = useState(0);
  const [roundTimes, setRoundTimes] = useState<number[]>([]);
  const [averageTime, setAverageTime] = useState(0);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [showWrongChoice, setShowWrongChoice] = useState(false);

  const emojiPool = [
    "🐶",
    "🐱",
    "🐭",
    "🐹",
    "🐰",
    "🦊",
    "🐻",
    "🐼",
    "🐸",
    "🐵",
  ];
  const totalRounds = 3;

  const getRandomEmojis = () => {
    const shuffled = [...emojiPool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  };

  const startGame = () => {
    setCurrentRound(1);
    setRoundTimes([]);
    setGameState("ready");
    startRound();
  };

  const startRound = () => {
    const roundEmojis = getRandomEmojis();
    const target = roundEmojis[Math.floor(Math.random() * roundEmojis.length)];

    setEmojis(roundEmojis);
    setTargetEmoji(target);
    setGameState("ready");

    setTimeout(() => {
      setGameState("playing");
      setStartTime(Date.now());
    }, 500); 
  };

  const handleEmojiClick = (clickedEmoji: string) => {
    if (gameState !== "playing") return;

    const reactionTime = Date.now() - startTime;

    if (clickedEmoji === targetEmoji) {
      const newRoundTimes = [...roundTimes, reactionTime];
      setRoundTimes(newRoundTimes);
      setGameState("result");

      if (currentRound < totalRounds) {
        setTimeout(() => {
          setCurrentRound(currentRound + 1);
          startRound();
        }, 1500);
      } else {
        const avgTime = Math.round(
          newRoundTimes.reduce((a, b) => a + b, 0) / newRoundTimes.length
        );
        setAverageTime(avgTime);

        if (!bestTime || avgTime < bestTime) {
          setBestTime(avgTime);
        }

        setTimeout(() => {
          setGameState("finished");
        }, 1500);
      }
    } else {
      setShowWrongChoice(true);
      setTimeout(() => {
        setShowWrongChoice(false);
      }, 500);
    }
  };

  const resetGame = () => {
    setGameState("waiting");
    setCurrentRound(0);
    setRoundTimes([]);
    setAverageTime(0);
    setShowWrongChoice(false);
    setTargetEmoji("");
    setEmojis([]);
  };

  const getGameMessage = () => {
    switch (gameState) {
      case "waiting":
        return "Find the target emoji as fast as you can! 3 rounds.";
      case "ready":
        return `Round ${currentRound}/3 - Get Ready...`;
      case "playing":
        return `FIND: ${targetEmoji} NOW!`;
      case "result":
        return `${roundTimes[roundTimes.length - 1]}ms - Nice!`;
      case "finished":
        return `Average: ${averageTime}ms`;
      default:
        return "";
    }
  };

  const getBackgroundColor = () => {
    if (showWrongChoice) return "bg-red-500";

    switch (gameState) {
      case "ready":
        return "bg-yellow-400";
      case "playing":
        return "bg-green-500";
      case "result":
        return "bg-blue-500";
      case "finished":
        return "bg-purple-500";
      default:
        return "bg-purple-400";
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Emoji Reaction
        </h3>
        <div className="flex items-center gap-4">
          {bestTime && (
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Best: {bestTime}ms
            </div>
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={resetGame}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <RotateCcw size={16} />
          </motion.button>
        </div>
      </div>

      <motion.div
        className={`h-16 rounded-lg flex items-center justify-center mb-6 transition-all duration-300 ${getBackgroundColor()}`}
        animate={showWrongChoice ? { scale: [1, 1.05, 1] } : {}}
      >
        <div className="text-center text-white">
          <p className="font-semibold text-lg">
            {showWrongChoice ? "❌ Wrong emoji!" : getGameMessage()}
          </p>
          {gameState === "ready" && (
            <p className="text-sm opacity-80">Get ready...</p>
          )}
        </div>
      </motion.div>

      {(gameState === "ready" ||
        gameState === "playing" ||
        gameState === "result") && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid grid-cols-5 gap-3 mb-6"
        >
          {emojis.map((emoji, index) => (
            <motion.button
              key={index}
              whileHover={gameState === "playing" ? { scale: 1.1 } : {}}
              whileTap={gameState === "playing" ? { scale: 0.9 } : {}}
              className={`aspect-square text-4xl rounded-xl transition-all duration-200 ${
                gameState === "playing"
                  ? "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                  : "bg-gray-100 dark:bg-gray-700 cursor-default"
              } ${
                emoji === targetEmoji && gameState === "result"
                  ? "ring-4 ring-green-500 bg-green-100"
                  : ""
              }`}
              onClick={() => handleEmojiClick(emoji)}
              disabled={gameState !== "playing"}
            >
              {emoji}
            </motion.button>
          ))}
        </motion.div>
      )}

      {gameState === "waiting" && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={startGame}
          className="w-full h-32 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center space-y-2"
        >
          <span className="text-2xl">🎯</span>
          <span>Start Emoji Challenge</span>
          <span className="text-sm opacity-80">
            Click the target emoji quickly!
          </span>
        </motion.button>
      )}

      {currentRound > 0 && gameState !== "finished" && (
        <div className="flex justify-center space-x-2 mb-4">
          {Array.from({ length: totalRounds }, (_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i < currentRound - 1
                  ? "bg-green-500"
                  : i === currentRound - 1
                  ? "bg-blue-500"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
            />
          ))}
        </div>
      )}

      <AnimatePresence>
        {gameState === "finished" && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            className="text-center p-6 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: 2 }}
            >
              <Trophy className="mx-auto text-purple-600 mb-3" size={40} />
            </motion.div>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              🎉 Challenge Complete!
            </h4>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p>
                Average Reaction Time:{" "}
                <span className="font-bold text-purple-600">
                  {averageTime}ms
                </span>
              </p>
              <div className="flex justify-center space-x-4 text-sm">
                {roundTimes.map((time, i) => (
                  <span key={i}>
                    Round {i + 1}: {time}ms
                  </span>
                ))}
              </div>
              <p className="text-sm pt-2">
                {averageTime < 400
                  ? "⚡ Lightning fast!"
                  : averageTime < 600
                  ? "🔥 Great reflexes!"
                  : averageTime < 800
                  ? "👍 Good job!"
                  : "🎯 Keep practicing!"}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SnakeGame = () => {
  const [snake, setSnake] = useState([[3, 3]]);
  const [food, setFood] = useState([5, 5]);
  const [direction, setDirection] = useState([0, 1]);
  const [gameRunning, setGameRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const gridWidth = 15;
  const gridHeight = 10;

  const generateFood = useCallback(() => {
    const newFood = [
      Math.floor(Math.random() * gridHeight),
      Math.floor(Math.random() * gridWidth),
    ];
    return newFood;
  }, []);

  const moveSnake = useCallback(() => {
    if (!gameRunning) return;

    setSnake((currentSnake) => {
      const newSnake = [...currentSnake];
      const head = [...newSnake[0]];

      head[0] += direction[0];
      head[1] += direction[1];

      if (
        head[0] < 0 ||
        head[0] >= gridHeight ||
        head[1] < 0 ||
        head[1] >= gridWidth
      ) {
        setGameOver(true);
        setGameRunning(false);
        return currentSnake;
      }

      if (
        newSnake.some(
          (segment) => segment[0] === head[0] && segment[1] === head[1]
        )
      ) {
        setGameOver(true);
        setGameRunning(false);
        return currentSnake;
      }

      newSnake.unshift(head);

      if (head[0] === food[0] && head[1] === food[1]) {
        setScore((score) => score + 10);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameRunning, generateFood]);

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, 200);
    return () => clearInterval(gameInterval);
  }, [moveSnake]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameRunning) return;

      switch (e.key) {
        case "ArrowUp":
          if (direction[0] !== 1) setDirection([-1, 0]);
          break;
        case "ArrowDown":
          if (direction[0] !== -1) setDirection([1, 0]);
          break;
        case "ArrowLeft":
          if (direction[1] !== 1) setDirection([0, -1]);
          break;
        case "ArrowRight":
          if (direction[1] !== -1) setDirection([0, 1]);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction, gameRunning]);

  const startGame = () => {
    setSnake([[3, 3]]);
    setFood(generateFood());
    setDirection([0, 1]);
    setScore(0);
    setGameOver(false);
    setGameRunning(true);
  };

  const pauseGame = () => {
    setGameRunning(!gameRunning);
  };

  const gridCells = [];
  for (let i = 0; i < gridWidth * gridHeight; i++) {
    const row = Math.floor(i / gridWidth);
    const col = i % gridWidth;
    const isSnake = snake.some(
      (segment) => segment[0] === row && segment[1] === col
    );
    const isFood = food[0] === row && food[1] === col;
    const isHead = snake[0] && snake[0][0] === row && snake[0][1] === col;

    const getDirectionArrow = () => {
      if (!isHead) return "";
      const [dirY, dirX] = direction;
      if (dirY === -1) return "↑";
      if (dirY === 1) return "↓"; 
      if (dirX === -1) return "←"; 
      if (dirX === 1) return "→"; 
      return "→";
    };

    gridCells.push(
      <div
        key={i}
        className={`aspect-square flex items-center justify-center text-white font-bold ${
          isFood
            ? "bg-red-500"
            : isHead
            ? "bg-green-600"
            : isSnake
            ? "bg-green-400"
            : "bg-gray-100 dark:bg-gray-700"
        }`}
      >
        {isFood ? "🍎" : isHead ? getDirectionArrow() : ""}
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Snake Game
        </h3>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Score: {score}
          </span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={gameRunning ? pauseGame : startGame}
            className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            {gameRunning ? (
              <div className="w-[80px] flex items-center gap-2">
                <span>Pause</span> <Pause size={16} />
              </div>
            ) : (
              <div className="w-[80px] flex items-center gap-2 justify-center">
                <span>Start</span> <Play size={16} />
              </div>
            )}
          </motion.button>
        </div>
      </div>

      <div
        className="grid gap-0.5 bg-gray-300 dark:bg-gray-600 p-2 rounded-lg mb-4"
        style={{
          gridTemplateColumns: `repeat(${gridWidth}, minmax(0, 1fr))`,
          aspectRatio: `${gridWidth}/${gridHeight}`,
        }}
      >
        {gridCells}
      </div>

      {!gameRunning && !gameOver && (
        <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
          Use arrow keys to control the snake
        </p>
      )}

      <AnimatePresence>
        {gameOver && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center p-4 bg-red-100 dark:bg-red-900/30 rounded-lg"
          >
            <p className="text-red-800 dark:text-red-200 font-semibold">
              Game Over! Final Score: {score}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

type GameId = "memory" | "reaction" | "snake";

interface GameInfo {
  id: GameId;
  name: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  component: React.ComponentType;
  color: string;
  bgGradient: string;
}

export default function Games() {
  const [activeGame, setActiveGame] = useState<GameId>("memory");
  const gameDisplayRef = useRef<HTMLDivElement>(null);

  const handleGameSelect = (gameId: GameId) => {
    setActiveGame(gameId);

    setTimeout(() => {
      gameDisplayRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }, 100);
  };

  const allGames: GameInfo[] = [
    {
      id: "memory",
      name: "Memory",
      description: "Match pairs of cards",
      icon: Sparkles,
      component: MemoryGame,
      color: "text-purple-600",
      bgGradient: "from-purple-500 to-pink-500",
    },
    {
      id: "reaction",
      name: "Reaction",
      description: "Test your reflexes",
      icon: Zap,
      component: ReactionGame,
      color: "text-yellow-600",
      bgGradient: "from-yellow-500 to-orange-500",
    },
    {
      id: "snake",
      name: "Snake",
      description: "Classic arcade game",
      icon: Target,
      component: SnakeGame,
      color: "text-green-600",
      bgGradient: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section id="games" className="py-24 px-6 sm:px-8 lg:px-12" style={{ backgroundColor: 'var(--bg-coral)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <Gamepad2 className="text-primary mr-4" size={48} />
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Play a Game
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Take a break and have some fun!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:hidden">
            <div className="grid grid-cols-2 gap-4 mb-8">
              {allGames.map((game) => (
                <motion.div
                  key={game.id}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleGameSelect(game.id)}
                  className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 ${
                    activeGame === game.id
                      ? "ring-4 ring-blue-500 shadow-2xl"
                      : "shadow-lg hover:shadow-xl"
                  } ${game.id === "snake" ? "hidden md:block" : ""}`}
                >

                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${game.bgGradient} opacity-10`}
                  />

                  {activeGame === game.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute top-3 right-3 w-3 h-3 bg-blue-500 rounded-full"
                      transition={{ type: "spring", bounce: 0.3 }}
                    />
                  )}

                  <div className="relative p-6 bg-white dark:bg-gray-800 h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-br ${game.bgGradient} shadow-lg`}
                      >
                        <game.icon size={24} className="text-white" />
                      </div>
                      {activeGame === game.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center space-x-1 text-xs font-medium text-blue-600 dark:text-blue-400"
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                          <span>ACTIVE</span>
                        </motion.div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {game.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {game.description}
                      </p>

                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                        <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                          How to play:
                        </p>
                        <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                          {game.id === "memory" && (
                            <>
                              <p>• Click on cards to flip them over</p>
                              <p>
                                • Find matching pairs by remembering card
                                positions
                              </p>
                              <p>• Match all pairs to win the game</p>
                              <p>
                                • Try to complete it in as few moves as
                                possible!
                              </p>
                              <p className="text-purple-600 dark:text-purple-400 font-medium mt-1">
                                💡 Tip: Start by flipping cards in different
                                areas to learn the layout
                              </p>
                            </>
                          )}
                          {game.id === "reaction" && (
                            <>
                              <p>
                                • Click &apos;Start Emoji Challenge&apos; to
                                begin
                              </p>
                              <p>• Watch for the target emoji to appear</p>
                              <p>
                                • Click the matching emoji as fast as you can
                              </p>
                              <p>
                                • Complete 3 rounds to see your average reaction
                                time
                              </p>
                              <p className="text-yellow-600 dark:text-yellow-400 font-medium mt-1">
                                ⚡ Tip: Stay focused and don&apos;t click too
                                early - wait for the target!
                              </p>
                            </>
                          )}
                          {game.id === "snake" && (
                            <>
                              <p>• Click Play button to start the game</p>
                              <p>
                                • Use arrow keys (↑↓←→) to control the snake
                              </p>
                              <p>
                                • Eat red apples (🍎) to grow and score points
                              </p>
                              <p>
                                • Don&apos;t hit the walls or your own tail!
                              </p>
                              <p className="text-blue-600 dark:text-blue-400 font-medium mt-1">
                                🐍 Tip: Plan your path ahead and do not trap
                                yourself in corners
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r"
                      style={{
                        backgroundImage: `linear-gradient(to right, ${
                          game.bgGradient.includes("purple")
                            ? "#8B5CF6, #EC4899"
                            : game.bgGradient.includes("yellow")
                            ? "#F59E0B, #F97316"
                            : "#10B981, #059669"
                        })`,
                      }}
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div ref={gameDisplayRef} className="lg:col-span-8">
            {(() => {
              const ActiveGameComponent = allGames.find(
                (game) => game.id === activeGame
              )?.component;
              return ActiveGameComponent ? <ActiveGameComponent /> : null;
            })()}
          </div>

          <div className="hidden lg:block lg:col-span-4">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Choose a Game
              </h3>
              {allGames.map((game) => (
                <motion.div
                  key={game.id}
                  whileHover={{ scale: 1.02, x: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleGameSelect(game.id)}
                  className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 ${
                    activeGame === game.id
                      ? "ring-4 ring-blue-500 shadow-xl"
                      : "shadow-md hover:shadow-lg"
                  }`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${game.bgGradient} opacity-10`}
                  />

                  {activeGame === game.id && (
                    <motion.div
                      layoutId="activeIndicatorDesktop"
                      className="absolute top-3 right-3 w-3 h-3 bg-blue-500 rounded-full"
                      transition={{ type: "spring", bounce: 0.3 }}
                    />
                  )}

                  <div className="relative p-4 bg-white dark:bg-gray-800">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-2 rounded-lg bg-gradient-to-br ${game.bgGradient} shadow-md`}
                      >
                        <game.icon size={20} className="text-white" />
                      </div>

                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 dark:text-white">
                          {game.name}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          {game.description}
                        </p>

                        <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                          <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                            {game.id === "memory" && (
                              <>
                                <p>• Click cards to flip them</p>
                                <p>• Find matching pairs</p>
                                <p>• Match all pairs to win</p>
                                <p>• Aim for fewer moves</p>
                                <p className="text-purple-600 dark:text-purple-400 font-medium">
                                  💡 Spread out initial flips!
                                </p>
                              </>
                            )}
                            {game.id === "reaction" && (
                              <>
                                <p>
                                  • Click &apos;Start Challenge&apos; to begin
                                </p>
                                <p>• Wait for target emoji</p>
                                <p>• Click matching emoji fast</p>
                                <p>• Complete 3 rounds</p>
                                <p className="text-yellow-600 dark:text-yellow-400 font-medium">
                                  ⚡ Wait for the target!
                                </p>
                              </>
                            )}
                            {game.id === "snake" && (
                              <>
                                <p>• Click &quot;Start&quot; button to start</p>
                                <p>• Arrow keys (↑↓←→) to move</p>
                                <p>• Eat apples (🍎) to score</p>
                                <p>• Avoid walls and tail</p>
                                <p className="text-blue-600 dark:text-blue-400 font-medium">
                                  🐍 Plan ahead!
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {activeGame === game.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center space-x-1 text-xs font-medium text-blue-600 dark:text-blue-400"
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                          <span>ACTIVE</span>
                        </motion.div>
                      )}
                    </div>

                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r"
                      style={{
                        backgroundImage: `linear-gradient(to right, ${
                          game.bgGradient.includes("purple")
                            ? "#8B5CF6, #EC4899"
                            : game.bgGradient.includes("yellow")
                            ? "#F59E0B, #F97316"
                            : "#10B981, #059669"
                        })`,
                      }}
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
