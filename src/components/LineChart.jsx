import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

function LineChart({ dias, months, contarVezesHabitoRealizado, allColors }) {
  function createValueMonth(newArray, allHabits) {
    const objHabits = {};
    Object.keys(allHabits).forEach((habit) => {
      objHabits[habit] = contarVezesHabitoRealizado(newArray, habit);
    });
    return objHabits;
  }

  const resultado = [];
  months.forEach((month) => {
    const newArray = dias.filter((dia) => dia.mes === month);
    const allHabits = dias[0].habitos;

    const objMonth = {};
    objMonth[month] = createValueMonth(newArray, allHabits);
    resultado.push(objMonth);
  });
  console.log("resultado Line chat:");
  console.log(resultado);

  const dataYearHabit = [];
  const saveAllHabits = [];

  function createData() {
    const primeiro = resultado[0];
    console.log(`Primeiro: ${primeiro}`);

    Object.keys(primeiro).forEach((keyHabit) => {
      Object.keys(primeiro[keyHabit]).forEach((h) => {
        console.log(h);
        dataYearHabit.push(giveDataHabit(h));
        saveAllHabits.push(h);
      });
    });
  }
  createData();

  console.log("dento da dataYearHabit: ");
  console.log(dataYearHabit);

  function createDatasets() {
    const datasets = [];
    for (let i = 0; i < saveAllHabits.length; i++) {
      let inteiro = Math.floor(Math.random() * allColors.length);
      const onDatasets = {};
      onDatasets["label"] = saveAllHabits[i];
      onDatasets["data"] = dataYearHabit[i];
      onDatasets["borderColor"] = allColors[inteiro];
      onDatasets["backgroundColor"] = allColors[inteiro];
      onDatasets["tension"] = 0.1;
      datasets.push(onDatasets);
    }
    console.log("Mostrando a criacao dos datasetes");
    console.log(datasets);
    return datasets;
  }
  console.log("allHabit:");
  console.log(saveAllHabits.length);

  function giveDataHabit(habit) {
    const data = [];
    resultado.forEach((mes) => {
      Object.keys(mes).forEach((m) => {
        data.push(mes[m][habit]);
      });
    });
    return data;
  }

  const data = {
    labels: months,
    datasets: createDatasets(),
  };

  const option = {
    animations: {
      y: {
        duration: 0,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugin: {
      legend: { position: "top" },
      title: { display: true, text: "habitos por mes" },
    },
  };

  return (
    <div className="w-[80vw] h-[80vh]">
      <Line options={option} data={data} />;
    </div>
  );
}

export default LineChart;
