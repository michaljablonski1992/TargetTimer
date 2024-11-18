import { createSlice } from '@reduxjs/toolkit';

export const DEFAULT_POSSIBLE_TIME = 5;
export const POSSIBLE_TIMES: number[] = [1, DEFAULT_POSSIBLE_TIME, 10, 20]; // possible target times in seconds

interface GameState {
  targetTime: number;
  startTime: number | null;
  stopTime: number | null;
  bestResults: Record<number, number | null>;
}

export const initialState: GameState = {
  targetTime: DEFAULT_POSSIBLE_TIME,
  startTime: null,
  stopTime: null,
  bestResults: Object.fromEntries(POSSIBLE_TIMES.map((item) => [item, null])),
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setTargetTime(state, action) {
      state.targetTime = action.payload;
    },
    startGame(state) {
      state.startTime = Date.now();
    },
    stopGame(state) {
      if (state.startTime && state.targetTime) {
        const stopTime = Date.now();
        state.stopTime = stopTime;
        const elapsed = (stopTime - state.startTime) / 1000; // in seconds
        const difference = Math.abs(state.targetTime - elapsed);

        // best results update
        if (
          state.bestResults[state.targetTime] === null ||
          difference < state.bestResults[state.targetTime]!
        ) {
          state.bestResults[state.targetTime] = difference;
        }
      }
    },
    resetGame(state) {
      state.startTime = null;
      state.stopTime = null;
    },
  },
});


export const gameSliceActions = gameSlice.actions;
export default gameSlice.reducer;