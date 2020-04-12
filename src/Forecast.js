/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, memo } from 'react';
import getWeatherDataAtLocation from './utils/getWeatherDataAtLocation';
import getWeatherList from './utils/getWeatherList';
import Day from './Day';
import './Forecast.css';

function Forecast() {
  const initialState = {
    isLoading: false,
    hasError: false,
    data: null,
  };

  const [state, setState] = useState(initialState);

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
      <div className='Forecast card col-xs-11 col-sm-9 col-md-8 col-lg-6 col-xl-4 mx-auto mt-2'>
        <h1 className='card-header text-center'>{data.city.name}</h1>
        <div className='card-body'>
          {Object.keys(list).map((date) => (
            <Day key={date} date={date} list={list[date]} />
          ))}
        </div>
      </div>
    );
  } else {
    return <h1>Getting your location...</h1>;
  }
}

// use momo to prevent any unnessecary renders
export default memo(Forecast);
