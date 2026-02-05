import { Check, X } from "lucide-react";
import { useEffect, useRef } from "react";

function Days(props) {
  const olderArray = props.dia;
  const newArray = olderArray.filter((dia) => dia.mes == props.mesSelecionado);
  console.log(newArray);

  const date = new Date();
  const diaAtual = date.getDate();
  const mesAtual = date.getMonth();

  const diaRef = useRef(null);
  const primeiroDiaRef = useRef(null);

  useEffect(() => {
    if (diaRef.current) {
      diaRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    } else if (primeiroDiaRef.current) {
      primeiroDiaRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "nearest",
      });
    }
  }, [props.mesSelecionado]);

  return (
    <div className="w-full overflow-x-auto">
      <ul className="flex flex-nowrap">
        {newArray.map((dia, index) => {
          const isHoje =
            dia.dia === diaAtual &&
            props.mesSelecionado === props.months[mesAtual];

          return (
            <li
              key={dia.id}
              ref={isHoje ? diaRef : index === 0 ? primeiroDiaRef : null}
            >
              <p
                className={`w-28 flex justify-center border-2 ${isHoje ? `border-sky-900 bg-sky-500` : `border-black`}`}
              >
                {dia.diaSemana} - {dia.dia}
              </p>
              <div className="w-max flex flex-col">
                {Object.keys(dia.habitos).map((h) => (
                  <button
                    className={`w-28 flex justify-center border-slate-950 border-2 ${dia.habitos[h] ? `bg-green-300` : `bg-red-300`}`}
                    key={h}
                    onClick={() => props.cliqueiHabito(dia.id, h)}
                  >
                    {dia.habitos[h] ? <Check /> : <X />}
                  </button>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default Days;
