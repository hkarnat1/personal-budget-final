import React from "react";
import Chart from 'chart.js/auto';

const PolarAreaChart = ({budgetData}) => {
    const chartRef = React.useRef(null);
  
    const updateChart = () => {
      const ctx3 = chartRef.current.getContext('2d');
      if (!Array.isArray(budgetData) || budgetData.length === 0) {
        console.error("Invalid data format: budgetData is not an array or is empty");
        return;
    }
    const labels = budgetData.map((budget) => budget.name);
    const values = budgetData.map((budget) => parseFloat(budget.amount));

        // Sample data for the polar area chart
        const data = {
          labels: labels,
          datasets: [
            {
              label: 'My First Dataset',
              data: values,
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 255, 0, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 255, 0, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
              ],
              borderWidth: 1,
            },
          ],
        };
    
        // Options for the polar area chart
        const options = {
          scales: {
            r: {
              suggestedMin: 0,
            },
          },
        };
    
        // Get the existing chart instance
        const existingChart = chartRef.current.chart;
    
        // If there's an existing chart, destroy it before creating a new one
        if (existingChart) {
          existingChart.destroy();
        }
    
        // Create a new polar area chart
        const newChart = new Chart(ctx3, {
          type: 'polarArea',
          data: data,
          options: options,
        });
    
        // Save the new chart instance to the ref
        chartRef.current.chart = newChart;
      };
      React.useEffect(() => {
        if (Array.isArray(budgetData) && budgetData.length > 0) {
            updateChart();
        }
    }, [budgetData]);
    
  return (
    <div className='bar-chart'>
      <canvas ref={chartRef} id='polar-chart' width="100" height="100"></canvas>
    </div>
  );
};

export default PolarAreaChart;
