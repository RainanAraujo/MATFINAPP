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
  tipo: z.enum([
    "Composto Racional",
    "Composto Comercial",
    "Simples Racional",
    "Simples Comercial",
  ]),
  vNominal: z.string().optional(),
  taxaDesconto: z.object({
    valor: z.string().optional(),
    periodo: z.enum(["dia", "mes", "semestre", "ano"]),
  }),
  tempo: z.object({
    valor: z.string().optional(),
    periodo: z.enum(["dia", "mes", "semestre", "ano"]),
  }),
  vDescontado: z.string().optional(),
});

function Descontos() {
  const [resultado, setResultado] = useState<any[] | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipo: "Composto Racional",
      vNominal: "",
      taxaDesconto: {
        valor: "",
        periodo: "mes",
      },
      tempo: {
        valor: "",
        periodo: "mes",
      },
      vDescontado: "",
    },
  });
  function compostoRacional(dados: z.infer<typeof formSchema>) {
    const { vNominal, taxaDesconto, tempo, vDescontado } = dados;

    const conversaoParaAno: Record<UnidadeTempo, number> = {
      dia: 360,
      mes: 12,
      semestre: 2,
      ano: 1,
    };

    const valorVN = parseFloat(vNominal || "");
    const valorVD = parseFloat(vDescontado || "");
    const taxa = parseFloat(taxaDesconto.valor || "");
    const tempoValor = parseFloat(tempo.valor || "");

    const vazios = [
      !vNominal?.trim() ? "vNominal" : null,
      !taxaDesconto.valor?.trim() ? "taxa" : null,
      !tempo.valor?.trim() ? "tempo" : null,
      !vDescontado?.trim() ? "vDescontado" : null,
    ].filter(Boolean);

    if (vazios.length !== 1) {
      toast.error("Preencha todos os campos, exceto um.");
      return;
    }

    const fatorConversao =
      conversaoParaAno[taxaDesconto.periodo] / conversaoParaAno[tempo.periodo];
    const n = tempoValor * fatorConversao;
    const i = taxa / 100;

    let resultado: { periodo: string; valor: string }[] = [];

    if (vazios[0] === "vNominal") {
      const vn = valorVD * Math.pow(1 + i, n);
      const d = vn - valorVD;
      resultado = [
        { periodo: "Valor Nominal", valor: vn.toFixed(2) },
        { periodo: "Desconto", valor: d.toFixed(2) },
      ];
    } else if (vazios[0] === "vDescontado") {
      const vd = valorVN / Math.pow(1 + i, n);
      const d = valorVN - vd;
      resultado = [
        { periodo: "Valor Descontado", valor: vd.toFixed(2) },
        { periodo: "Desconto", valor: d.toFixed(2) },
      ];
    } else if (vazios[0] === "taxa") {
      const iCalc = Math.pow(valorVN / valorVD, 1 / n) - 1;
      resultado = [
        { periodo: "Taxa de Desconto", valor: (iCalc * 100).toFixed(2) + " %" },
      ];
    } else if (vazios[0] === "tempo") {
      const t = Math.log(valorVN / valorVD) / Math.log(1 + i);
      const tempoConvertido =
        t *
        (conversaoParaAno[tempo.periodo] /
          conversaoParaAno[taxaDesconto.periodo]);
      resultado = [{ periodo: "Tempo", valor: tempoConvertido.toFixed(2) }];
    }

    setResultado(resultado);
  }

  function compostoComercial(dados: z.infer<typeof formSchema>) {
    const { vNominal, taxaDesconto, tempo, vDescontado } = dados;

    const conversaoParaAno: Record<UnidadeTempo, number> = {
      dia: 360,
      mes: 12,
      semestre: 2,
      ano: 1,
    };

    const valorVN = parseFloat(vNominal || "");
    const valorVD = parseFloat(vDescontado || "");
    const taxa = parseFloat(taxaDesconto.valor || "");
    const tempoValor = parseFloat(tempo.valor || "");

    const vazios = [
      !vNominal?.trim() ? "vNominal" : null,
      !taxaDesconto.valor?.trim() ? "taxa" : null,
      !tempo.valor?.trim() ? "tempo" : null,
      !vDescontado?.trim() ? "vDescontado" : null,
    ].filter(Boolean);

    if (vazios.length !== 1) {
      toast.error("Preencha todos os campos, exceto um.");
      return;
    }

    const fatorConversao =
      conversaoParaAno[taxaDesconto.periodo] / conversaoParaAno[tempo.periodo];
    const n = tempoValor * fatorConversao;
    const i = taxa / 100;

    let resultado: { periodo: string; valor: string }[] = [];

    if (vazios[0] === "vNominal") {
      const vn = valorVD / Math.pow(1 - i, n);
      const d = vn - valorVD;
      resultado = [
        { periodo: "Valor Nominal", valor: vn.toFixed(2) },
        { periodo: "Desconto", valor: d.toFixed(2) },
      ];
    } else if (vazios[0] === "vDescontado") {
      const vd = valorVN * Math.pow(1 - i, n);
      const d = valorVN - vd;
      resultado = [
        { periodo: "Valor Descontado", valor: vd.toFixed(2) },
        { periodo: "Desconto", valor: d.toFixed(2) },
      ];
    } else if (vazios[0] === "taxa") {
      const iCalc = 1 - Math.pow(valorVD / valorVN, 1 / n);
      resultado = [
        { periodo: "Taxa de Desconto", valor: (iCalc * 100).toFixed(2) + " %" },
      ];
    } else if (vazios[0] === "tempo") {
      const t = Math.log(valorVD / valorVN) / Math.log(1 - i);
      const tempoConvertido =
        t *
        (conversaoParaAno[tempo.periodo] /
          conversaoParaAno[taxaDesconto.periodo]);
      resultado = [{ periodo: "Tempo", valor: tempoConvertido.toFixed(2) }];
    }

    setResultado(resultado);
  }
  function simplesRacional(dados: z.infer<typeof formSchema>) {
    const { vNominal, taxaDesconto, tempo, vDescontado } = dados;

    const conversaoParaAno: Record<UnidadeTempo, number> = {
      dia: 365,
      mes: 12,
      semestre: 2,
      ano: 1,
    };

    const valorVN = parseFloat(vNominal || "");
    const valorVD = parseFloat(vDescontado || "");
    const taxa = parseFloat(taxaDesconto.valor || "");
    const tempoValor = parseFloat(tempo.valor || "");

    const vazios = [
      !vNominal?.trim() ? "vNominal" : null,
      !taxaDesconto.valor?.trim() ? "taxa" : null,
      !tempo.valor?.trim() ? "tempo" : null,
      !vDescontado?.trim() ? "vDescontado" : null,
    ].filter(Boolean);

    if (vazios.length !== 1) {
      toast.error("Preencha todos os campos, exceto um.");
      return;
    }

    const fatorConversao =
      conversaoParaAno[taxaDesconto.periodo] / conversaoParaAno[tempo.periodo];
    const n = tempoValor * fatorConversao;
    const i = taxa / 100;

    let resultado: { periodo: string; valor: string }[] = [];

    if (vazios[0] === "vNominal") {
      const vn = valorVD * (1 + i * n);
      const d = vn - valorVD;
      resultado = [
        { periodo: "Valor Nominal", valor: vn.toFixed(2) },
        { periodo: "Desconto", valor: d.toFixed(2) },
      ];
    } else if (vazios[0] === "vDescontado") {
      const vd = valorVN / (1 + i * n);
      const d = valorVN - vd;
      resultado = [
        { periodo: "Valor Descontado", valor: vd.toFixed(2) },
        { periodo: "Desconto", valor: d.toFixed(2) },
      ];
    } else if (vazios[0] === "taxa") {
      const iCalc = (valorVN - valorVD) / (valorVD * n);
      resultado = [
        { periodo: "Taxa de Desconto", valor: (iCalc * 100).toFixed(2) + " %" },
      ];
    } else if (vazios[0] === "tempo") {
      const t = (valorVN - valorVD) / (valorVD * i);
      const tempoConvertido =
        t *
        (conversaoParaAno[tempo.periodo] /
          conversaoParaAno[taxaDesconto.periodo]);
      resultado = [{ periodo: "Tempo", valor: tempoConvertido.toFixed(2) }];
    }

    setResultado(resultado);
  }
  function simplesComercial(dados: z.infer<typeof formSchema>) {
    const { vNominal, taxaDesconto, tempo, vDescontado } = dados;

    const conversaoParaAno: Record<UnidadeTempo, number> = {
      dia: 365,
      mes: 12,
      semestre: 2,
      ano: 1,
    };

    const valorVN = parseFloat(vNominal || "");
    const valorVD = parseFloat(vDescontado || "");
    const taxa = parseFloat(taxaDesconto.valor || "");
    const tempoValor = parseFloat(tempo.valor || "");

    const vazios = [
      !vNominal?.trim() ? "vNominal" : null,
      !taxaDesconto.valor?.trim() ? "taxa" : null,
      !tempo.valor?.trim() ? "tempo" : null,
      !vDescontado?.trim() ? "vDescontado" : null,
    ].filter(Boolean);

    if (vazios.length !== 1) {
      toast.error("Preencha todos os campos, exceto um.");
      return;
    }

    const fatorConversao =
      conversaoParaAno[taxaDesconto.periodo] / conversaoParaAno[tempo.periodo];
    const n = tempoValor * fatorConversao;
    const i = taxa / 100;

    let resultado: { periodo: string; valor: string }[] = [];

    if (vazios[0] === "vNominal") {
      const vn = valorVD / (1 - i * n);
      const d = vn - valorVD;
      resultado = [
        { periodo: "Valor Nominal", valor: vn.toFixed(2) },
        { periodo: "Desconto", valor: d.toFixed(2) },
      ];
    } else if (vazios[0] === "vDescontado") {
      const vd = valorVN * (1 - i * n);
      const d = valorVN - vd;
      resultado = [
        { periodo: "Valor Descontado", valor: vd.toFixed(2) },
        { periodo: "Desconto", valor: d.toFixed(2) },
      ];
    } else if (vazios[0] === "taxa") {
      const iCalc = (valorVN - valorVD) / (valorVN * n);
      resultado = [
        { periodo: "Taxa de Desconto", valor: (iCalc * 100).toFixed(2) + " %" },
      ];
    } else if (vazios[0] === "tempo") {
      const t = (valorVN - valorVD) / (valorVN * i);
      const tempoConvertido =
        t *
        (conversaoParaAno[tempo.periodo] /
          conversaoParaAno[taxaDesconto.periodo]);
      resultado = [{ periodo: "Tempo", valor: tempoConvertido.toFixed(2) }];
    }

    setResultado(resultado);
  }
  function onSubmit(data: z.infer<typeof formSchema>) {
    if (data.tipo === "Composto Racional") {
      compostoRacional(data);
    } else if (data.tipo === "Composto Comercial") {
      compostoComercial(data);
    } else if (data.tipo === "Simples Racional") {
      simplesRacional(data);
    } else if (data.tipo === "Simples Comercial") {
      simplesComercial(data);
    }
  }
  return (
    <div className="flex flex-col gap-10 h-full">
      <Navbar title="Descontos" />
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
                      <SelectItem value="Composto Racional">
                        Composto Racional
                      </SelectItem>
                      <SelectItem value="Composto Comercial">
                        Composto Comercial
                      </SelectItem>
                      <SelectItem value="Simples Racional">
                        Simples Racional
                      </SelectItem>
                      <SelectItem value="Simples Comercial">
                        Simples Comercial
                      </SelectItem>
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
            name="vNominal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor Nominal</FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                      <Money className="h-4 w-4" />
                    </div>
                    <Input
                      placeholder="Valor Nominal"
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
            name="taxaDesconto"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Taxa de Desconto</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input
                      placeholder="Valor"
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
                        <SelectItem value="semestre">% ao Semestre</SelectItem>
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
            name="vDescontado"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor Descontado (Atual)</FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                      <Money className="h-4 w-4" />
                    </div>
                    <Input
                      placeholder="Valor descontado"
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
          <div>
            {resultado && (
              <div className="flex items-center justify-center h-full w-full ">
                <div className="overflow-auto w-full">
                  <table className="min-w-full text-xs w-full ">
                    <thead>
                      <tr className=" text-left">
                        <th></th>
                        <th>Valor</th>
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
                            {linha.valor !== "-" ? `R$ ${linha.valor}` : "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
          <Button type="submit" className="w-full">
            Calcular
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Descontos;
