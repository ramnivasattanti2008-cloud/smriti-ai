import React, { useState, useEffect, useRef } from 'react';
import {
  Brain,
  Pause,
  Play,
  RotateCcw,
  ArrowLeft,
  Clock,
  Award,
} from 'lucide-react';
import { Button, Card, Badge, IconButton } from '../../components';
import { CardItem } from './CardItem';
import { ResultsScreen } from './ResultsScreen';
import { DIFFICULTY_CONFIG, generateDeck } from './config';
import { saveGameSession } from '../../services/gameService';
import type {
  GameDifficulty,
  GameCard,
  GameResult,
  GameSession,
} from '../../types';

export interface MemoryMatchProps {
  userId?: string;
  initialDifficulty?: GameDifficulty;
  onBackToDashboard: () => void;
}

export const MemoryMatch: React.FC<MemoryMatchProps> = ({
  userId = 'elder-user-1',
  initialDifficulty = 'easy',
  onBackToDashboard,
}) => {
  const [difficulty, setDifficulty] = useState<GameDifficulty>(initialDifficulty);
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'paused' | 'completed'>('setup');
  
  const [cards, setCards] = useState<GameCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [matchedPairsCount, setMatchedPairsCount] = useState(0);
  
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  
  const isCheckingRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  // Timer logic
  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = window.setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  const formatTimer = (totalSeconds: number): string => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startNewGame = (diff: GameDifficulty = difficulty) => {
    setDifficulty(diff);
    const deck = generateDeck(diff);
    setCards(deck);
    setSelectedCards([]);
    setMoves(0);
    setMistakes(0);
    setMatchedPairsCount(0);
    setTimerSeconds(0);
    setGameResult(null);
    setGameState('playing');
    isCheckingRef.current = false;
  };

  const handleCardClick = (clickedIndex: number) => {
    if (gameState !== 'playing') return;
    if (isCheckingRef.current) return;
    if (selectedCards.includes(clickedIndex)) return;
    if (cards[clickedIndex].matched || cards[clickedIndex].flipped) return;

    // Flip the clicked card
    const updatedCards = [...cards];
    updatedCards[clickedIndex].flipped = true;
    setCards(updatedCards);

    const newSelected = [...selectedCards, clickedIndex];
    setSelectedCards(newSelected);

    // If 2 cards flipped, evaluate match
    if (newSelected.length === 2) {
      isCheckingRef.current = true;
      setMoves((m) => m + 1);

      const [firstIdx, secondIdx] = newSelected;
      const firstCard = updatedCards[firstIdx];
      const secondCard = updatedCards[secondIdx];

      if (firstCard.pairId === secondCard.pairId) {
        // MATCH FOUND!
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c, idx) =>
              idx === firstIdx || idx === secondIdx
                ? { ...c, matched: true }
                : c
            )
          );
          setSelectedCards([]);
          isCheckingRef.current = false;

          const newMatchedCount = matchedPairsCount + 1;
          setMatchedPairsCount(newMatchedCount);

          // Check if game complete
          const totalPairs = DIFFICULTY_CONFIG[difficulty].pairCount;
          if (newMatchedCount === totalPairs) {
            handleGameCompletion(newMatchedCount, moves + 1, mistakes, timerSeconds);
          }
        }, 300);
      } else {
        // NO MATCH -> Flip back after delay & count mistake
        setMistakes((m) => m + 1);
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c, idx) =>
              idx === firstIdx || idx === secondIdx
                ? { ...c, flipped: false }
                : c
            )
          );
          setSelectedCards([]);
          isCheckingRef.current = false;
        }, 1000);
      }
    }
  };

  const handleGameCompletion = (
    pairs: number,
    finalMoves: number,
    finalMistakes: number,
    finalTime: number
  ) => {
    setGameState('completed');

    const totalPairs = DIFFICULTY_CONFIG[difficulty].pairCount;
    // Calculate simple game score (non-medical!)
    const calculatedScore = Math.max(
      10,
      totalPairs * 100 - finalMistakes * 15 - finalMoves * 5
    );

    const resultObj: GameResult = {
      score: calculatedScore,
      moves: finalMoves,
      mistakes: finalMistakes,
      durationFormatted: formatTimer(finalTime),
      pairsCompleted: pairs,
      totalPairs: totalPairs,
      difficulty,
    };
    setGameResult(resultObj);

    // Save session via service
    const sessionObj: GameSession = {
      id: `session-${Date.now()}`,
      userId,
      gameId: 'memory-match',
      gameTitle: 'Memory Match',
      difficulty,
      score: calculatedScore,
      moves: finalMoves,
      mistakes: finalMistakes,
      durationSeconds: finalTime,
      pairsCompleted: pairs,
      totalPairs,
      startedAt: new Date(Date.now() - finalTime * 1000).toISOString(),
      completedAt: new Date().toISOString(),
      completed: true,
    };

    saveGameSession(sessionObj);
  };

  // Render Setup Screen
  if (gameState === 'setup') {
    return (
      <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6 text-slate-100 animate-in fade-in duration-200">
        <Card className="p-6 sm:p-10 space-y-8 bg-slate-800/90 border-slate-700">
          <div className="flex items-center gap-4 border-b border-slate-700/80 pb-6">
            <div className="p-3.5 bg-teal-950/80 border border-teal-700/80 text-teal-400 rounded-2xl">
              <Brain className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-white">
                Memory Match
              </h1>
              <p className="text-base text-slate-300 mt-1">
                Match the pairs of friendly cards at your own pace.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-100">
              Select Difficulty:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(['easy', 'medium', 'hard'] as GameDifficulty[]).map((d) => {
                const conf = DIFFICULTY_CONFIG[d];
                const isSelected = difficulty === d;
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDifficulty(d)}
                    className={`p-5 rounded-2xl border-2 text-left transition-all select-none min-h-[96px] ${
                      isSelected
                        ? 'bg-teal-950/80 border-teal-400 text-white shadow-lg shadow-teal-950/40 ring-2 ring-teal-400/30'
                        : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <span className="text-lg font-bold block">{conf.label}</span>
                    <span className="text-sm text-slate-300 mt-1 block">
                      {conf.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-700/80">
            <Button
              variant="secondary"
              leftIcon={<ArrowLeft className="w-6 h-6" />}
              onClick={onBackToDashboard}
            >
              Back to Dashboard
            </Button>
            <Button
              variant="primary"
              size="lg"
              leftIcon={<Play className="w-6 h-6" />}
              onClick={() => startNewGame(difficulty)}
            >
              Start Game
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Render Completion Screen
  if (gameState === 'completed' && gameResult) {
    return (
      <ResultsScreen
        result={gameResult}
        onPlayAgain={() => startNewGame(difficulty)}
        onBackToActivities={onBackToDashboard}
      />
    );
  }

  const currentConfig = DIFFICULTY_CONFIG[difficulty];

  // Render Playing / Paused Screen
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6 text-slate-100 animate-in fade-in duration-200">
      {/* Game Header Bar */}
      <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 sm:p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <IconButton
            icon={<ArrowLeft className="w-6 h-6" />}
            ariaLabel="Back to setup"
            variant="ghost"
            onClick={() => setGameState('setup')}
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                Memory Match
              </h1>
              <Badge variant="info">{currentConfig.label}</Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              Find the matching pairs. Take your time!
            </p>
          </div>
        </div>

        {/* Live Metrics */}
        <div className="flex items-center gap-3 sm:gap-6 bg-slate-900/90 border border-slate-700 px-4 py-2 rounded-xl text-center">
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase block">
              Time
            </span>
            <span className="text-base sm:text-lg font-bold text-sky-400 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {formatTimer(timerSeconds)}
            </span>
          </div>
          <div className="w-px h-8 bg-slate-800" />
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase block">
              Moves
            </span>
            <span className="text-base sm:text-lg font-bold text-slate-100">
              {moves}
            </span>
          </div>
          <div className="w-px h-8 bg-slate-800" />
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase block">
              Pairs
            </span>
            <span className="text-base sm:text-lg font-bold text-emerald-400 flex items-center gap-1">
              <Award className="w-4 h-4" />
              {matchedPairsCount}/{currentConfig.pairCount}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <IconButton
            icon={gameState === 'paused' ? <Play className="w-5 h-5 text-emerald-400" /> : <Pause className="w-5 h-5 text-amber-400" />}
            ariaLabel={gameState === 'paused' ? 'Resume Game' : 'Pause Game'}
            variant="secondary"
            onClick={() => setGameState((s) => (s === 'playing' ? 'paused' : 'playing'))}
          />
          <IconButton
            icon={<RotateCcw className="w-5 h-5" />}
            ariaLabel="Restart Game"
            variant="secondary"
            onClick={() => startNewGame(difficulty)}
          />
        </div>
      </div>

      {/* Paused Overlay Notice */}
      {gameState === 'paused' && (
        <Card className="bg-amber-950/80 border-amber-700 text-center p-6 space-y-3">
          <h3 className="text-2xl font-bold text-amber-200">Game Paused</h3>
          <p className="text-base text-amber-300">
            Take a pause. Whenever you are ready, tap Resume to continue.
          </p>
          <Button
            variant="primary"
            leftIcon={<Play className="w-5 h-5" />}
            onClick={() => setGameState('playing')}
            className="mx-auto"
          >
            Resume Game
          </Button>
        </Card>
      )}

      {/* Card Grid */}
      <div
        className={`grid ${currentConfig.gridCols} gap-4 sm:gap-6 ${
          gameState === 'paused' ? 'opacity-30 pointer-events-none' : ''
        }`}
      >
        {cards.map((card, idx) => (
          <CardItem
            key={card.id}
            card={card}
            index={idx}
            onClick={() => handleCardClick(idx)}
            disabled={isCheckingRef.current}
          />
        ))}
      </div>
    </div>
  );
};
