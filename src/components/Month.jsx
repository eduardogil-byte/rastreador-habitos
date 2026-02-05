import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
function Month(props) {
  const [aberto, setAberto] = useState(false);

  function selecioneiMes(mes) {
    props.setMesSelecionado(mes);
    setAberto(false);
  }

  return (
    <div className="relative inline-block">
      <button
        className="flex items-center justify-evenly h-10 min-w-[120px] px-3 text-center border bottom-1"
        onClick={() => setAberto(!aberto)}
      >
        {props.mesSelecionado} {aberto ? <ChevronUp /> : <ChevronDown />}
      </button>
      {aberto && (
        <ul className="absolute mt-2 w-full bg-white border rounded shadow-md z-10 w-[100%]">
          {props.months.map((m) => (
            <li
              className="px-3 py-2 cursor-pointer "
              key={m}
              onClick={() => selecioneiMes(m)}
            >
              {m}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Month;
