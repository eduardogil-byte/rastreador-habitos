import { X } from "lucide-react";

function Habitos(props) {
  const arrayHabit = props.listaHabitos;

  const cliqueEditar = () => {
    props.setSelecionarEdicao(!props.selecinarEdicao);
    if (props.selecinarEdicao) {
      props.setVarAdicionarHabito(false);
    }
  };

  return (
    <div className="flex flex-col">
      <p className="w-28 flex justify-center border-2 border-black">Dias</p>
      <div className=" flex flex-col">
        {arrayHabit.map((habit) => (
          <div className="relative w-28" key={habit}>
            {props.selecinarEdicao && (
              <button
                className="absolute bottom-1 right-1 hover:text-red-600"
                onClick={() => props.setterConfimarRemocao(habit)}
              >
                <X />
              </button>
            )}

            <p
              key={habit}
              className="pr-2 flex justify-center border-slate-950 border-2 "
            >
              {habit}
            </p>
          </div>
        ))}
      </div>
      <button
        className="w-28 border-2 flex justify-center items-center rounded border-sky-900 bg-sky-500 hover:bg-sky-600"
        onClick={() => cliqueEditar()}
      >
        Editar
      </button>
    </div>
  );
}
export default Habitos;
