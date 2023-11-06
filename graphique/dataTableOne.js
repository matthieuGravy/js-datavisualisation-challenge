import Chart from "chart.js/auto";

// Récupérer les données du tableau
const table = document.getElementById("table1");
const data = [];
const labels = [];
const countries = [];

// Boucler à travers les lignes de la table
for (let i = 2; i < table.rows.length; i++) {
  const row = table.rows[i];
  const country = row.cells[1].innerText;
  countries.push(country);

  const rowData = [];
  for (let j = 2; j < row.cells.length; j++) {
    const value = row.cells[j].innerText;
    rowData.push(parseFloat(value.replace(",", ".")));
  }
  data.push(rowData);
}

// Générer des libellés pour les années
for (let i = 2; i < table.rows[1].cells.length; i++) {
  labels.push(table.rows[1].cells[i].innerText);
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
    data: data[i],
    fill: false,
    borderColor: "rgba(54, 162, 235, 1)",
    borderWidth: 1,
  };
  chartData.datasets.push(dataset);
}

// Créer un élément canvas pour le graphique
const canvas = document.createElement("canvas");
canvas.id = "myChart"; // Ajouter l'ID "myChart" à l'élément canvas
table.insertAdjacentElement("afterend", canvas); // Insérer le canvas après la table

// Sélectionner le canvas pour le graphique
const ctx = document.getElementById("myChart").getContext("2d");

// Créer le graphique à lignes avec Chart.js
new Chart(ctx, {
  type: "line",
  data: chartData,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
