import React, { useContext, memo } from 'react';
import getTemp from './utils/getTemp';
import { DegreesContext } from './contexts/weather.context';

function ThreeHours(props) {
  const { isCelsius } = useContext(DegreesContext);

  return (
    <div>
      <p>
        <span>{props.dt_txt.split(' ')[1].slice(0, 5)} </span>
        <span>{props.weather[0].description}</span>
        <img
          src={`http://openweathermap.org/img/wn/${props.weather[0].icon}.png`}
          alt={props.weather[0].description}
        />
      </p>
      <p>
        {getTemp(props.main.temp, isCelsius)} °{isCelsius ? 'C' : 'F'}{' '}
        {props.wind.speed} m/s {props.wind.deg}°
      </p>
    </div>
  );
}

export default memo(ThreeHours);
