import * as d3 from "d3";
import { dataContent, dataPushed } from "./data";

const displayTab = async () => {
  let graphData = [];
  try {
    await dataContent();
    graphData = dataPushed[0];
    console.log("data", dataPushed[0]);
    console.log("graphdata", graphData);
    // Declare the chart dimensions and margins.

    const width = 800;
    const height = 400;
    const marginTop = 20;
    const marginRight = 20;
    const marginBottom = 30;
    const marginLeft = 40;

    // Declare the x (horizontal position) scale.
    const x = d3
      .scaleUtc()
      .domain([new Date("2023-01-01"), new Date("2024-01-01")])
      .range([marginLeft, width - marginRight]);

    // Declare the y (vertical position) scale.
    const y = d3
      .scaleLinear()
      .domain([0, 100])
      .range([height - marginBottom, marginTop]);

    // Create the SVG container.
    const svg = d3.create("svg").attr("width", width).attr("height", height);

    // Add the x-axis.
    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x));

    // Add the y-axis.
    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y));

    // Append the SVG element.
    const h1 = document.querySelector("h1");
    const section = document.createElement("section");
    section.id = "graphique";
    h1.insertAdjacentElement("afterend", section);
    document.querySelector("#graphique").append(svg.node());
  } catch (error) {
    console.error("erreur :", error);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  displayTab();
});
