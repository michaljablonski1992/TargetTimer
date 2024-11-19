import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/hooks/useAppSelector';
import {
  startGame,
  stopGame,
  resetGame,
} from '../features/game/gameSlice';
import { Button } from './ui/button';
import { CrosshairIcon, EyeIcon } from 'lucide-react';

const GameControls = () => {
  const dispatch = useDispatch();
  const startTime = useAppSelector(state => state.game.startTime);
  const stopTime = useAppSelector(state => state.game.stopTime);
  const aiming = startTime && !stopTime;

  return (
    <div className='flex justify-center gap-6'>
      {!aiming && <Button className='w-32' onClick={() => dispatch(startGame())}><EyeIcon />AIM</Button> }
      {aiming && <Button className='bg-destructive hover:bg-red-600 w-32' onClick={() => dispatch(stopGame())}><CrosshairIcon />FIRE!</Button>}
      <Button className='bg-secondary' onClick={() => dispatch(resetGame())}>RESET</Button>
    </div>
  );
};

export default GameControls;
