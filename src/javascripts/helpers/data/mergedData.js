import cowData from './cowData';
import farmerData from './farmerData';

const getDataForCowsView = () => new Promise((resolve, reject) => {
  cowData.getAllCows().then((cowResponse) => {
    farmerData.getAllFarmers().then((farmerResponse) => {
      const cowStuff = [];
      cowResponse.forEach((cow) => {
        const farmerObject = farmerResponse.find((farmer) => farmer.uid === cow.farmerUid);

        const farmerUse = {
          farmerName: farmerObject.name,
          farmerEmail: farmerObject.email
        };

        cowStuff.push({ ...cow, ...farmerUse });
        resolve(cowStuff);
      });
    });
  }).catch((error) => reject(error));
});

export default { getDataForCowsView };
