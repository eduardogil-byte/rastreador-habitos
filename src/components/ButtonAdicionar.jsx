function ButtonAdicionar({ setVarAdicionarHabito, varAdicionarHabito }) {
  return (
    <button
      className="w-28 border-2 flex justify-center items-center rounded border-sky-900 bg-sky-500 hover:bg-sky-600"
      onClick={() => setVarAdicionarHabito(!varAdicionarHabito)}
    >
      Adicionar
    </button>
  );
}
export default ButtonAdicionar;
