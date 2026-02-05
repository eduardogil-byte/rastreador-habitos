import { useLocation } from "react-router-dom";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import { useState } from "react";
import Month from "./components/Month";
import Header from "./components/Header";

function Graficos() {
  const location = useLocation();
  const { dias } = location.state || {};

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const allColors = [
    "coral",
    "darkred",
    "deeppink",
    "darkorange",
    "gold",
    "darkmagenta",
    "darkgreen",
    "royalblue",
    "sienna",
  ];

  const date = new Date();
  const [mesSelecionado, setMesSelecionado] = useState(months[date.getMonth()]);

  const [graficoSelecionado, setGraficoSelecionado] = useState(true);

  function contarVezesHabitoRealizado(n, habito) {
    let contador = 0;
    n.forEach((dia) => {
      if (dia.habitos[habito] == true) {
        contador++;
      }
    });
    return contador;
  }

  console.log(`isso é dentro do graficos e esse e a lista`);
  console.log(dias);
  return (
    <div>
      <Header dias={dias} />

      <div className="flex justify-center items-center gap-6 pt-2">
        {graficoSelecionado && (
          <Month
            mesSelecionado={mesSelecionado}
            setMesSelecionado={setMesSelecionado}
            months={months}
          />
        )}

        <button
          className="border bottom-1 h-10 min-w-[120px]"
          onClick={() => setGraficoSelecionado(!graficoSelecionado)}
        >
          Mudar Grafico
        </button>
      </div>
      <div className="flex justify-center items-center pt-2">
        {graficoSelecionado ? (
          <BarChart
            dias={dias}
            mesSelecionado={mesSelecionado}
            contarVezesHabitoRealizado={contarVezesHabitoRealizado}
          />
        ) : (
          <LineChart
            dias={dias}
            months={months}
            contarVezesHabitoRealizado={contarVezesHabitoRealizado}
            allColors={allColors}
          />
        )}
      </div>
    </div>
  );
}
export default Graficos;
