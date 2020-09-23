import farmersView from '../components/views/farmersView';
import cowsView from '../components/views/cowsView';
import addCowsView from '../components/views/addCowView';

const viewHelper = (id) => {
  $('#app').html('');
  switch (id) {
    case 'farmers-link':
      return farmersView.farmersView();
    case 'cows-link':
      return cowsView.cowsView();
    case 'add-cow-link':
      return addCowsView.addCowView();
    default:
      return console.warn('nothing clicked');
  }
};

const viewListener = (view) => {
  viewHelper(view);
  $('body').on('click', 'li.nav-item', (e) => {
    viewHelper(e.currentTarget.id);
  });
};

export default { viewListener };
