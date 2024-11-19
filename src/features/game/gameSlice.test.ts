import gameReducer, {
  initialState,
  setTargetTime,
  startGame,
  stopGame,
  resetGame,
  DEFAULT_POSSIBLE_TIME,
} from './gameSlice';

describe('gameSlice reducer', () => {
  const reducerInitialState = { ...initialState };
  it('should handle initial state', () => {
    expect(gameReducer(undefined, { type: '@@INIT' })).toEqual(
      reducerInitialState
    );
  });

  it('should handle setTargetTime', () => {
    const nextState = gameReducer(reducerInitialState, setTargetTime(10));
    expect(nextState.targetTime).toBe(10);
  });

  it('should handle startGame', () => {
    const mockStartTime = 1630000000000; // Mock timestamp
    jest.spyOn(Date, 'now').mockImplementation(() => mockStartTime);

    const nextState = gameReducer(reducerInitialState, startGame());
    expect(nextState.startTime).toBe(mockStartTime);
    jest.restoreAllMocks();
  });

  it('should handle stopGame and update best results', () => {
    const mockStartTime = 1630000000000;
    const mockStopTime = 1630000005000; // 5 seconds later
    const stateWithStartTime = {
      ...reducerInitialState,
      startTime: mockStartTime,
      targetTime: 5,
    };

    jest.spyOn(Date, 'now').mockImplementation(() => mockStopTime);

    const nextState = gameReducer(stateWithStartTime, stopGame());
    const elapsed = (mockStopTime - mockStartTime) / 1000; // 5 seconds
    const difference = Math.abs(stateWithStartTime.targetTime - elapsed);

    expect(nextState.stopTime).toBe(mockStopTime);
    expect(nextState.bestResults[DEFAULT_POSSIBLE_TIME]).toBe(difference);
    jest.restoreAllMocks();
  });

  it('should not update best result if current result is worse', () => {
    const mockStartTime = 1630000000000; // Mock timestamp
    const mockStopTime = 1630000005600; // 0.6 seconds later

    const startState = {
      ...reducerInitialState,
      startTime: mockStartTime,
      bestResults: {
        ...reducerInitialState.bestResults,
        [DEFAULT_POSSIBLE_TIME]: 0.5,
      },
    };

    const dateNowSpy = jest
      .spyOn(Date, 'now')
      .mockImplementation(() => mockStopTime);

    const nextState = gameReducer(startState, stopGame());
    const elapsedTime = (mockStopTime - mockStartTime) / 1000; // 10 seconds

    expect(nextState.bestResults[DEFAULT_POSSIBLE_TIME]).toBe(0.5); // Best result remains unchanged

    dateNowSpy.mockRestore();
  });

  it('should update best result if current result is better', () => {
    const mockStartTime = 1630000000000; // Mock timestamp
    const mockStopTime = 1630000005100; // 0.1 seconds after

    const startState = {
      ...reducerInitialState,
      startTime: mockStartTime,
      bestResults: {
        ...reducerInitialState.bestResults,
        [DEFAULT_POSSIBLE_TIME]: 4,
      },
    };

    const dateNowSpy = jest
      .spyOn(Date, 'now')
      .mockImplementation(() => mockStopTime);

    const nextState = gameReducer(startState, stopGame());
    const elapsedTime = (mockStopTime - mockStartTime) / 1000; // 10 seconds
    const difference = Math.abs(initialState.targetTime - elapsedTime);

    expect(nextState.bestResults[DEFAULT_POSSIBLE_TIME]).toBe(difference); // Best result should be changed

    dateNowSpy.mockRestore();
  });

  it('should handle resetGame', () => {
    const modifiedState = {
      ...reducerInitialState,
      startTime: 1630000000000,
      stopTime: 1630000005000,
    };

    const nextState = gameReducer(modifiedState, resetGame());
    expect(nextState.startTime).toBeNull();
    expect(nextState.stopTime).toBeNull();
  });
});
