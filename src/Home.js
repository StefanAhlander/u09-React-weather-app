/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext, memo } from 'react';
import { DegreesContext } from './contexts/weather.context';
import { BASE_URL, API_KEY } from './app-config';
import getTemp from './utils/getTemp';
import getPosition from './utils/getPosition';
import fetchData from './utils/fetchData';

function Home() {
  // get current state for isCelsius for conversion to the correct degrees
  const { isCelsius } = useContext(DegreesContext);

  const initialState = {
    isLoading: false,
    hasError: false,
    data: null,
  };

  const [state, setState] = useState(initialState);

  /*  function to get first the current coordinates and then, using the coordinates
      get the current weather at thet location.
   */
  async function getWeatherData() {
    try {
      const {
        coords: { latitude: lat },
        coords: { longitude: lon },
      } = await getPosition();

      setState({
        ...state,
        isLoading: true,
      });

      const data = await fetchData(
        `${BASE_URL}weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );

      setState({
        ...state,
        isLoading: false,
        data: data,
      });
      // catch any errors getting coordinates or weather data
    } catch (error) {
      console.error(error);
      setState({
        ...state,
        isLoading: false,
        hasError: `Unfortunately there is an error: ${error}`,
      });
    }
  }

  // On component mount fetch data for the component, only once
  useEffect(() => {
    getWeatherData();
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
