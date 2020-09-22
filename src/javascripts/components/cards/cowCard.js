// TODO: STUDENTS
const cowMaker = (cowObject) => {
  const domString = `<div class="card m-2" style="width: 18rem;" id="${cowObject.id}">
  <div class="card-body">
    <h5 class="card-title">${cowObject.name}</h5>
    <p class="card-text">
      Breed: ${cowObject.breed}<br />
      Location: ${cowObject.location}<br />
      Weight: ${cowObject.weight}<br />
    </p>
    <a href="#" id="${cowObject.id}" class="btn btn-danger delete-cow">Delete Cow</a>
  </div>
</div>`;

  return domString;
};

export default { cowMaker };
