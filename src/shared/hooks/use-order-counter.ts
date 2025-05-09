import { useState } from 'react';

export function useOrderCounter(initialValue: number) {
  const [counter, setCounter] = useState(initialValue);

  const handleAddition = () => {
    setCounter(() => counter + 1);
  };

  const handleSubstraction = () => {
    setCounter(() => counter - 1);
  };

  return { counter, handleAddition, handleSubstraction };
}
