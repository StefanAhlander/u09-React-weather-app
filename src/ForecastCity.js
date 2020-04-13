/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import getWeatherAtCity from './utils/getWeatherAtCity';
import getWeatherList from './utils/getWeatherList';
import Day from './Day';
import DisplayPanel from './DisplayPanel';
import './Forecast.css';
import { useLocation } from 'react-router-dom';

export default function ForecastCity(props) {
  const city = props.match.params.city;
  const location = useLocation();

  const initialState = {
    isLoading: false,
    hasError: false,
    data: null,
  };

  const [state, setState] = useState(initialState);

  // On component mount fetch data for the component, only once
  useEffect(() => {
    getWeatherAtCity('forecast', city, state, setState);
  }, [location]);

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
        <h1 className='card-header text-center'>{data.city.name}</h1>
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
