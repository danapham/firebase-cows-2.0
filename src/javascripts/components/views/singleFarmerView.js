import mergedData from '../../helpers/data/mergedData';

const singleFarmerView = (farmerUid) => {
  mergedData.getSingleFarmerView(farmerUid)
    .then((response) => {
      const { farmer, cows } = response;

      $('#app').append(`<div id="single-view">
      <h1>${farmer.name}'s Cows!</h1>
    </div>`);

      if (cows.length) {
        cows.forEach((cow) => {
          $('#single-view').append(`<h3>${cow.name}</h3>`);
        });
      } else {
        $('#single-view').append('<h1>NO COWS!</h1>');
      }
    });
};

export default { singleFarmerView };
