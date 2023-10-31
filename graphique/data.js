import axios from "axios";
const MAX_DATA_LENGHT = 10;
let dataPushed = [];

async function getData() {
  try {
    const response = await axios.get(
      "https://canvasjs.com/services/data/datapoints.php"
    );
    return response.data;
  } catch (error) {
    console.error("erreur :", error);
    throw error;
  }
}

const dataContent = async () => {
  try {
    const newData = await getData();
    dataPushed.push(newData);

    if (dataPushed > MAX_DATA_LENGHT) {
      dataPushed = dataPushed.slice(dataPushed.length - MAX_DATA_LENGHT);
    }
    if (dataPushed.length > 0) {
      const premierTableau = dataPushed[0];
      const secondTableau = premierTableau[0];
      console.log("Premier tableau de données :", premierTableau);
      console.log("Second premier sous tableau de données :", secondTableau);
    }
  } catch (error) {
    console.error("erreur :", error);
  }
};
dataContent();

export { dataContent, dataPushed };
