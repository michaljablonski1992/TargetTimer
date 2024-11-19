import { useAppSelector } from '@/hooks/useAppSelector';

const TimerDisplay = () => {
  const targetTime = useAppSelector(state => state.game.targetTime);
  const startTime = useAppSelector(state => state.game.startTime);
  const stopTime = useAppSelector(state => state.game.stopTime);

  const elapsedTime = stopTime && startTime ? ((stopTime - startTime) / 1000).toFixed(3) : null;

  return (
    <div>
      <p>Target time: {targetTime} seconds</p>
      {elapsedTime && <p>Your time: {elapsedTime} seconds</p>}
    </div>
  );
};

export default TimerDisplay;
