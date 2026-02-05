import { useNavigate } from "react-router-dom";

function Header({ dias }) {
  const navigate = useNavigate();

  function irParaGraficos() {
    navigate("/graficos", {
      state: { dias },
    });
  }

  function irParaHome() {
    navigate("/");
  }

  return (
    <div className="flex w-full h-10 bg-slate-500 gap-3 justify-evenly">
      <button onClick={irParaHome}>Home</button>
      <button onClick={irParaGraficos}>Graficos</button>
    </div>
  );
}
export default Header;
