import React, { createContext } from 'react';
import degreesReducer from '../reducers/degreesReducer.js';
import useLocalStorageReducer from '../hooks/useLocalStorageReducer';

export const DegreesContext = createContext();

export function WeatherProvider(props) {
  const [isCelsius, toggleIsCelsius] = useLocalStorageReducer(
    'isCelsius',
    true,
    degreesReducer
  );

  return (
    <DegreesContext.Provider value={{ isCelsius, toggleIsCelsius }}>
      {props.children}
    </DegreesContext.Provider>
  );
}
