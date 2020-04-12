import axios from 'axios';

export default function fetchData(url) {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((data) => {
        if (data.statusText !== 'OK') {
          throw new Error(`Loading Error: ${data.status}`);
        }
        resolve(data.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
