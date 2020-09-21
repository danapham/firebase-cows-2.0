import firebase from 'firebase/app';
import 'firebase/auth';

const logoutEvent = () => {
  $('#navbar-logout-button').on('click', (e) => {
    e.preventDefault();

    // NOTE FOR STUDENTS
    // Remove session storage if they log out in the same session and in case another user logs in, we want the API check to happen.
    window.sessionStorage.removeItem('ua');
    firebase.auth().signOut();
    window.location.href = '/';
  });
};

const myNavbar = (currentFarmer) => {
  $('#nav').html(
    `<nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Horsey Cow Pasture</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
      <li class="nav-item mx-3"  id="farmers-link">
        <a class="nav-link" href="#"><i class="fas fa-hat-cowboy-side"></i> Farmers</a>
      </li>
      <li class="nav-item mx-3" id="cows-link">
        <a class="nav-link" href="#"><i class="far fa-cow"></i><i class="fas fa-horse"></i> Cows</a>
      </li>
      <li class="nav-item mx-3" id="add-cow-link">
        <a class="nav-link" href="#"><i class="fas fa-plus-circle"></i> Add A Cow</a>
      </li>
    </ul>

        <ul class="navbar-nav ml-auto">
          <li class="user-info-nav">
            Welcome, ${currentFarmer.name}!
          </li>
          <li class="nav-item">
            <button class="nav-link btn btn-danger p-2" id="navbar-logout-button">Logout</button>
          </li>
        </ul>
      </div>
    </nav>`
  );

  logoutEvent();
};

export default { myNavbar };
