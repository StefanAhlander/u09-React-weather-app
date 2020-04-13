import React from 'react';
import arrow from './img/arrow.png';
import './CurrentWeather.css';
import getTemp from './utils/getTemp';
import CardHeader from './CardHeader';

export default function CurrentWeather(props) {
  const { data, isCelsius } = props;
  return (
    <div className='CurrentWeather'>
      <CardHeader name={data.name} />
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
                  transform: `rotate(${data.wind.deg + 180}deg)`,
                }}
                src={arrow}
                alt={`${data.wind.deg}°`}
              />
            </span>
          </li>
          <li className='list-group-item'>Humidity: {data.main.humidity} %</li>
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
}
