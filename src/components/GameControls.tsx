import { useDispatch } from 'react-redux';
import {
  setTargetTime,
  startGame,
  stopGame,
  resetGame,
  POSSIBLE_TIMES,
  DEFAULT_POSSIBLE_TIME
} from '../features/game/gameSlice';
import { Button } from './ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const GameControls = () => {
  const dispatch = useDispatch();

  const handleTimeChange = (pt: number) => {
    dispatch(setTargetTime(pt));
    dispatch(resetGame());
  };

  return (
    <div>
      <ToggleGroup defaultValue={DEFAULT_POSSIBLE_TIME.toString()} type="single">
        {POSSIBLE_TIMES.map((pt) => {
          return (
            <ToggleGroupItem onClick={() => handleTimeChange(pt)} value={pt.toString()}>
              {pt}
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
      <Button onClick={() => dispatch(startGame())}>Start</Button>
      <Button onClick={() => dispatch(stopGame())}>Stop</Button>
      <Button onClick={() => dispatch(resetGame())}>Reset</Button>
    </div>
  );
};

export default GameControls;
