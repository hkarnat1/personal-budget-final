import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const PieChart = ({ budgetData }) => {
  const chartRef = React.useRef(null);
  const updateChart = () => {
    const ctx = chartRef.current.getContext("2d");

    if (!Array.isArray(budgetData) || budgetData.length === 0) {
      console.error(
        "Invalid data format: budgetData is not an array or is empty"
      );
      return;
    }
    const labels = budgetData.map((budget) => budget.name);
    const values = budgetData.map((budget) => parseFloat(budget.amount));

    // Sample data for the pie chart
    const data = {
      labels: labels,
      datasets: [
        {
          label: "My First Dataset",
          data: values,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 255, 0, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 255, 0, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    // Options for the pie chart
    const options = {
      scales: {
        // Disable the scale for the pie chart
        x: {
          display: false,
        },
        y: {
          display: false,
        },
      },
    };

    // Get the existing chart instance
    const existingChart = chartRef.current?.chartInstance;
    
    console.log(existingChart)
    // If there's an existing chart, destroy it before creating a new one
    if (existingChart) {
      existingChart.destroy();
    }

    // Create a new pie chart
    const newChart = new Chart(ctx, {
      type: "pie",
      data: data,
      options: options,
    });

    // Save the new chart instance to the ref
    chartRef.current.chartInstance = newChart;
  };

  useEffect(() => {
    if (chartRef.current && Array.isArray(budgetData) && budgetData.length > 0) {
      updateChart();
    }
  }, [budgetData]);

  return (
    <div className="pie-chart">
      <canvas ref={chartRef} id='piechart' width="400" height="400"></canvas>
    </div>
  );
};

export default PieChart;
