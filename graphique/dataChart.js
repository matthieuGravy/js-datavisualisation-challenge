// Import des bibliothèques Axios et Chart.js
import axios from "axios";
import Chart from "chart.js/auto";

// Initialisation du jeu de données du graphique
let chartData = {
  datasets: [
    {
      label: "Données",
      data: [], // Tableau pour stocker les données du graphique
      backgroundColor: "rgba(54, 162, 235, 1)",
      pointStyle: "circle",
      pointRadius: 5,
      borderWidth: 0,
    },
  ],
};

// Tableau pour stocker l'ensemble des données du graphique
let tableauData = [];

// Fonction pour afficher le graphique et mettre à jour les données
const displayChart = async () => {
  // Sélection et création des éléments HTML pour le graphique
  const h1 = document.querySelector("h1");
  const section = document.createElement("section");
  section.id = "graphique";

  const canvas = document.createElement("canvas");
  canvas.id = "myChart";
  section.appendChild(canvas);
  h1.insertAdjacentElement("afterend", section);

  // Initialisation du contexte pour le graphique avec Chart.js
  const ctx = document.getElementById("myChart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "scatter",
    data: chartData,
    options: {
      scales: {
        x: {
          type: "linear",
          position: "bottom",
        },
      },
    },
  });

  // Fonction pour mettre à jour les données du graphique
  const updateData = async () => {
    try {
      // Récupération des nouvelles données depuis une source externe (URL)
      const response = await axios.get(
        "https://canvasjs.com/services/data/datapoints.php"
      );
      const newData = response.data;

      // Ajout des nouvelles données à la suite du tableau de données
      tableauData = tableauData.concat(
        newData.map((item, index) => {
          return {
            x: tableauData.length + index + 1,
            y: item[1],
          };
        })
      );

      // Affichage des données mises à jour dans la console
      console.log("Données mises à jour :", tableauData);

      // Mise à jour du jeu de données du graphique
      chartData.datasets[0].data = tableauData;

      // Mise à jour du graphique avec les nouvelles données
      chart.update();
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  // Écouteur d'événement pour démarrer la mise à jour dès que le DOM est chargé
  document.addEventListener("DOMContentLoaded", () => {
    updateData(); // Premier appel pour afficher les données initiales
    setInterval(updateData, 1000); // Appel périodique toutes les secondes
  });
};

// Appel de la fonction pour afficher le graphique
displayChart();
