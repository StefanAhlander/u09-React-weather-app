// getTemp(data.main.temp, isCelsius)

export default function getTemp(temp, isCelsius) {
  if (isCelsius) {
    return (temp - 273.15).toFixed(1);
  }
  return ((temp - 273.15) * 1.8 + 32.0).toFixed(1);
}
