/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext, memo } from 'react';
import { DegreesContext } from './contexts/weather.context';
import getTemp from './utils/getTemp';
import getWeatherDataAtLocation from './utils/getWeatherDataAtLocation';

function Home() {
  // get current state for isCelsius for conversion to the correct degrees
  const { isCelsius } = useContext(DegreesContext);

  const initialState = {
    isLoading: false,
    hasError: false,
    data: null,
  };

  const [state, setState] = useState(initialState);

  // On component mount fetch data for the component, only once
  useEffect(() => {
    getWeatherDataAtLocation('weather', state, setState);
  }, []);

  // destructure state to shorten render code
  const { hasError, isLoading, data } = state;

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
        <h1>{data.name}</h1>
        <p>{data.weather[0].description}</p>
        <img
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
          alt={data.weather[0].description}
        />
        <h3>
          {getTemp(data.main.temp, isCelsius)} °{isCelsius ? 'C' : 'F'}
        </h3>
        <p>
          Wind: <span>{data.wind.speed} m/s, </span>
          <span>{data.wind.deg}°</span>
        </p>
        <p>Humidity: {data.main.humidity} %</p>
        <p>Sunrise: {new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
        <p>Sunset: {new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
      </>
    );
  } else {
    return <h1>Getting your location...</h1>;
  }
}

// use momo to prevent any unnessecary renders
export default memo(Home);
