import React, { useEffect, useRef, useState } from "react";
import Chart from 'chart.js/auto';


const BarChart = ({budgetData}) => {
    const chartRef = useRef(null);

    const updateChart = () => {
        const ctx = chartRef.current.getContext("2d");

        if (!Array.isArray(budgetData) || budgetData.length === 0) {
            console.error("Invalid data format: budgetData is not an array or is empty");
            return;
        }

        const labels = budgetData.map((budget) => budget.name);
        const values = budgetData.map((budget) => parseFloat(budget.amount));

        const chartData = {
            labels: labels,
            datasets: [
                {
                    label: "Budget Amount",
                    backgroundColor: "rgba(75,192,192,0.2)",
                    borderColor: "rgba(75,192,192,1)",
                    borderWidth: 1,
                    hoverBackgroundColor: "rgba(75,192,192,0.4)",
                    hoverBorderColor: "rgba(75,192,192,1)",
                    data: values,
                },
            ],
        };

        const options = {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        };

        const existingChart = chartRef.current?.chartInstance;

        if (existingChart) {
            existingChart.destroy();
        }

        const newChart = new Chart(ctx, {
            type: "bar",
            data: chartData,
            options: options,
        });

        chartRef.current.chartInstance = newChart;
    };

    useEffect(() => {
        if (Array.isArray(budgetData) && budgetData.length > 0) {
            updateChart();
        }
    }, [budgetData]);

    return (
        <div className="bar-chart">
            <canvas ref={chartRef} id='barchart' width="400" height="200"></canvas>
        </div>
    );
};

export default BarChart;
