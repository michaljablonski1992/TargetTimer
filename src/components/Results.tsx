import { useAppSelector } from '@/hooks/useAppSelector';
import { humanSeconds, roundTo } from '@/lib/utils';
import styles from './Results.module.css';
import clsx from 'clsx';

const Results = () => {
  const targetTime = useAppSelector(state => state.game.targetTime);
  const startTime = useAppSelector(state => state.game.startTime);
  const stopTime = useAppSelector(state => state.game.stopTime);
  const bestResults = useAppSelector(state => state.game.bestResults);

  const elapsedTime = stopTime && startTime ? ((stopTime - startTime) / 1000) : null;
  const difference = elapsedTime ? roundTo(targetTime - elapsedTime, 4) : null;

  return (
    <div className={clsx('text-primary flex justify-center gap-6 mt-10', styles.resultsCnt)}>
      {elapsedTime && (
        <>
          <p>Target time: {humanSeconds(targetTime)}</p>
          <p>Your time: {humanSeconds(elapsedTime, true)}</p>
          {difference && <p>Difference: {humanSeconds(difference, true)}</p>}
          <p>Best difference for {humanSeconds(targetTime)}: {bestResults[targetTime] ? humanSeconds(bestResults[targetTime], true) : '-'}</p>
        </>
      )}
    </div>
  );
};

export default Results;
