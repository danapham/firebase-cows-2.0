import axios from 'axios';
import apiKeys from '../apiKeys.json';
import cowData from './cowData';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllFarmers = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/farmers.json`).then((response) => {
    const demFarmers = response.data;
    const farmers = [];
    if (demFarmers) {
      Object.keys(demFarmers).forEach((farmerId) => {
        farmers.push(demFarmers[farmerId]);
      });
    }
    resolve(farmers);
  }).catch((error) => reject(error));
});

const checkIfFarmerExistsInFirebase = (farmer) => {
  axios
    .get(`${baseUrl}/farmers.json?orderBy="uid"&equalTo="${farmer.uid}"`)
    .then((resp) => {
      if (Object.values(resp.data).length === 0) {
        axios.post(`${baseUrl}/farmers.json`, farmer)
          .then((response) => {
            const update = { firebaseKey: response.data.name };
            axios.patch(`${baseUrl}/farmers/${response.data.name}.json`, update);
          }).catch((error) => console.warn(error));
      } else {
        console.warn('User Already Exists');
      }
      // NOTE FOR STUDENTS
      // Set session storage after we know that user is in DB so that we do not hit the API again during this session. Limit hits to the API.
      window.sessionStorage.setItem('ua', true);
    })
    .catch((error) => console.error(error));
};

const setCurrentFarmer = (farmerObj) => {
  const farmer = {
    image: farmerObj.photoURL,
    uid: farmerObj.uid,
    name: farmerObj.displayName,
    email: farmerObj.email,
    lastSignInTime: farmerObj.metadata.lastSignInTime,
  };

  // NOTE FOR STUDENTS
  // If the user is logged in and this is set, we have already checked the API, so if they refresh, we know that they already exist.
  const loggedIn = window.sessionStorage.getItem('ua');
  if (!loggedIn) {
    checkIfFarmerExistsInFirebase(farmer);
  }
  return farmer;
};

const getSingleFarmer = (farmerUid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/farmers.json?orderBy="uid"&equalToo="${farmerUid}"`)
    .then((response) => {
      const farmer = Object.values(response.data);
      const thisFarmer = farmer[0];
      resolve(thisFarmer);
    }).catch((error) => reject(error));
});

const deleteFarmer = (farmerUid) => {
  cowData.getFarmerCows(farmerUid)
    .then((response) => {
      response.forEach((item) => {
        cowData.deleteCow(item.firebaseKey);
      });
    })
    .then(() => {
      getSingleFarmer(farmerUid)
        .then((response) => {
          axios.delete(`${baseUrl}/farmers/${response.firebaseKey}.json`);
        });
    });
};

export default { setCurrentFarmer, getAllFarmers, deleteFarmer };
