import React, { createContext } from 'react';
import degreesReducer from '../reducers/degreesReducer.js';
import favouritesReducer from '../reducers/favouritesReducer.js';
import useLocalStorageReducer from '../hooks/useLocalStorageReducer';

export const DegreesContext = createContext();
export const FavouritesContext = createContext();

export function WeatherProvider(props) {
  const [isCelsius, toggleIsCelsius] = useLocalStorageReducer(
    'isCelsius',
    true,
    degreesReducer
  );

  const [favourites, dispatchFavourites] = useLocalStorageReducer(
    'favourites',
    [],
    favouritesReducer
  );

  return (
    <DegreesContext.Provider value={{ isCelsius, toggleIsCelsius }}>
      <FavouritesContext.Provider value={{ favourites, dispatchFavourites }}>
        {props.children}
      </FavouritesContext.Provider>
    </DegreesContext.Provider>
  );
}
