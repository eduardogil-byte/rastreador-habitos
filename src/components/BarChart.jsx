import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  BarElement,
  CategoryScale,
} from "chart.js";

ChartJS.register(LinearScale, BarElement, CategoryScale);

function BarChart({ dias, mesSelecionado, contarVezesHabitoRealizado }) {
  const newArray = dias.filter((dia) => dia.mes === mesSelecionado);
  const resultado = [];

  const habitos = dias?.[0]?.habitos;

  console.log("é array?");
  console.log(Array.isArray(newArray));
  console.log("NewArray");
  console.log(newArray);

  Object.keys(habitos).forEach((habito) => {
    const dentroResultado = {};
    dentroResultado["habito"] = habito;
    dentroResultado["total"] = contarVezesHabitoRealizado(newArray, habito);
    resultado.push(dentroResultado);
  });

  const data = {
    datasets: [
      {
        label: "Habitos por Mes",
        data: resultado,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        parsing: {
          xAxisKey: "habito",
          yAxisKey: "total",
        },
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,

    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-[80vw] h-[80vh]">
      <Bar data={data} options={chartOptions} />;
    </div>
  );
}
export default BarChart;
