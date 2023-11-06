import axios from "axios";
import Chart from "chart.js/auto";

// Déclaration du jeu de données initial
let chartData = {
  datasets: [
    {
      label: "Données",
      data: [],
      backgroundColor: "rgba(54, 162, 235, 1)",
      pointStyle: "circle",
      pointRadius: 5,
      borderWidth: 0,
    },
  ],
};

const displayChart = async () => {
  const h1 = document.querySelector("h1");
  const section = document.createElement("section");
  section.id = "graphique";

  const canvas = document.createElement("canvas");
  canvas.id = "myChart";
  section.appendChild(canvas);
  h1.insertAdjacentElement("afterend", section);

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

  const updateData = async () => {
    try {
      // Requête pour obtenir de nouvelles données
      const response = await axios.get(
        "https://canvasjs.com/services/data/datapoints.php"
      );
      const newData = response.data;

      // Remplacer les données existantes par les nouvelles données
      chartData.datasets[0].data = newData.map((item, index) => {
        return { x: index, y: item[1] };
      });

      chart.update(); // Mettre à jour le graphique avec les nouvelles données
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    updateData(); // Mettre à jour les données initiales au chargement de la page

    // Actualiser les données à intervalles réguliers (toutes les 5 secondes ici)
    setInterval(updateData, 5000);
  });
};

displayChart();
