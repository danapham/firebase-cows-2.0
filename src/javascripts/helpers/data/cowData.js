import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

// STUDENTS: Refactor this to use new Promise syntax
const getAllCows = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/cows.json`).then((response) => {
    const doseCows = response.data;
    const cows = [];
    if (doseCows) {
      Object.keys(doseCows).forEach((cowId) => {
        cows.push(doseCows[cowId]);
      });
    }
    resolve(cows);
  }).catch((error) => reject(error));
});

export default { getAllCows };
