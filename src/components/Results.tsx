import { useAppSelector } from '@/hooks/useAppSelector';

const Results = () => {
  const targetTime = useAppSelector(state => state.game.targetTime);
  const startTime = useAppSelector(state => state.game.startTime);
  const stopTime = useAppSelector(state => state.game.stopTime);
  const bestResults = useAppSelector(state => state.game.bestResults);

  const elapsedTime = stopTime && startTime ? ((stopTime - startTime) / 1000) : null;
  const difference = elapsedTime ? Math.abs(targetTime - elapsedTime).toFixed(3) : null;

  return (
    <div>
      {elapsedTime && (
        <>
          <p>Difference: {difference} seconds</p>
          <p>Best result for {targetTime} seconds: {bestResults[targetTime] ? bestResults[targetTime].toFixed(3) : 'None'}</p>
        </>
      )}
    </div>
  );
};

export default Results;
