import cowData from '../../helpers/data/cowData';

// TODO: STUDENTS
const cowMaker = (cowObject) => {
  const domString = `<div class="card m-2" style="width: 18rem;" id="${cowObject.firebaseKey}">
  <div class="card-body">
    <h5 class="card-title">${cowObject.name}</h5>
    <p class="card-text">
      Breed: ${cowObject.breed}<br />
      Location: ${cowObject.location}<br />
      Weight: ${cowObject.weight}<br />
    </p>
    <a href="#" id="${cowObject.firebaseKey}" class="btn btn-danger delete-cow">Delete Cow</a>
  </div>
</div>`;

  $('body').on('click', '.delete-cow', (e) => {
    e.stopImmediatePropagation();
    const firebaseKey = e.currentTarget.id;
    $(`.card#${firebaseKey}`).remove();
    console.warn('Clicked delete cow', e.currentTarget.id);
    cowData.deleteCow(firebaseKey);
  });

  return domString;
};

export default { cowMaker };
