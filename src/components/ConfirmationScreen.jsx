function ConfirmationScreen({
  saveHabit,
  removerHabito,
  setConfirmarRemoverHabito,
}) {
  const respotaSim = () => {
    (removerHabito(saveHabit), setConfirmarRemoverHabito(false));
  };

  console.log(`Salva habit: ${saveHabit}`);

  return (
    <div className="fixed w-screen h-screen bg-black bg-opacity-30 flex justify-center items-center z-40">
      <div className="bg-slate-50 w-[40vw] h-[40vh] border-2 border-slate-900 shadow-xl flex justify-center items-center flex-col gap-1">
        <div className="flex justify-center items-center flex-col gap-4">
          <h1 className="font-bold text-xl">Confirmaçâo</h1>
          <p className="text-base">Tem certeza que quer remover: </p>
          <p className="font-semibold pb-1 text-lg">{saveHabit}</p>
        </div>
        <div className="w-[40vw] flex justify-evenly items-center">
          <button
            className="text-lg border-2 w-16 bg-red-500 hover:bg-red-600 border-slate-900"
            onClick={() => setConfirmarRemoverHabito(false)}
          >
            Não
          </button>
          <button
            className="text-lg border-2 w-16 bg-green-500 hover:bg-green-600 border-slate-900"
            onClick={() => respotaSim()}
          >
            Sim
          </button>
        </div>
      </div>
    </div>
  );
}
export default ConfirmationScreen;
