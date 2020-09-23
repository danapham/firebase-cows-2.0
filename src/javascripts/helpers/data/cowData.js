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
const deleteCow = (firebaseKey) => axios.delete(`${baseUrl}/cows/${firebaseKey}.json`);

const addCow = (data) => axios.post(`${baseUrl}/cows.json`, data)
  .then((response) => {
    const update = { firebaseKey: response.data.name };
    axios.patch(`${baseUrl}/cows/${response.data.name}.json`, update);
  }).catch((error) => console.warn(error));

const getFarmerCows = (farmerUid) => new Promise((resolve) => {
  axios.get(`${baseUrl}/cows.json?orderBy="farmerUid"&equalTo"${farmerUid}"`)
    .then((response) => {
      const farmerCows = response.data;
      const cows = [];
      if (farmerCows) {
        Object.keys(farmerCows).forEach((cowId) => {
          cows.push(farmerCows[cowId]);
        });
      }

      resolve(cows);
    }).catch((error) => console.warn(error));
});

export default {
  getAllCows,
  deleteCow,
  addCow,
  getFarmerCows
};
