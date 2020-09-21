import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

// STUDENTS: Refactor this to use new Promise syntax
const getCows = () => axios.get(`${baseUrl}/cows.json`);

export default { getCows };
