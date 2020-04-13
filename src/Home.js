/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext, memo } from 'react';
import { Link } from 'react-router-dom';
import { DegreesContext } from './contexts/weather.context';
import getWeatherDataAtLocation from './utils/getWeatherDataAtLocation';
import CurrentWeather from './CurrentWeather';
import DisplayPanel from './DisplayPanel';

function Home() {
  // get current state for isCelsius for conversion to the correct degrees
  const { isCelsius } = useContext(DegreesContext);

  const initialState = {
    isLoading: false,
    hasError: false,
    data: null,
  };

  const [currentWeather, setCurrentWeather] = useState(initialState);

  // On component mount fetch data for the component, only once
  useEffect(() => {
    getWeatherDataAtLocation('weather', currentWeather, setCurrentWeather);
  }, []);

  // destructure state to shorten render code
  const { hasError, isLoading, data } = currentWeather;

  // Render
  if (hasError) {
    return (
      <DisplayPanel>
        <h3 className='text-center'>Unfortunately there is an error:</h3>
        <p className='text-center'>{hasError}</p>
        <Link to='/'>Reset</Link>
      </DisplayPanel>
    );
  } else if (isLoading) {
    return (
      <DisplayPanel>
        <h1 className='text-center'>Loading...</h1>
      </DisplayPanel>
    );
  } else if (data !== null) {
    return (
      <DisplayPanel>
        <CurrentWeather isCelsius={isCelsius} data={data} />
      </DisplayPanel>
    );
  } else {
    return (
      <DisplayPanel>
        <h1 className='text-center'>Getting your location...</h1>
      </DisplayPanel>
    );
  }
}

// use momo to prevent any unnessecary renders
export default memo(Home);
