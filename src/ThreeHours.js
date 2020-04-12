import React, { useContext, memo } from 'react';
import getTemp from './utils/getTemp';
import { DegreesContext } from './contexts/weather.context';
import arrow from './img/arrow.png';
import './ThreeHours.css';

function ThreeHours(props) {
  const { isCelsius } = useContext(DegreesContext);

  return (
    <div className='ThreeHours'>
      <li className='list-group-item'>
        <div className='temp-img my-3'>
          <h3>{props.dt_txt.split(' ')[1].slice(0, 5)} </h3>
          <h3>{props.weather[0].description}</h3>
          <span className='img-container'>
            <img
              src={`http://openweathermap.org/img/wn/${props.weather[0].icon}.png`}
              alt={props.weather[0].description}
            />
          </span>
        </div>
        <div className='info-row'>
          <h3>
            {getTemp(props.main.temp, isCelsius)} °{isCelsius ? 'C' : 'F'}
          </h3>
          <h4>Wind: {props.wind.speed} m/s</h4>
          <span>
            <img
              style={{
                height: '1.5rem',
                marginLeft: '1rem',
                transform: `rotate(${props.wind.deg}deg)`,
              }}
              src={arrow}
              alt={`${props.wind.deg}°`}
            />
          </span>
        </div>
      </li>
    </div>
  );
}

export default memo(ThreeHours);

/*
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
*/
