import './App.css';
import TimePicker from './components/TimePicker';
import Results from './components/Results';
import GameControls from './components/GameControls';

function App() {
  return (
    <div className='flex flex-col'>
      <TimePicker />
      <GameControls />
      <Results />
    </div>
  );
}

export default App;
