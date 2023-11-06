import Chart from "chart.js/auto";

// Récupérer les données du tableau
const table = document.getElementById("table2");
const labels = ["2007-09", "2010-12"];
const countries = [];
const data = [[], []];

// Boucler à travers les lignes de la table
for (let i = 1; i < table.rows.length; i++) {
  const row = table.rows[i];
  countries.push(row.cells[1].innerText);
  data[0].push(parseInt(row.cells[2].innerText));
  data[1].push(parseInt(row.cells[3].innerText));
}

// Créer un tableau de données au format accepté par Chart.js
const chartData = {
  labels: labels,
  datasets: [],
};

// Créer un jeu de données pour chaque pays
for (let i = 0; i < countries.length; i++) {
  const dataset = {
    label: countries[i],
    data: [data[0][i], data[1][i]],
    backgroundColor: "rgba(54, 162, 235, 0.5)",
    borderColor: "rgba(54, 162, 235, 1)",
    borderWidth: 1,
  };
  chartData.datasets.push(dataset);
}

// Créer un élément canvas pour le graphique
const canvas = document.createElement("canvas");
canvas.id = "myComparisonChart"; // Ajouter l'ID "myComparisonChart" à l'élément canvas
table.insertAdjacentElement("afterend", canvas); // Insérer le canvas après la table

// Sélectionner le canvas pour le graphique
const ctx = document.getElementById("myComparisonChart").getContext("2d");

// Créer le graphique à barres avec Chart.js
new Chart(ctx, {
  type: "bar",
  data: chartData,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
