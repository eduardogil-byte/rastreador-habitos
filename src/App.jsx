import { useEffect, useState } from "react";
import Days from "./components/Days";
import Header from "./components/Header";
import { v4 } from "uuid";
import Habitos from "./components/Habitos";
import Month from "./components/Month";
import AddHabit from "./components/AddHabit";
import ButtonAdicionar from "./components/ButtonAdicionar";
import ConfirmationScreen from "./components/ConfirmationScreen";

function App() {
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

  const data = new Date();
  const diasAnos = [];
  const anoAtual = new Date().getFullYear();
  for (let i = 0; i < 12; i++) {
    diasAnos.push(new Date(anoAtual, i + 1, 0).getDate());
  }
  console.log(diasAnos);
  //Isso é para saber quantos dias tem cada mes

  const [varAdicionarHabito, setVarAdicionarHabito] = useState(false);

  const [mesSelecionado, setMesSelecionado] = useState(months[data.getMonth()]);

  console.log(`Em que mes estamos: ${months[data.getMonth()]}`);

  function diaSemana(diaSemana) {
    switch (diaSemana) {
      case 0:
        return "Domingo";
      case 1:
        return "Segunda";
      case 2:
        return "Terça";
      case 3:
        return "Quarta";
      case 4:
        return "Quinta";
      case 5:
        return "Sexta";
      case 6:
        return "Sábado";
    }
  }

  function qualMes(mes) {
    return months[mes];
  }

  const [habito, setHabito] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("habito")) || [
        "Academia",
        "Ler",
        "2L Agua",
      ]
    );
  });

  useEffect(() => {
    localStorage.setItem("habito", JSON.stringify(habito));
  }, [habito]);

  console.log(`habitos: ${habito}`);

  function colocarHabitosDia({ dia, diaSemana, mes }) {
    const obj = {};
    const habitosArray = {};
    habito.forEach((h) => {
      habitosArray[h] = false;
    });

    obj["id"] = v4();
    obj["dia"] = dia;
    obj["diaSemana"] = diaSemana;
    obj["mes"] = mes;
    obj["habitos"] = habitosArray;

    return obj;
  }

  const [dias, setDia] = useState(() => {
    return JSON.parse(localStorage.getItem("dias")) || preencherStateDias();
  });

  function preencherStateDias() {
    const resultado = [];
    for (let i = 0; i < 12; i++) {
      for (let j = 1; j < diasAnos[i] + 1; j++) {
        resultado.push(
          colocarHabitosDia({
            dia: j,
            diaSemana: diaSemana(new Date(data.getFullYear(), i, j).getDay()),
            mes: qualMes(i),
          }),
        );
      }
    }

    return resultado;
  }

  useEffect(() => {
    localStorage.setItem("dias", JSON.stringify(dias));
  }, [dias]);

  function cliqueiHabito(diaId, nomeHabito) {
    const novoDias = dias.map((dia) => {
      if (dia.id == diaId) {
        return {
          ...dia,
          habitos: { ...dia.habitos, [nomeHabito]: !dia.habitos[nomeHabito] },
        };
      }
      return dia;
    });
    setDia(novoDias);
  }

  const [selecinarEdicao, setSelecionarEdicao] = useState(false);

  const [confirmarRemoverHabito, setConfirmarRemoverHabito] = useState(false);

  const [saveHabit, setSaveHabit] = useState(null);

  function setterConfimarRemocao(habit) {
    setSaveHabit(habit);
    setConfirmarRemoverHabito(true);
  }

  function removerHabito(habit) {
    const newArrayHabit = habito.filter((h) => h != habit);
    setHabito(newArrayHabit);
    const resultado = [];
    dias.map((dia) => {
      const newHabit = { ...dia.habitos };
      delete newHabit[habit];
      resultado.push({ ...dia, habitos: newHabit });
    });
    setDia(resultado);
  }

  function adicionarHabito(habit) {
    setHabito((prevHabitos) => [...prevHabitos, habit]);
    const resultado = [];
    dias.map((dia) => {
      const newHabit = { ...dia.habitos };
      newHabit[habit] = false;
      resultado.push({ ...dia, habitos: newHabit });
    });
    setDia(resultado);
  }

  console.log(dias);
  return (
    <div>
      {confirmarRemoverHabito && (
        <ConfirmationScreen
          saveHabit={saveHabit}
          removerHabito={removerHabito}
          setConfirmarRemoverHabito={setConfirmarRemoverHabito}
        />
      )}

      <Header dias={dias} />
      <div className=" flex justify-center items-center pt-2">
        <Month
          mesSelecionado={mesSelecionado}
          months={months}
          setMesSelecionado={setMesSelecionado}
        />
      </div>
      <div className="flex pt-2">
        <Habitos
          listaHabitos={habito}
          selecinarEdicao={selecinarEdicao}
          setSelecionarEdicao={setSelecionarEdicao}
          setHabito={setHabito}
          removerHabito={removerHabito}
          adicionarHabito={adicionarHabito}
          varAdicionarHabito={varAdicionarHabito}
          setVarAdicionarHabito={setVarAdicionarHabito}
          setterConfimarRemocao={setterConfimarRemocao}
        />
        <Days
          dia={dias}
          cliqueiHabito={cliqueiHabito}
          mesSelecionado={mesSelecionado}
          months={months}
        />
      </div>
      {selecinarEdicao && (
        <ButtonAdicionar
          setVarAdicionarHabito={setVarAdicionarHabito}
          varAdicionarHabito={varAdicionarHabito}
        />
      )}
      {varAdicionarHabito && (
        <AddHabit
          adicionarHabito={adicionarHabito}
          setAdicionar={setVarAdicionarHabito}
        />
      )}
    </div>
  );
}
export default App;
