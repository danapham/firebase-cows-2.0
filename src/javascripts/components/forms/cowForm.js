import farmerData from '../../helpers/data/farmerData';
import cowData from '../../helpers/data/cowData';

const cowForm = () => {
  $('#cow-form').html(
    `<h2>Add A Horsey Cow to Your Pasture</h2>
    <div id="success-message"></div>
    <form>
      <div id="error-message"></div>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" placeholder="Example: Betsy">
      </div>
      <div class="form-group">
        <label for="breed">Breed</label>
        <input type="text" class="form-control" id="breed" placeholder="Example: Angus">
      </div>
      <div class="form-group">
        <label for="location">Location</label>
        <input type="text" class="form-control" id="location" placeholder="Example: Nashville">
      </div>
      <div class="form-group">
        <label for="weight">Weight</label>
        <input type="number" class="form-control" id="weight" placeholder="Example: 5000">
      </div>
      <div class="form-group">
        <label for="farmer">Farmer</label>
          <select class="form-control" id="farmer">
            <option value="">Select a Farmer</option>
          </select>
      </div>
      <button id="add-cow-btn" type="submit" class="btn btn-info"><i class="fas fa-plus-circle"></i> Add Cow</button>
    </form>`
  );

  farmerData.getAllFarmers().then((response) => {
    response.forEach((item) => {
      $('select').append(`<option value="${item.uid}">${item.name}</option>`);
    });
  });

  $('#add-cow-btn').on('click', (e) => {
    e.preventDefault();

    const data = {
      breed: $('#breed').val() || false,
      location: $('#location').val() || false,
      name: $('#name').val() || false,
      weight: $('#weight').val() || false,
      farmerUid: $('#farmer').val() || false
    };

    console.warn(data);

    if (Object.values(data).includes(false)) {
      $('#error-message').html('<div class="alert alert-danger" role="alert">Please complete all fields</div>');
    } else {
      $('#error-message').html('');

      cowData.addCow(data)
        .then(() => {
          $('#success-message').html('<div class="alert alert-success" role="alert">Your Cow Was Added!</div>');
        }).catch((error) => console.warn(error));

      setTimeout(() => {
        $('#success-message').html('');
      }, 3000);

      $('#breed').val('');
      $('#location').val('');
      $('#name').val('');
      $('#weight').val('');
      $('#farmer').val('');
    }
  });
};

export default { cowForm };
