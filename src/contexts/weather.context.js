import React, { createContext } from 'react';
import reducer from '../reducers/reducer.js';
import useLocalStorageReducer from '../hooks/useLocalStorageReducer';

export const WeatherContext = createContext();

export function WeatherProvider(props) {
  const defaultValue = {
    isCelsius: true,
    locationCity: 'Stockholm',
    locationCountry: 'se',
  };
  const [state, dispatch] = useLocalStorageReducer(
    'weather',
    defaultValue,
    reducer
  );

  return (
    <WeatherContext.Provider value={{ state, dispatch }}>
      {props.children}
    </WeatherContext.Provider>
  );
}
