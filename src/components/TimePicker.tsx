import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/hooks/useAppSelector';
import {
  setTargetTime,
  resetGame,
  POSSIBLE_TIMES,
  DEFAULT_POSSIBLE_TIME,
} from '../features/game/gameSlice';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { getAccuracy, getAward, humanSeconds } from '@/lib/utils';
import styles from './TimePicker.module.css';
import clsx from 'clsx';
import { TrophyIcon } from 'lucide-react';

const TimePicker = () => {
  const dispatch = useDispatch();
  const bestResults = useAppSelector((state) => state.game.bestResults);

  const handleTimeChange = (pt: number) => {
    dispatch(setTargetTime(pt));
    dispatch(resetGame());
  };

  return (
    <div className={styles.timepickerCnt}>
      <div className={styles.logoCnt}>
        <img
          src="/images/logo-transparent-compressed.png"
          alt="Logo image"
        ></img>
      </div>
      <ToggleGroup
        defaultValue={DEFAULT_POSSIBLE_TIME.toString()}
        className="customGroup absolute w-full h-full"
        variant="outline"
        type="single"
      >
        {POSSIBLE_TIMES.map((pt, idx) => {
          return (
            <PossibleTime
              key={pt}
              possibleTime={pt}
              idx={idx}
              bestResult={bestResults[pt]}
              handleTimeChange={handleTimeChange}
            />
          );
        })}
      </ToggleGroup>
    </div>
  );
};

interface PossibleTimeProps {
  possibleTime: number;
  idx: number;
  bestResult: number | null;
  handleTimeChange: (pt: number) => void;
}
const PossibleTime = ({
  possibleTime,
  idx,
  bestResult,
  handleTimeChange,
}: PossibleTimeProps) => {
  const accuracy = getAccuracy(possibleTime, bestResult);
  const award = getAward(accuracy);
  return (
    <div
      className={clsx(
        'flex flex-col gap-2 absolute',
        styles[`button-${idx + 1}`]
      )}
    >
      <ToggleGroupItem
        onClick={() => handleTimeChange(possibleTime)}
        value={possibleTime.toString()}
        className="w-40"
      >
        {humanSeconds(possibleTime).toUpperCase()}
      </ToggleGroupItem>
      <span className="flex gap-2">
        <span className="text-primary">
          Accuracy: {accuracy.toPrecision(2)}%
        </span>
        {award && <TrophyIcon className={styles[`trophy-${award}`]} />}
      </span>
    </div>
  );
};

export default TimePicker;
