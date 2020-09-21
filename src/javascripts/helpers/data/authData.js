import firebase from 'firebase/app';
import 'firebase/auth';
import userData from './farmerData';
import auth from '../../components/auth/auth';
import myNavbar from '../../components/myNavbar/myNavbar';

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((farmer) => {
    if (farmer) {
      const currentFarmer = userData.setCurrentFarmer(farmer);
      myNavbar.myNavbar(currentFarmer);
    } else {
      auth.loginButton();
      $('#nav').html('');
    }
  });
};

export default { checkLoginStatus };
