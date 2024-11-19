import './App.css';
import GameControls from './components/GameControls';
import Results from './components/Results';
import TimerDisplay from './components/TimerDisplay';

function App() {
  return (
    <>
      <GameControls />
      <TimerDisplay />
      <Results />
    </>
  );
}

export default App;
