export function calculateEMA(
  latest: number,
  previous?: number,
  alpha = 0.7
): number {
  if (latest !== undefined && previous !== undefined) {
    return Math.round((alpha * latest + (1 - alpha) * previous) * 10) / 10;
  } else if (latest !== undefined) {
    return latest;
  } else {
    return 60.0;
  }
}

export function getDifficultyDistribution(
  ema: number | null,
  totalQuestions: number
) {
  let easy = 0,
    medium = 0,
    hard = 0;
  if (ema === null) {
    easy = Math.round(totalQuestions * 0.33);
    medium = Math.round(totalQuestions * 0.33);
    hard = totalQuestions - easy - medium;
  } else if (ema < 50) {
    easy = Math.round(totalQuestions * 0.5);
    medium = Math.round(totalQuestions * 0.3);
    hard = totalQuestions - easy - medium;
  } else if (ema < 75) {
    easy = Math.round(totalQuestions * 0.2);
    medium = Math.round(totalQuestions * 0.4);
    hard = totalQuestions - easy - medium;
  } else {
    easy = Math.round(totalQuestions * 0.2);
    medium = Math.round(totalQuestions * 0.3);
    hard = totalQuestions - easy - medium;
  }
  return { easy, medium, hard };
}
