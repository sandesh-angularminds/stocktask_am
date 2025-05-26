import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export function HoldingsPieChart({ holdings }) {
  // Temporary sample data
  const data = {
    labels: holdings.map((item) => item.symbol),
    datasets: [
      {
        data: holdings.map((item) => item.averageBuyPrice * item.quantity), // ✅ Fixed here
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        borderWidth: 1,
        custom: holdings, // Custom metadata for tooltip
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const index = context.dataIndex;
            const info = context.dataset.custom[index];

            return [
              `ID: ${info.id}`,
              `Symbol: ${info.symbol}`,
              `Quantity: ${info.quantity}`,
              `Buy Price: ${info.averageBuyPrice}`,
              `Total Value: ${Number(info.averageBuyPrice * info.quantity).toFixed(2)}`,
            ];
          },
        },
      },
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center text-xl mb-4">Portfolio</h2>
      <Pie data={data} options={options} />
    </div>
  );
}
