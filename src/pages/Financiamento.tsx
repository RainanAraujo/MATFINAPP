import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Navbar from "../components/ui/navbar";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Money } from "@phosphor-icons/react";
import clsx from "clsx";

type UnidadeTempo = "dia" | "mes" | "semestre" | "ano";

const formSchema = z.object({
  tipo: z.enum(["SAC", "SAF", "PRICE", "SAM", "SAA"]),
  vPrincipal: z.string().optional(),
  taxaJuros: z.object({
    valor: z.string().optional(),
    periodo: z.enum(["dia", "mes", "semestre", "ano"]),
  }),
  tempo: z.object({
    valor: z.string().optional(),
    periodo: z.enum(["dia", "mes", "semestre", "ano"]),
  }),
  vPrimeira: z.string().optional(),
});

function Financiamento() {
  const [resultado, setResultado] = useState<any[] | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipo: "SAC",
      vPrincipal: "",
      taxaJuros: {
        valor: "",
        periodo: "mes",
      },
      tempo: {
        valor: "",
        periodo: "mes",
      },
      vPrimeira: "",
    },
  });
  function calcularSAC(dados: z.infer<typeof formSchema>) {
    const { vPrincipal, taxaJuros, tempo, vPrimeira } = dados;

    const conversaoParaAno: Record<UnidadeTempo, number> = {
      dia: 360,
      mes: 12,
      semestre: 2,
      ano: 1,
    };

    const vp = parseFloat(vPrincipal || "");
    const taxa = parseFloat(taxaJuros.valor || "");
    const tempoValor = parseFloat(tempo.valor || "");
    const vPrimeiraNum = parseFloat(vPrimeira || "");

    const vazios = [
      !vPrincipal?.trim() ? "vPrincipal" : null,
      !taxaJuros.valor?.trim() ? "taxa" : null,
      !tempo.valor?.trim() ? "tempo" : null,
      !vPrimeira?.trim() ? "vPrimeira" : null,
    ].filter(Boolean);

    if (vazios.length !== 1) {
      toast.error("Preencha todos os campos, exceto um.");
      return;
    }

    const taxaPeriodo = taxa / 100;

    // Cálculo do número de períodos com base nas unidades relativas entre tempo e taxa
    const nPeriodos =
      tempoValor *
      (conversaoParaAno[taxaJuros.periodo] / conversaoParaAno[tempo.periodo]);

    let valorPrincipal = vp;
    let prazo = nPeriodos;
    let jurosPorPeriodo = taxaPeriodo;
    let primeiraParcela = vPrimeiraNum;

    if (vazios[0] === "vPrincipal") {
      const amortizacao = primeiraParcela / (1 + jurosPorPeriodo);
      valorPrincipal = amortizacao * prazo;
    } else if (vazios[0] === "tempo") {
      const amortizacao = valorPrincipal * jurosPorPeriodo;
      prazo = Math.round(primeiraParcela / amortizacao);
    } else if (vazios[0] === "taxa") {
      const amortizacao = valorPrincipal / prazo;
      const i = (primeiraParcela - amortizacao) / valorPrincipal;
      jurosPorPeriodo = i;
    } else if (vazios[0] === "vPrimeira") {
      const amortizacao = valorPrincipal / prazo;
      primeiraParcela = amortizacao + valorPrincipal * jurosPorPeriodo;
    }

    const amortizacao = valorPrincipal / prazo;
    let saldoDevedor = valorPrincipal;
    const tabela: any[] = [];

    for (let i = 1; i <= prazo; i++) {
      const juros = saldoDevedor * jurosPorPeriodo;
      const parcela = amortizacao + juros;
      tabela.push({
        periodo: i,
        amortizacao: amortizacao,
        juros: juros,
        parcelaTotal: parcela,
        saldo: saldoDevedor - amortizacao,
      });
      saldoDevedor -= amortizacao;
    }

    const totalAmortizacao = tabela.reduce(
      (acc, cur) => acc + cur.amortizacao,
      0
    );
    const totalJuros = tabela.reduce((acc, cur) => acc + cur.juros, 0);
    const totalParcelas = tabela.reduce(
      (acc, cur) => acc + cur.parcelaTotal,
      0
    );

    tabela.push({
      periodo: "Total",
      amortizacao: totalAmortizacao,
      juros: totalJuros,
      parcelaTotal: totalParcelas,
      saldo: "-",
    });

    // Formatação para exibição
    const tabelaFormatada = tabela.map((linha) => ({
      periodo: linha.periodo,
      amortizacao:
        typeof linha.amortizacao === "number"
          ? linha.amortizacao.toFixed(2)
          : linha.amortizacao,
      juros:
        typeof linha.juros === "number" ? linha.juros.toFixed(2) : linha.juros,
      parcelaTotal:
        typeof linha.parcelaTotal === "number"
          ? linha.parcelaTotal.toFixed(2)
          : linha.parcelaTotal,
      saldo:
        typeof linha.saldo === "number" ? linha.saldo.toFixed(2) : linha.saldo,
    }));
    if (tabelaFormatada.length > 1) {
      setResultado(tabelaFormatada);
    } else {
      toast.error("O tempo é menor do que o período de juros.");
      return;
    }
  }
  function calcularPRICE(dados: z.infer<typeof formSchema>) {
    const { vPrincipal, taxaJuros, tempo, vPrimeira } = dados;

    const conversaoDias: Record<UnidadeTempo, number> = {
      dia: 1,
      mes: 30,
      semestre: 180,
      ano: 360,
    };

    const vp = parseFloat(vPrincipal || "");
    const taxa = parseFloat(taxaJuros.valor || "");
    const tempoValor = parseFloat(tempo.valor || "");
    const vPrimeiraNum = parseFloat(vPrimeira || "");

    const vazios = [
      !vPrincipal?.trim() ? "vPrincipal" : null,
      !taxaJuros.valor?.trim() ? "taxa" : null,
      !tempo.valor?.trim() ? "tempo" : null,
      !vPrimeira?.trim() ? "vPrimeira" : null,
    ].filter(Boolean);

    if (vazios.length !== 1) {
      toast.error("Preencha todos os campos, exceto um.");
      return;
    }

    const tempoEmDias = tempoValor * conversaoDias[tempo.periodo];
    const duracaoPeriodo = conversaoDias[taxaJuros.periodo];

    if (tempoEmDias < duracaoPeriodo) {
      toast.error(
        "O tempo informado não é suficiente para completar um período da taxa."
      );
      return;
    }

    const nPeriodos = Math.floor(tempoEmDias / duracaoPeriodo);

    if (nPeriodos < 1) {
      toast.error(
        "Número de períodos inválido. Verifique a unidade de tempo e taxa."
      );
      return;
    }

    let valorPrincipal = vp;
    let prazo = nPeriodos;
    let jurosPorPeriodo = taxa / 100;
    let primeiraParcela = vPrimeiraNum;

    if (vazios[0] === "vPrincipal") {
      const parcelaFixaTemp =
        (primeiraParcela * (1 - Math.pow(1 + jurosPorPeriodo, -prazo))) /
        jurosPorPeriodo;
      valorPrincipal = parcelaFixaTemp;
    } else if (vazios[0] === "tempo") {
      const parcelaFixaTemp =
        (valorPrincipal * jurosPorPeriodo) /
        (1 - Math.pow(1 + jurosPorPeriodo, -prazo));
      prazo = Math.round(
        Math.log(
          parcelaFixaTemp / (parcelaFixaTemp - valorPrincipal * jurosPorPeriodo)
        ) / Math.log(1 + jurosPorPeriodo)
      );
    } else if (vazios[0] === "taxa") {
      const parcelaFixaTemp = primeiraParcela;
      jurosPorPeriodo =
        Math.pow(
          parcelaFixaTemp / (parcelaFixaTemp - valorPrincipal),
          1 / prazo
        ) - 1;
    } else if (vazios[0] === "vPrimeira") {
      primeiraParcela =
        valorPrincipal *
        (jurosPorPeriodo / (1 - Math.pow(1 + jurosPorPeriodo, -prazo)));
    }

    const parcelaFixa =
      valorPrincipal *
      (jurosPorPeriodo / (1 - Math.pow(1 + jurosPorPeriodo, -prazo)));

    let saldoDevedor = valorPrincipal;
    let totalAmortizacao = 0;
    let totalJuros = 0;
    let totalParcelas = 0;
    const tabela = [];

    for (let i = 1; i <= prazo; i++) {
      const juros = saldoDevedor * jurosPorPeriodo;
      const amortizacao = parcelaFixa - juros;
      saldoDevedor -= amortizacao;

      totalAmortizacao += amortizacao;
      totalJuros += juros;
      totalParcelas += parcelaFixa;

      tabela.push({
        periodo: i,
        amortizacao,
        juros,
        parcelaTotal: parcelaFixa,
        saldo: saldoDevedor > 0 ? saldoDevedor : 0,
      });
    }

    tabela.push({
      periodo: "Total",
      amortizacao: totalAmortizacao,
      juros: totalJuros,
      parcelaTotal: totalParcelas,
      saldo: "-",
    });

    const tabelaFinal = tabela.map((linha) => ({
      periodo: linha.periodo,
      amortizacao:
        typeof linha.amortizacao === "number"
          ? linha.amortizacao.toFixed(2)
          : linha.amortizacao,
      juros:
        typeof linha.juros === "number" ? linha.juros.toFixed(2) : linha.juros,
      parcelaTotal:
        typeof linha.parcelaTotal === "number"
          ? linha.parcelaTotal.toFixed(2)
          : linha.parcelaTotal,
      saldo:
        typeof linha.saldo === "number" ? linha.saldo.toFixed(2) : linha.saldo,
    }));

    setResultado(tabelaFinal);
  }
  function calcularSAM(dados: z.infer<typeof formSchema>) {
    const { vPrincipal, taxaJuros, tempo, vPrimeira } = dados;

    const conversaoParaAno: Record<UnidadeTempo, number> = {
      dia: 360,
      mes: 12,
      semestre: 2,
      ano: 1,
    };

    const vp = parseFloat(vPrincipal || "");
    const taxa = parseFloat(taxaJuros.valor || "");
    const tempoValor = parseFloat(tempo.valor || "");
    const vPrimeiraNum = parseFloat(vPrimeira || "");

    const vazios = [
      !vPrincipal?.trim() ? "vPrincipal" : null,
      !taxaJuros.valor?.trim() ? "taxa" : null,
      !tempo.valor?.trim() ? "tempo" : null,
      !vPrimeira?.trim() ? "vPrimeira" : null,
    ].filter(Boolean);

    if (vazios.length !== 1) {
      toast.error("Preencha todos os campos, exceto um.");
      return;
    }

    const fatorConversao =
      conversaoParaAno[taxaJuros.periodo] / conversaoParaAno[tempo.periodo];
    const nPeriodos = tempoValor * fatorConversao;

    if (nPeriodos < 1 || !isFinite(nPeriodos)) {
      toast.error("O tempo é menor do que o período de juros.");
      return;
    }

    const prazo = nPeriodos;
    const taxaPorPeriodo = taxa / 100;

    let valorPrincipalCalculado = vp;

    if (vazios[0] === "vPrincipal") {
      // Estimar valor principal com base na inversão da SAM
      // Fórmula SAM: parcelaSAM = (parcelaSAC + parcelaPRICE) / 2
      // Vamos inverter isso com aproximação

      const estimarVP = (p: number) => {
        let vpEstimado = 1;

        const tolerancia = 0.01;

        for (let tentativa = 0; tentativa < 10000; tentativa++) {
          const amortizacaoSAC = vpEstimado / prazo;
          const parcelaSAC = amortizacaoSAC + vpEstimado * taxaPorPeriodo;
          const parcelaPRICE =
            vpEstimado *
            (taxaPorPeriodo / (1 - Math.pow(1 + taxaPorPeriodo, -prazo)));
          const parcelaSAM = (parcelaSAC + parcelaPRICE) / 2;

          const erroAtual = Math.abs(parcelaSAM - p);

          if (erroAtual < tolerancia) {
            return vpEstimado;
          }

          // Ajuste
          vpEstimado *= p / parcelaSAM;
        }

        return NaN; // falhou
      };

      valorPrincipalCalculado = estimarVP(vPrimeiraNum);

      if (!isFinite(valorPrincipalCalculado)) {
        toast.error("Não foi possível estimar o valor principal.");
        return;
      }
    }

    // Agora com valorPrincipalCalculado definido
    const valorPrincipal = valorPrincipalCalculado;

    // Cálculo padrão
    const parcelaPRICE =
      valorPrincipal *
      (taxaPorPeriodo / (1 - Math.pow(1 + taxaPorPeriodo, -prazo)));

    const amortizacaoSAC = valorPrincipal / prazo;
    let saldoDevedor = valorPrincipal;

    let totalAmortizacao = 0;
    let totalJuros = 0;
    let totalParcelas = 0;

    const tabela = [];

    for (let i = 1; i <= prazo; i++) {
      const juros = saldoDevedor * taxaPorPeriodo;
      const parcelaSAC = amortizacaoSAC + juros;

      const parcelaSAM = (parcelaSAC + parcelaPRICE) / 2;
      const amortizacaoSAM = parcelaSAM - juros;

      totalAmortizacao += amortizacaoSAM;
      totalJuros += juros;
      totalParcelas += parcelaSAM;

      saldoDevedor -= amortizacaoSAM;

      tabela.push({
        periodo: i,
        amortizacao: amortizacaoSAM,
        juros: juros,
        parcelaTotal: parcelaSAM,
        saldo: saldoDevedor > 0 ? saldoDevedor : 0,
      });
    }

    tabela.push({
      periodo: "Total",
      amortizacao: totalAmortizacao,
      juros: totalJuros,
      parcelaTotal: totalParcelas,
      saldo: "-",
    });

    const tabelaFinal = tabela.map((linha) => ({
      periodo: linha.periodo,
      amortizacao:
        typeof linha.amortizacao === "number"
          ? linha.amortizacao.toFixed(2)
          : linha.amortizacao,
      juros:
        typeof linha.juros === "number" ? linha.juros.toFixed(2) : linha.juros,
      parcelaTotal:
        typeof linha.parcelaTotal === "number"
          ? linha.parcelaTotal.toFixed(2)
          : linha.parcelaTotal,
      saldo:
        typeof linha.saldo === "number" ? linha.saldo.toFixed(2) : linha.saldo,
    }));

    if (tabelaFinal.length > 1) {
      setResultado(tabelaFinal);
    } else {
      toast.error("Erro ao gerar a tabela.");
    }
  }
  function calcularSAA(dados: z.infer<typeof formSchema>) {
    const { vPrincipal, taxaJuros, tempo, vPrimeira } = dados;

    const conversaoParaAno: Record<UnidadeTempo, number> = {
      dia: 360,
      mes: 12,
      semestre: 2,
      ano: 1,
    };

    const vp = parseFloat(vPrincipal || "");
    const taxa = parseFloat(taxaJuros.valor || "");
    const tempoValor = parseFloat(tempo.valor || "");
    const vPrimeiraNum = parseFloat(vPrimeira || "");

    const vazios = [
      !vPrincipal?.trim() ? "vPrincipal" : null,
      !taxaJuros.valor?.trim() ? "taxa" : null,
      !tempo.valor?.trim() ? "tempo" : null,
      !vPrimeira?.trim() ? "vPrimeira" : null,
    ].filter(Boolean);

    if (vazios.length !== 1) {
      toast.error("Preencha todos os campos, exceto um.");
      return;
    }

    const fatorConversao =
      conversaoParaAno[taxaJuros.periodo] / conversaoParaAno[tempo.periodo];
    const nPeriodos = tempoValor * fatorConversao;
    if (nPeriodos < 1 || !isFinite(nPeriodos)) {
      toast.error("O tempo é menor do que o período de juros.");
      return;
    }

    let valorPrincipal = vp;
    let taxaPorPeriodo = taxa / 100;
    let prazo = nPeriodos;
    let primeiraParcela = vPrimeiraNum;

    if (vazios[0] === "vPrincipal") {
      const juros = primeiraParcela;
      valorPrincipal = juros / taxaPorPeriodo;
    } else if (vazios[0] === "taxa") {
      const juros = primeiraParcela;
      taxaPorPeriodo = juros / valorPrincipal;
    } else if (vazios[0] === "tempo") {
      const juros = valorPrincipal * taxaPorPeriodo;
      prazo = Math.round(vPrimeiraNum / juros);
    } else if (vazios[0] === "vPrimeira") {
      primeiraParcela = valorPrincipal * taxaPorPeriodo;
    }

    const jurosPorPeriodo = valorPrincipal * taxaPorPeriodo;

    let totalJuros = 0;
    let totalParcelas = 0;
    const tabela = [];

    for (let i = 1; i <= prazo; i++) {
      const amortizacao = i === prazo ? valorPrincipal : 0;
      const parcela = jurosPorPeriodo + amortizacao;

      totalJuros += jurosPorPeriodo;
      totalParcelas += parcela;

      tabela.push({
        periodo: i,
        amortizacao,
        juros: jurosPorPeriodo,
        parcelaTotal: parcela,
        saldo: i === prazo ? 0 : valorPrincipal,
      });
    }

    tabela.push({
      periodo: "Total",
      amortizacao: valorPrincipal,
      juros: totalJuros,
      parcelaTotal: totalParcelas,
      saldo: "-",
    });

    const tabelaFinal = tabela.map((linha) => ({
      periodo: linha.periodo,
      amortizacao:
        typeof linha.amortizacao === "number"
          ? linha.amortizacao.toFixed(2)
          : linha.amortizacao,
      juros:
        typeof linha.juros === "number" ? linha.juros.toFixed(2) : linha.juros,
      parcelaTotal:
        typeof linha.parcelaTotal === "number"
          ? linha.parcelaTotal.toFixed(2)
          : linha.parcelaTotal,
      saldo:
        typeof linha.saldo === "number" ? linha.saldo.toFixed(2) : linha.saldo,
    }));

    setResultado(tabelaFinal);
  }
  function onSubmit(data: z.infer<typeof formSchema>) {
    if (data.tipo === "SAC") {
      calcularSAC(data);
    } else if (data.tipo === "PRICE") {
      calcularPRICE(data);
    } else if (data.tipo === "SAF") {
      calcularPRICE(data);
    } else if (data.tipo === "SAM") {
      calcularSAM(data);
    } else if (data.tipo === "SAA") {
      calcularSAA(data);
    }
  }
  return (
    <div className="flex flex-col  h-full bg-primary">
      <Navbar title="Financiamento" />
      <div className="flex flex-col gap-10 h-full p-5 pt-10 rounded-t-2xl bg-white">
        <p className="text-sm text-center text-gray-500">
          Deixe em branco apenas o valor que você quer descobrir e clique em
          calcular.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex gap-4 flex-col"
            onChange={() => {
              setResultado(null);
            }}
          >
            <FormField
              control={form.control}
              name="tipo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de cálculo</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o tipo de calculo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SAC">SAC</SelectItem>
                        <SelectItem value="SAF">SAF</SelectItem>
                        <SelectItem value="PRICE">PRICE</SelectItem>
                        <SelectItem value="SAM">SAM</SelectItem>
                        <SelectItem value="SAA">SAA</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vPrincipal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor Principal</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                        <Money className="h-4 w-4" />
                      </div>
                      <Input
                        placeholder="Valor principal"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        {...field}
                        className="w-full  pl-8"
                      />
                    </div>
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="taxaJuros"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Taxa de Juros</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input
                        placeholder="Valor"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        onChange={(e) => {
                          field.onChange({
                            ...field.value,
                            valor: e.target.value,
                          });
                        }}
                        value={field.value.valor}
                        className="w-full"
                      />
                    </FormControl>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange({
                            ...field.value,
                            periodo: value,
                          });
                        }}
                        defaultValue={field.value.periodo}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione o periodo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dia">% ao Dia</SelectItem>
                          <SelectItem value="mes">% ao Mês</SelectItem>
                          <SelectItem value="semestre">
                            % ao Semestre
                          </SelectItem>
                          <SelectItem value="ano">% ao Ano</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>

                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tempo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tempo</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input
                        placeholder="Valor"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        onChange={(e) => {
                          field.onChange({
                            ...field.value,
                            valor: e.target.value,
                          });
                        }}
                        value={field.value.valor}
                        className="w-full"
                      />
                    </FormControl>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange({
                            ...field.value,
                            periodo: value,
                          });
                        }}
                        defaultValue={field.value.periodo}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione o periodo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dia">Dia</SelectItem>
                          <SelectItem value="mes">Mês</SelectItem>
                          <SelectItem value="semestre">Semestre</SelectItem>
                          <SelectItem value="ano">Ano</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>

                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vPrimeira"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor da Primeira Parcela</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                        <Money className="h-4 w-4" />
                      </div>
                      <Input
                        placeholder="Valor da primeira parcela"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        {...field}
                        className="w-full  pl-8"
                      />
                    </div>
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-[#00a63e]">
              Calcular
            </Button>
            <div>
              {resultado && (
                <div className="flex items-center justify-center h-full pb-10">
                  <div className="overflow-auto">
                    <table className="min-w-full text-xs">
                      <thead>
                        <tr className=" text-left">
                          <th>Período</th> <th>Saldo devedor</th>
                          <th>Amortização</th>
                          <th>Juros</th>
                          <th>
                            Prestação
                            {form.getValues("taxaJuros.periodo") === "mes"
                              ? "/mês"
                              : form.getValues("taxaJuros.periodo") ===
                                "semestre"
                              ? "/seme."
                              : form.getValues("taxaJuros.periodo") === "ano"
                              ? "/ano"
                              : form.getValues("taxaJuros.periodo") === "dia"}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {resultado.map((linha) => (
                          <tr
                            key={linha.parcela}
                            className={clsx(
                              linha.periodo === "Total" && "bg-[#f0f0f0]"
                            )}
                          >
                            <td className="font-semibold">{linha.periodo}</td>
                            <td>
                              {linha.saldo !== "-" ? `R$ ${linha.saldo}` : "-"}
                            </td>
                            <td>R$ {linha.amortizacao}</td>
                            <td>R$ {linha.juros}</td>
                            <td>R$ {linha.parcelaTotal}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Financiamento;
