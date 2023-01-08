import { useCallback, useState } from 'react';
import './App.css';
import { Slider } from './Slider/Slider';

function App() {
  const [healthFactor, setHealthFactor] = useState<number>(2);
  const [isLoading, setIsLoading] = useState(false);

  // Dummy submit function
  // Sets loading state to true, waits a bit, sets it to false
  const handleSubmit = useCallback(async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  }, []);

  return (
    <div className='App'>
      <h1 style={{ marginTop: '-5rem', marginBottom: '5rem'}}>Health Factor Slider</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // prevent page reload
          handleSubmit();
        }}
      >
        <Slider
          aria-label={'Targeted Collateralization Ratio'}
          color='gradient'
          inverted
          disabled={isLoading}
          max={10.0}
          maxLabel='Safer'
          middleLabel={`New health factor: ${healthFactor}`}
          min={1.0}
          minLabel='Riskier'
          onValueChange={(value) => {
            setHealthFactor(Number(value));
          }}
          step={0.001}
          value={[healthFactor]}
        />
        <button
          type='submit'
          disabled={isLoading}
          style={{ marginTop: '5rem' }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
