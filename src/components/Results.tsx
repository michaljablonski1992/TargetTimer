import { useAppSelector } from '@/hooks/useAppSelector';
import { humanSeconds } from '@/lib/utils';

const Results = () => {
  const targetTime = useAppSelector(state => state.game.targetTime);
  const startTime = useAppSelector(state => state.game.startTime);
  const stopTime = useAppSelector(state => state.game.stopTime);
  const bestResults = useAppSelector(state => state.game.bestResults);

  const elapsedTime = stopTime && startTime ? ((stopTime - startTime) / 1000) : null;
  const difference = elapsedTime ? Math.abs(targetTime - elapsedTime) : null;

  return (
    <div className='text-primary flex justify-center gap-6'>
      {elapsedTime && (
        <>
          <p>Target time: {humanSeconds(targetTime)}</p>
          <p>Your time: {humanSeconds(elapsedTime, true)}</p>
          {difference && <p>Difference: {humanSeconds(difference, true)}</p>}
          <p>Best result for {humanSeconds(targetTime)}: {bestResults[targetTime] ? humanSeconds(bestResults[targetTime], true) : 'None'}</p>
        </>
      )}
    </div>
  );
};

export default Results;
