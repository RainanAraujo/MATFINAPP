import Navbar from "@/components/ui/navbar";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

export default function Conceitos() {
  const conceitos = [
    {
      id: 1,
      title: "Capital",
      description:
        "Quantia no começo da aplicação. Pode ser o dinheiro investido em uma atividade econômica, o valor financiado de um bem ou de um empréstimo tomado. É denominado também de valor presente, valor inicial, valor principal, entre outros.",
    },
    {
      id: 2,
      title: "Juros",
      description:
        "É a remuneração obtida pelo uso do capital por um intervalo de tempo, isto é, o custo do crédito obtido. Pode ser entendido também como sendo o aluguel pelo uso do dinheiro.",
    },
    {
      id: 3,
      title: "Prazo",
      description:
        "É o período ao final do qual os juros são calculados. É também chamado de período de capitalização. Os mais usados são: dia, mês, bimestre, trimestre, semestre e ano.",
    },
    {
      id: 4,
      title: "Taxa de Juros",
      description:
        "É o coeficiente resultante da razão entre o juro e o capital. A cada taxa deverá vir anexado o período a que ela se refere.",
    },
    {
      id: 5,
      title: "Montante",
      description:
        "É a quantia no fim da aplicação, sendo a soma do capital aplicado e o juro produzido em um determinado período. É também chamado de valor futuro, valor final, saldo, entre outros.",
    },
    {
      id: 6,
      title: "Calendário Civil",
      description: "O ano tem 365 dias e cada mês tem o número exato de dias.",
    },
    {
      id: 7,
      title: "Calendário Comercial",
      description: "O ano tem 360 dias e cada mês tem 30 dias.",
    },
    {
      id: 8,
      title: "Porcentagem",
      description:
        "Uma porcentagem, ou percentagem, é uma medida de proporção de base 100 (cem) que representa uma fração proporcional entre dois números.",
    },
    {
      id: 9,
      title: "Regime de Capitalização Simples",
      description:
        "A taxa de juros incide diretamente sobre o valor do capital. Em cada período, o juro é obtido pelo produto do capital inicial pela taxa unitária. Desta forma, os juros são iguais em cada período. É também chamado de Juros Simples.",
    },
    {
      id: 10,
      title: "Regime de Capitalização Composta",
      description:
        "A taxa de juros incide diretamente sobre o valor do montante do período anterior. É também chamado de Juros Compostos.",
    },
    {
      id: 11,
      title: "Taxas proporcionais",
      description:
        "As taxas i₁ e i₂ são ditas proporcionais se, com relação aos períodos n₁ e n₂, expressos na mesma unidade de tempo, ocorrer: ",
      equacao: "\frac{i_1}{n_1} = \frac{i_2}{n_2}",
    },
    {
      id: 12,
      title: "Taxas equivalentes",
      description:
        "São taxas que são dadas em referências temporais diferentes, mas produzem o mesmo montante se aplicadas ao mesmo capital, em um mesmo período.",
    },
    {
      id: 13,
      title: "Taxa nominal",
      description:
        "É aquela que está definida em período diferente do período de capitalização.",
    },
    {
      id: 14,
      title: "Taxa efetiva",
      description: "É aquela utilizada no cálculo dos juros.",
    },
  ];
  return (
    <div className="flex flex-col gap-10 h-full">
      <Navbar title="Conceitos" />
      <div className="flex flex-col gap-4 ">
        {conceitos.map((conceito) => (
          <div
            key={conceito.id}
            className="bg-[#f0f9ff] text-black px-4 py-2 rounded-lg"
          >
            <h2 className="text-xl font-bold">{conceito.title}</h2>
            <p>{conceito.description}</p>
            {conceito.equacao && (
              <BlockMath math="\frac{i_1}{n_1} = \frac{i_2}{n_2}" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
