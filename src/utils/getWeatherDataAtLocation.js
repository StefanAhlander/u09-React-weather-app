import getPosition from './getPosition';
import fetchData from './fetchData';
import { BASE_URL, API_KEY } from '../app-config';

export default async function getWeatherDataAtLocation(
  urlModifyer = 'weather',
  state,
  setState
) {
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
      `${BASE_URL}${urlModifyer}?lat=${lat}&lon=${lon}&appid=${API_KEY}`
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
