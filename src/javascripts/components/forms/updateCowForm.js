import farmerData from '../../helpers/data/farmerData';
import cowData from '../../helpers/data/cowData';

const updateCowForm = (cowObject) => {
  $('#update-cow-form').html(`
      <h2>Add A Horsey Cow to Your Pasture</h2>
      <div id="success-message"></div>
      <form>
        <div id="error-message"></div>
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" class="form-control" id="name" value="${cowObject.name}" placeholder="Example: Betsy">
        </div>
        <div class="form-group">
          <label for="breed">Breed</label>
          <input type="text" class="form-control" value="${cowObject.breed}" id="breed" placeholder="Example: Angus">
        </div>
        <div class="form-group">
          <label for="location">Location</label>
          <input type="text" class="form-control" id="location" value="${cowObject.location}" placeholder="Example: Nashville">
        </div>
        <div class="form-group">
          <label for="weight">Weight</label>
          <input type="number" class="form-control" id="weight" value="${cowObject.weight}" placeholder="Example: 5000">
        </div>
        <div class="form-group">
          <label for="farmer">Farmer</label>
            <select class="form-control" id="farmer">
              <option value="">Select a Farmer</option>
            </select>
        </div>
        <button id="update-cow-btn" type="submit" class="btn btn-info"><i class="fas fa-plus-circle"></i> Update Cow</button>
      </form>
  `);

  farmerData.getAllFarmers().then((response) => {
    response.forEach((item) => {
      $('select').append(`<option value="${item.uid}" ${cowObject.farmerUid === item.uid ? "selected='selected'" : ''}>${item.name}</option>`);
    });
  });

  $('#update-cow-btn').on('click', (e) => {
    e.preventDefault();

    const data = {
      breed: $('#breed').val() || false,
      location: $('#location').val() || false,
      name: $('#name').val() || false,
      weight: $('#weight').val() || false,
      farmerUid: $('#farmer').val() || false
    };

    if (Object.values(data).includes(false)) {
      $('#error-message').html('<div class="alert alert-danger" role="alert">Please complete all fields</div>');
    } else {
      $('#error-message').html('');

      cowData.updateCow(cowObject.firebaseKey, data)
        .then(() => {
          $('#success-message').html('<div class="alert alert-success" role="alert">Your Cow Was Updated!</div>');
        }).catch((error) => console.warn(error));

      setTimeout(() => {
        $('#success-message').html('');
      }, 3000);
    }
  });
};

export default { updateCowForm };
