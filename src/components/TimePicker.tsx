import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/hooks/useAppSelector';
import {
  setTargetTime,
  resetGame,
  POSSIBLE_TIMES,
  DEFAULT_POSSIBLE_TIME,
} from '../features/game/gameSlice';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { getAccuracy, getAward, humanSeconds, roundTo } from '@/lib/utils';
import styles from './TimePicker.module.css';
import clsx from 'clsx';
import { TrophyIcon } from 'lucide-react';
import { MouseEvent, useState } from 'react';

const TimePicker = () => {
  const dispatch = useDispatch();
  const bestResults = useAppSelector((state) => state.game.bestResults);
  const [timeSelected, setTimeSelected] = useState<string>(
    DEFAULT_POSSIBLE_TIME.toString()
  );

  const handleTimeChange = (value: string) => {
    // prevent deselect
    if (value === '') {
      return;
    }

    dispatch(setTargetTime(value));
    setTimeSelected(value);
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
        onValueChange={handleTimeChange}
        defaultValue={timeSelected}
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
              timeSelected={timeSelected}
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
  timeSelected: string;
}
const PossibleTime = ({
  possibleTime,
  idx,
  bestResult,
  timeSelected,
}: PossibleTimeProps) => {
  const accuracy = getAccuracy(possibleTime, bestResult);
  const award = getAward(accuracy);

  const preventDeselect = (e: MouseEvent<HTMLButtonElement>) => {
    // prevent deselect
    if (possibleTime.toString() === timeSelected) {
      e.preventDefault();
    }
  };

  return (
    <div
      className={clsx(
        'flex flex-col gap-2 absolute',
        styles[`button-${idx + 1}`]
      )}
    >
      <ToggleGroupItem
        onClick={preventDeselect}
        value={possibleTime.toString()}
        className="w-40"
      >
        {humanSeconds(possibleTime).toUpperCase()}
      </ToggleGroupItem>
      <div>
        <span className="flex gap-2">
          <span className="text-primary">
            Accuracy: {roundTo(accuracy, 2)}%
          </span>
          {award && <TrophyIcon className={styles[`trophy-${award}`]} />}
        </span>
        <span className="text-primary">
          Best: {bestResult ? humanSeconds(bestResult, true) : '-'}
        </span>
      </div>
    </div>
  );
};

export default TimePicker;
