/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, memo } from 'react';
import getWeatherDataAtLocation from './utils/getWeatherDataAtLocation';
import getWeatherList from './utils/getWeatherList';
import Day from './Day';
import DisplayPanel from './DisplayPanel';
import CardHeader from './CardHeader';
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
      <DisplayPanel>
        <h3>Unfortunately there is an error:</h3>
        <p>{hasError}</p>
      </DisplayPanel>
    );
  } else if (isLoading) {
    return (
      <DisplayPanel>
        <h1>Loading...</h1>
      </DisplayPanel>
    );
  } else if (data !== null) {
    return (
      <DisplayPanel>
        <CardHeader name={data.city.name} />
        <div className='card-body'>
          {Object.keys(list).map((date) => (
            <Day key={date} date={date} list={list[date]} />
          ))}
        </div>
      </DisplayPanel>
    );
  } else {
    return <h1>Getting your location...</h1>;
  }
}

// use momo to prevent any unnessecary renders
export default memo(Forecast);
