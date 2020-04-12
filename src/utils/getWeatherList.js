/*  sort weather data by date and return object with dates as keys and data as arrays
    under those keys.
 */
export default function getWeatherList(data) {
  const list = {};
  data.list.forEach((item) => {
    const idx = item.dt_txt.split(' ')[0];
    if (list[idx] === undefined) {
      list[idx] = [];
    }
    list[idx].push(item);
  });
  return list;
}
