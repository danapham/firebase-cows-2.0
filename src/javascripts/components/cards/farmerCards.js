const farmerMaker = (farmerObject) => {
  const domString = `<div class="card farmer" style="width: 18rem;" id=${farmerObject.uid}>
                      <img class="card-img-top" src="${farmerObject.image}" alt="Card image cap">
                      <div class="card-body">
                        <h5 class="card-title">Farmer ${farmerObject.name}</h5>
                        <a href="#" class="btn btn-primary" id=${farmerObject.uid}>See ${farmerObject.name}'s Cows</a>
                      </div>
                    </div>`;
  return domString;
};

export default { farmerMaker };
