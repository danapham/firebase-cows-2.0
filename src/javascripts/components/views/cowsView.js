import cowData from '../../helpers/data/cowData';
import card from '../cards/cowCard';

const cowsView = () => {
  cowData.getAllCows()
    .then((response) => {
      if (response.length) {
        response.forEach((item) => {
          $('#app').append(card.cowMaker(item));
        });
      } else {
        $('#app').append('<h2>NO COWS!</h2>');
      }
    });
};

export default { cowsView };
