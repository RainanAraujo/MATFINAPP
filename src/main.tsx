import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout.tsx";
import Calculadora from "./pages/Calculadora.tsx";
import Juros from "./pages/Juros.tsx";
import App from "./App.tsx";
import Porcentagem from "./pages/Porcentagem.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import Sobre from "./pages/Sobre.tsx";
import CalculatorFinanceira from "./pages/CalculadoraFinanceira.tsx";
import Financiamento from "./pages/Financiamento.tsx";
import QuizPage from "./pages/Quiz.tsx";
import Descontos from "./pages/Descontos.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<App />} />
        <Route path="/calculadora" element={<Calculadora />} />
        <Route
          path="/calculadora_financeira"
          element={<CalculatorFinanceira />}
        />
        <Route path="/porcentagem" element={<Porcentagem />} />
        <Route path="/juros" element={<Juros />} />
        <Route path="/financiamento" element={<Financiamento />} />
        <Route path="/descontos" element={<Descontos />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/sobre" element={<Sobre />} />
      </Route>
    </Routes>

    <Toaster visibleToasts={1} />
  </BrowserRouter>
);
