/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { DegreesContext } from './contexts/weather.context';
import { BASE_URL, API_KEY } from './app-config';
import axios from 'axios';
import getTemp from './utils/getTemp';

export default function Home() {
  const { isCelsius, toggleIsCelsius } = useContext(DegreesContext);

  const initialState = {
    isLoading: false,
    hasError: false,
    data: null,
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    function success(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const url = `${BASE_URL}weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

      // Mock API-call
      setState({
        ...state,
        isLoading: false,
        data: {
          coord: {
            lon: 17.66,
            lat: 59.84,
          },
          weather: [
            {
              id: 800,
              main: 'Clear',
              description: 'clear sky',
              icon: '01d',
            },
          ],
          base: 'stations',
          main: {
            temp: 280.9,
            feels_like: 272.62,
            temp_min: 280.15,
            temp_max: 282.15,
            pressure: 1013,
            humidity: 42,
          },
          visibility: 10000,
          wind: {
            speed: 8.2,
            deg: 330,
          },
          clouds: {
            all: 2,
          },
          dt: 1586422005,
          sys: {
            type: 1,
            id: 1731,
            country: 'SE',
            sunrise: 1586404182,
            sunset: 1586454693,
          },
          timezone: 7200,
          id: 2666199,
          name: 'Uppsala',
          cod: 200,
        },
      });

      /* axios
        .get(url)
        .then((data) => {
          if (data.statusText !== 'OK') {
            throw new Error(`Loading Error: ${data.status}`);
          }
          setState({
            ...state,
            isLoading: false,
            data: data.data,
          });
        })
        .catch((error) => {
          setState({
            ...state,
            isLoading: false,
            hasError: `Error loading from API: ${error}`,
          });
        }); */
    }

    function error() {
      setState({
        ...state,
        isLoading: false,
        hasError: 'Unable to retrieve your location',
      });
    }

    if (!navigator.geolocation) {
      setState({
        ...state,
        hasError: 'Geolocation is not supported by your browser',
      });
    } else {
      setState({
        ...state,
        isLoading: true,
      });
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, []);

  const { error, isLoading, data } = state;
  if (error) {
    return (
      <>
        <h1>Unfortunately there is an error</h1>
        <p>{state.error}</p>
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
