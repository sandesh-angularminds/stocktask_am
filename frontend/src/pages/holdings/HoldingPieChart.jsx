import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export function HoldingsPieChart({ holdings }) {
  // Format the data
  const data = {
    labels: holdings.map((item) => item.symbol),
    datasets: [
      {
        label: 'Total Value',
        data: holdings.map((item) => item.quantity * item.currentPrice),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center text-xl mb-4">Holdings Distribution</h2>
      <Pie data={data} />
    </div>
  );
}
