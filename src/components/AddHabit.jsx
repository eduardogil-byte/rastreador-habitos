import { useState } from "react";

function AddHabit(props) {
  const [entradaHabito, setEntradaHabito] = useState("");

  const cliqueiAdicionar = () => {
    if (!entradaHabito.trim()) {
      alert("Insira algo no campo");
      console.log("Coloque algo no campo de adicionar");
    } else {
      props.adicionarHabito(entradaHabito);
      props.setAdicionar(false);
    }
  };
  return (
    <div className="w-[50vw] max-w-[320px] gap-2 border-2 m-2 pt-1 flex flex-col justify-center items-center">
      <label className="flex flex-col">
        Coloque o novo habito para adicionar:
        <input
          type="text"
          placeholder="Ex: Academia"
          className="border-2 border-sky-900 rounded-md pl-1"
          value={entradaHabito}
          onChange={(event) => setEntradaHabito(event.target.value)}
        />
      </label>
      <button
        className={`w-28 border-2 mb-2 rounded border-sky-900 bg-sky-600 hover:bg-sky-700 flex justify-center items-center p-1`}
        onClick={() => cliqueiAdicionar()}
      >
        Adicionar
      </button>
    </div>
  );
}
export default AddHabit;
