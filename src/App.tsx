import {
  ArrowDown,
  ArrowUp,
  Calculator,
  CurrencyDollar,
  Percent,
  QuestionMark,
  Student,
} from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-between h-full items-center w-full">
      <div className="text-3xl gap-2 flex flex-col items-center font-bold text-gray-700">
        <img src="/logo.svg" alt="Logo" className="w-1/3 mx-auto mt-5" />
        MatFin App
      </div>
      <div className="flex flex-col items-center justify-center h-full gap-2 w-full">
        <button
          className="bg-[#f0f9ff] text-black px-4 py-2 rounded-lg w-full flex gap-4 items-center "
          onClick={() => navigate("/conceitos")}
        >
          <Student
            size={32}
            color="#0095f4"
            className="p-1 bg-sky-100 rounded-full"
          />
          Conceitos
        </button>
        <button
          className="bg-[#f0f9ff] text-black px-4 py-2 rounded-lg w-full flex gap-4 items-center "
          onClick={() => navigate("/calculadora_financeira")}
        >
          <Calculator
            size={32}
            color="#0095f4"
            className="p-1 bg-sky-100 rounded-full"
          />
          Calculadora Financeira
        </button>
        <button
          className="bg-[#f0f9ff] text-black px-4 py-2 rounded-lg w-full flex gap-4 items-center "
          onClick={() => navigate("/calculadora")}
        >
          <Calculator
            size={32}
            color="#0095f4"
            className="p-1 bg-sky-100 rounded-full"
          />
          Calculadora Científica
        </button>
        <button
          className="bg-[#f0f9ff] text-black px-4 py-2 rounded-lg w-full flex gap-4 items-center "
          onClick={() => navigate("/porcentagem")}
        >
          <Percent
            size={32}
            color="#0095f4"
            className="p-1 bg-sky-100 rounded-full"
          />
          Porcentagem
        </button>
        <button
          className="bg-[#f0f9ff] text-black px-4 py-2 rounded-lg w-full flex gap-4 items-center "
          onClick={() =>
            navigate("/juros", {
              state: { tipo: "simples" },
            })
          }
        >
          <ArrowUp
            size={32}
            color="#0095f4"
            className="p-1 bg-sky-100 rounded-full"
          />
          Juros simples
        </button>
        <button
          className="bg-[#f0f9ff] text-black px-4 py-2 rounded-lg w-full flex gap-4 items-center "
          onClick={() =>
            navigate("/juros", {
              state: { tipo: "composto" },
            })
          }
        >
          <ArrowUp
            size={32}
            color="#0095f4"
            className="p-1 bg-sky-100 rounded-full"
          />
          Juros compostos
        </button>
        <button
          className="bg-[#f0f9ff] text-black px-4 py-2 rounded-lg w-full flex gap-4 items-center "
          onClick={() => navigate("/financiamento")}
        >
          <CurrencyDollar
            size={32}
            color="#0095f4"
            className="p-1 bg-sky-100 rounded-full"
          />
          Financiamento
        </button>
        <button
          className="bg-[#f0f9ff] text-black px-4 py-2 rounded-lg w-full flex gap-4 items-center "
          onClick={() => navigate("/descontos")}
        >
          <ArrowDown
            size={32}
            color="#0095f4"
            className="p-1 bg-sky-100 rounded-full"
          />
          Descontos
        </button>
        <button
          className="bg-[#f0f9ff] text-black px-4 py-2 rounded-lg w-full flex gap-4 items-center "
          onClick={() => navigate("/quiz")}
        >
          <QuestionMark
            size={32}
            color="#0095f4"
            className="p-1 bg-sky-100 rounded-full"
          />
          Quiz
        </button>
      </div>
      <a
        onClick={() => navigate("/sobre")}
        className="text-gray-500 underline py-4"
      >
        Sobre o app
      </a>
    </div>
  );
}

export default App;
