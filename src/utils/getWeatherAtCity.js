import fetchData from './fetchData';
import { BASE_URL, API_KEY } from '../app-config';

export default async function getWeatherDataAtCity(
  urlModifyer = 'weather',
  city,
  state,
  setState
) {
  try {
    setState({
      ...state,
      isLoading: true,
    });

    const data = await fetchData(
      `${BASE_URL}${urlModifyer}?q=${city}&appid=${API_KEY}`
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
