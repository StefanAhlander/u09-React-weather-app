/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext, memo } from 'react';
import getWeatherDataAtLocation from './utils/getWeatherDataAtLocation';
import getWeatherList from './utils/getWeatherList';
import Day from './Day';

function Forecast() {
  const initialState = {
    isLoading: false,
    hasError: false,
    data: null,
  };

  const [state, setState] = useState(initialState);

  /*  function to get first the current coordinates and then, using the coordinates
      get the current weather at thet location.
   */

  // On component mount fetch data for the component, only once
  useEffect(() => {
    getWeatherDataAtLocation('forecast', state, setState);
  }, []);

  // destructure state to shorten render code
  const { hasError, isLoading, data } = state;
  let list = [];
  if (data) {
    list = getWeatherList(data);
  }
  // Render
  if (hasError) {
    return (
      <>
        <h3>Unfortunately there is an error:</h3>
        <p>{hasError}</p>
      </>
    );
  } else if (isLoading) {
    return <h1>Loading...</h1>;
  } else if (data !== null) {
    return (
      <>
        <h1>{data.city.name}</h1>
        {Object.keys(list).map((date) => (
          <Day key={date} date={date} list={list[date]} />
        ))}
      </>
    );
  } else {
    return <h1>Getting your location...</h1>;
  }
}

// use momo to prevent any unnessecary renders
export default memo(Forecast);
