import { roundTo } from '../../lib/utils';
import { createSlice } from '@reduxjs/toolkit';

export const DEFAULT_POSSIBLE_TIME = 5;
export const POSSIBLE_TIMES: number[] = [
  1,
  DEFAULT_POSSIBLE_TIME,
  7,
  10,
  15,
  20,
]; // possible target times in seconds

interface GameState {
  targetTime: number;
  startTime: number | null;
  stopTime: number | null;
  bestResults: Record<number, number | null>;
}

const localBestResults = localStorage.getItem('bestResults');
const localTargetTime = Number(localStorage.getItem('targetTime'));
export const initialState: GameState = {
  targetTime: localTargetTime || DEFAULT_POSSIBLE_TIME,
  startTime: null,
  stopTime: null,
  bestResults:
    (localBestResults && JSON.parse(localBestResults)) ||
    Object.fromEntries(POSSIBLE_TIMES.map((item) => [item, null])),
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setTargetTime(state, action) {
      state.targetTime = action.payload;
      localStorage.setItem('targetTime', state.targetTime.toString());
    },
    startGame(state) {
      state.startTime = Date.now();
      state.stopTime = null;
    },
    stopGame(state) {
      if (state.startTime && state.targetTime) {
        const stopTime = Date.now();
        state.stopTime = stopTime;
        const elapsed = (stopTime - state.startTime) / 1000; // in seconds
        const difference = roundTo(state.targetTime - elapsed, 4);

        // best results update
        if (
          difference >= 0 &&
          (state.bestResults[state.targetTime] === null ||
            difference < state.bestResults[state.targetTime]!)
        ) {
          state.bestResults[state.targetTime] = difference;
          localStorage.setItem(
            'bestResults',
            JSON.stringify(state.bestResults)
          );
        }
      }
    },
    resetGame(state) {
      state.startTime = null;
      state.stopTime = null;
    },
  },
});

export const { setTargetTime, startGame, stopGame, resetGame } =
  gameSlice.actions;
export default gameSlice.reducer;
