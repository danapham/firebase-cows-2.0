import cowData from '../../helpers/data/cowData';
import form from '../forms/updateCowForm';

const updateCowView = (cowFirebaseKey) => {
  $('#app').html('<div id="update-cow-form"></div>');

  cowData.getSingleCow(cowFirebaseKey).then((response) => {
    form.updateCowForm(response);
  });
};

export default { updateCowView };
