/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext, memo } from 'react';
import { DegreesContext } from './contexts/weather.context';
import getTemp from './utils/getTemp';
import getWeatherDataAtLocation from './utils/getWeatherDataAtLocation';
import './Home.css';
import arrow from './img/arrow.png';

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
      <div className='Home card col-xs-11 col-sm-8 col-md-6 col-lg-4 mx-auto mt-2'>
        <h1 className='card-header text-center'>{data.name}</h1>
        <div className='card-body'>
          <h3 className='card-subtitle text-center'>
            {data.weather[0].description}
          </h3>
          <div className='temp-img my-3'>
            <h2>
              {getTemp(data.main.temp, isCelsius)} °{isCelsius ? 'C' : 'F'}
            </h2>
            <span className='img-container'>
              <img
                className='card-img-right'
                src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                alt={data.weather[0].description}
              />
            </span>
          </div>
          <ul className='list-group list-group-flush text-center'>
            <li className='list-group-item'>
              Wind: <span>{data.wind.speed} m/s </span>
              <span>
                <img
                  style={{
                    height: '1.5rem',
                    marginLeft: '1rem',
                    transform: `rotate(${data.wind.deg}deg)`,
                  }}
                  src={arrow}
                  alt={`${data.wind.deg}°`}
                />
              </span>
            </li>
            <li className='list-group-item'>
              Humidity: {data.main.humidity} %
            </li>
            <li className='list-group-item'>
              Sunrise: {new Date(data.sys.sunrise * 1000).toLocaleTimeString()}
            </li>
            <li className='list-group-item'>
              Sunset: {new Date(data.sys.sunset * 1000).toLocaleTimeString()}
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return <h1>Getting your location...</h1>;
  }
}

// use momo to prevent any unnessecary renders
export default memo(Home);
