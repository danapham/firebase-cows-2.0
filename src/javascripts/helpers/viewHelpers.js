import farmersView from '../components/views/farmersView';
import cowsView from '../components/views/cowsView';
import addCowsView from '../components/views/addCowView';
import updateCowsView from '../components/views/updateCowView';
import singleFarmerView from '../components/views/singleFarmerView';

const viewHelper = (id, arg) => {
  $('#app').html('');
  switch (id) {
    case 'farmers-link':
      return farmersView.farmersView();
    case 'cows-link':
      return cowsView.cowsView();
    case 'add-cow-link':
      return addCowsView.addCowView();
    case 'update-cow-link':
      return updateCowsView.updateCowView(arg);
    case 'single-farmer':
      return singleFarmerView.singleFarmerView(arg);
    default:
      return console.warn('nothing clicked');
  }
};

const viewListener = (view) => {
  viewHelper(view);
  $('body').on('click', 'li.nav-item', (e) => {
    viewHelper(e.currentTarget.id);
  });

  $('body').on('click', '.update-cow', (e) => {
    const cowFirebaseKey = e.currentTarget.id;
    viewHelper('update-cow-link', cowFirebaseKey);
  });

  $('body').on('click', '.card.farmer .see-cows', (e) => {
    const farmerUid = e.currentTarget.id;
    viewHelper('single-farmer', farmerUid);
  });
};

export default { viewListener };
