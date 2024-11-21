import { useDispatch } from 'react-redux';
import { useAppSelector } from '../hooks/useAppSelector';
import {
  setTargetTime,
  resetGame,
  POSSIBLE_TIMES,
  startGame,
  stopGame,
} from '../features/game/gameSlice';
import { ToggleGroup, ToggleGroupItem } from '../components/ui/toggle-group';
import { motion } from 'framer-motion';
import { getAccuracy, getAward, humanSeconds, roundTo } from '../lib/utils';
import styles from './GameBoard.module.css';
import clsx from 'clsx';
import { CrosshairIcon, EyeIcon, TrophyIcon } from 'lucide-react';
import { MouseEvent, useState } from 'react';
import { Button } from './ui/button';
import Results from './Results';
import RevealText from './shared/animations/RevealText';

// Extend Framer Motion to recognize ShadCN's components
const MotionButton = motion(Button);
const MotionToggleGroupItem = motion(ToggleGroupItem);
// For reloading animation
const ammoVariants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: (i: number) => ({
    scaleY: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      delay: i * 0.2, // Stagger effect for each "ammo"
    },
  }),
};

const GameBoard = () => {
  const dispatch = useDispatch();
  const bestResults = useAppSelector((state) => state.game.bestResults);
  const startTime = useAppSelector((state) => state.game.startTime);
  const stopTime = useAppSelector((state) => state.game.stopTime);
  const targetTime = useAppSelector((state) => state.game.targetTime);
  const [reloadingTargetTime, setReloadingTargetTime] = useState<string | null>(
    null
  );
  const isReloading = !!reloadingTargetTime;
  const aiming = startTime && !stopTime;
  const [timeSelected, setTimeSelected] = useState<string>(
    targetTime.toString()
  );

  let reloadingTimeoutId: NodeJS.Timeout;
  const handleTimeChange = (value: string) => {
    // prevent deselect
    if (value === '') {
      return;
    }
    dispatch(resetGame());
    setReloadingTargetTime(value);
    clearTimeout(reloadingTimeoutId);
    // Simulate ammo load completion
    reloadingTimeoutId = setTimeout(() => {
      setReloadingTargetTime(null);
      dispatch(setTargetTime(value));
      setTimeSelected(value);
    }, 1600);
  };

  return (
    <div className={styles.GameBoardCnt}>
      <div className={styles.logoCnt}>
        <img
          src="/images/logo-transparent-compressed.png"
          alt="Logo image"
        ></img>
      </div>
      <ToggleGroup
        onValueChange={handleTimeChange}
        defaultValue={timeSelected}
        className={clsx(
          'customGroup absolute lg:w-full lg:h-full flex flex-wrap gap-6',
          styles.timesGroup
        )}
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
              reloadingTargetTime={reloadingTargetTime}
              targetTimeReloading={isReloading}
            />
          );
        })}
      </ToggleGroup>
      <div className={styles.btnActionCnt}>
        {!aiming && (
          <MotionButton
            whileHover={{ scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 200 }}
            onClick={() => dispatch(startGame())}
            disabled={isReloading}
          >
            <EyeIcon />
            AIM
          </MotionButton>
        )}
        {aiming && (
          <MotionButton
            className={clsx(
              'bg-destructive hover:bg-red-600 hover:opacity-90',
              styles.fireBtn
            )}
            onClick={() => dispatch(stopGame())}
          >
            <CrosshairIcon />
            FIRE!
          </MotionButton>
        )}
      </div>
      <Results />
    </div>
  );
};

interface PossibleTimeProps {
  possibleTime: number;
  idx: number;
  bestResult: number | null;
  timeSelected: string;
  reloadingTargetTime: string | null;
  targetTimeReloading: boolean;
}
const PossibleTime = ({
  possibleTime,
  idx,
  bestResult,
  timeSelected,
  reloadingTargetTime,
  targetTimeReloading,
}: PossibleTimeProps) => {
  const accuracy = getAccuracy(possibleTime, bestResult);
  const award = getAward(accuracy);
  const isReloading = reloadingTargetTime === possibleTime.toString();

  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    // prevent deselect
    if (possibleTime.toString() === timeSelected || isReloading) {
      e.preventDefault();
    }
  };

  return (
    <div
      className={clsx(
        'flex flex-col static lg:absolute gap-3',
        styles[`button-${idx + 1}`]
      )}
    >
      <div className="button-cnt">
        <MotionToggleGroupItem
          onClick={handleOnClick}
          value={possibleTime.toString()}
          disabled={targetTimeReloading}
          className="w-52"
        >
          {isReloading
            ? 'RELOADING...'
            : humanSeconds(possibleTime).toUpperCase()}
        </MotionToggleGroupItem>
      </div>
      {/* Ammo Indicators */}
      <div className={`flex gap-2 mt-1 ${isReloading ? '' : 'hidden'}`}>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            className="w-4 h-10 bg-primary rounded-md"
            initial="hidden"
            animate={isReloading ? 'visible' : 'hidden'}
            variants={ammoVariants}
          />
        ))}
      </div>
      {/* Results info */}
      {!isReloading && (
        <div>
          <span className="flex gap-2">
            <span className="text-primary">
              <RevealText
                key={`${possibleTime}-accuracy-${accuracy}`}
                text={`Accuracy: ${roundTo(accuracy, 2)}%`}
              />
            </span>
            {award && (
              <motion.span
                key={`${possibleTime}-${award}`}
                initial={{ scale: 0.5 }}
                animate={{ scale: [0.5, 3, 1] }}
                transition={{ type: 'spring', stiffness: 700 }}
              >
                <TrophyIcon className={styles[`trophy-${award}`]} />
              </motion.span>
            )}
          </span>
          <span className="text-primary">
            <RevealText
              key={`${possibleTime}-bestResult-${bestResult}`}
              text={`Best: ${
                bestResult !== null ? humanSeconds(bestResult, true) : '-'
              }`}
            />
          </span>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
