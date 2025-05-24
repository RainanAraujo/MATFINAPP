import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import Navbar from "@/components/ui/navbar";
import { Money } from "@phosphor-icons/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

type UnidadeTempo = "dia" | "mes" | "ano" | "semestre";

type CampoComUnidade = {
  valor?: string;
  unidade?: UnidadeTempo;
};

type FormData = {
  valorPresente?: string;
  valorFuturo?: string;
  taxa?: CampoComUnidade;
  tempo?: CampoComUnidade;
};

const formSchema = z.object({
  valorPresente: z.string().optional(),
  taxa: z
    .object({
      valor: z.string(),
      unidade: z.enum(["mes", "ano", "semestre", "dia"]),
    })
    .optional(),
  tempo: z
    .object({
      valor: z.string(),
      unidade: z.enum(["mes", "ano", "semestre", "dia"]),
    })
    .optional(),
  valorFuturo: z.string().optional(),
});

export default function Juros() {
  const location = useLocation();
  const { tipo } = location.state || {};

  const [resultado, setResultado] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      valorPresente: "",
      taxa: {
        valor: "",
        unidade: "mes",
      },
      tempo: {
        valor: "",
        unidade: "mes",
      },
      valorFuturo: "",
    },
  });

  function onSubmit(data: FormData) {
    if (tipo === "simples") calcularJurosSimples(data);
    else if (tipo === "composto") calcularJurosCompostos(data);
  }

  function calcularJurosSimples(dados: FormData) {
    const { valorPresente, valorFuturo, taxa, tempo } = dados;

    const conversao: Record<UnidadeTempo, number> = {
      dia: 365,
      mes: 12,
      ano: 1,
      semestre: 2,
    };

    const VP = parseFloat(valorPresente || "");
    const VF = parseFloat(valorFuturo || "");
    const taxaNum = parseFloat(taxa?.valor?.replace(",", ".") || "");
    const tempoNum = parseFloat(tempo?.valor || "");

    const camposVazios = [
      !valorPresente?.trim() ? "valorPresente" : null,
      !valorFuturo?.trim() ? "valorFuturo" : null,
      !taxa?.valor?.trim() ? "taxa" : null,
      !tempo?.valor?.trim() ? "tempo" : null,
    ].filter(Boolean);

    if (camposVazios.length !== 1) {
      setResultado(null);
      toast.error("Deixe apenas um campo vazio para calcular o resultado.");
      return;
    }

    switch (camposVazios[0]) {
      case "valorFuturo":
        if (isNaN(VP) || isNaN(taxaNum) || !tempo?.unidade || isNaN(tempoNum))
          return;
        const t1 = tempoNum * (conversao["mes"] / conversao[tempo.unidade]);
        setResultado((VP * (1 + (taxaNum / 100) * t1)).toFixed(2));
        break;

      case "valorPresente":
        if (isNaN(VF) || isNaN(taxaNum) || !tempo?.unidade || isNaN(tempoNum))
          return;
        const t2 = tempoNum * (conversao["mes"] / conversao[tempo.unidade]);
        setResultado((VF / (1 + (taxaNum / 100) * t2)).toFixed(2));
        break;

      case "taxa":
        if (isNaN(VP) || isNaN(VF) || !tempo?.unidade || isNaN(tempoNum))
          return;
        const t3 = tempoNum * (conversao["mes"] / conversao[tempo.unidade]);
        const i = ((VF - VP) / (VP * t3)) * 100;
        setResultado(i.toFixed(4));
        break;

      case "tempo":
        if (isNaN(VP) || isNaN(VF) || isNaN(taxaNum)) return;
        const tempoSimples = (VF - VP) / (VP * (taxaNum / 100));
        setResultado(tempoSimples.toFixed(2)); // em unidades da taxa
        break;

      default:
        return;
    }
  }

  function calcularJurosCompostos(dados: FormData) {
    const { valorPresente, valorFuturo, taxa, tempo } = dados;

    const conversao: Record<UnidadeTempo, number> = {
      dia: 365,
      mes: 12,
      ano: 1,
      semestre: 2,
    };

    const VP = parseFloat(valorPresente || "");
    const VF = parseFloat(valorFuturo || "");
    const taxaNum = parseFloat(taxa?.valor?.replace(",", ".") || "");
    const tempoNum = parseFloat(tempo?.valor || "");

    // Converte o tempo para a mesma unidade da taxa
    const tempoConvertido =
      tempo && taxa
        ? tempoNum * (conversao[tempo.unidade!] / conversao[taxa.unidade!])
        : undefined;

    const camposVazios = [
      !valorPresente?.trim() ? "valorPresente" : null,
      !valorFuturo?.trim() ? "valorFuturo" : null,
      !taxa?.valor?.trim() ? "taxa" : null,
      !tempo?.valor?.trim() ? "tempo" : null,
    ].filter(Boolean);

    if (camposVazios.length !== 1) {
      setResultado(null);
      return;
    }

    switch (camposVazios[0]) {
      case "valorFuturo":
        if (isNaN(VP) || isNaN(taxaNum) || isNaN(tempoConvertido!)) return;
        setResultado(
          (VP * Math.pow(1 + taxaNum / 100, tempoConvertido!)).toFixed(2)
        );
        break;

      case "valorPresente":
        if (isNaN(VF) || isNaN(taxaNum) || isNaN(tempoConvertido!)) return;
        setResultado(
          (VF / Math.pow(1 + taxaNum / 100, tempoConvertido!)).toFixed(2)
        );
        break;

      case "taxa":
        if (isNaN(VP) || isNaN(VF) || !tempo?.unidade || isNaN(tempoNum))
          return;
        const tempoEmMeses =
          tempoNum * (conversao[taxa?.unidade!] / conversao[tempo.unidade]);

        // agora aplica na fórmula da taxa mensal
        const taxaMensal = Math.pow(VF / VP, 1 / tempoEmMeses) - 1;

        // exibe como porcentagem
        setResultado((taxaMensal * 100).toFixed(4));
        break;

      case "tempo":
        if (isNaN(VP) || isNaN(VF) || isNaN(taxaNum)) return;
        const t = Math.log(VF / VP) / Math.log(1 + taxaNum / 100);
        setResultado(t.toFixed(2));
        break;

      default:
        return;
    }
  }

  return (
    <div className="flex flex-col gap-8  bg-primary justify-between">
      <Navbar
        title={tipo! == "composto" ? "Juros Compostos" : "Juros Simples"}
      />

      <div className="flex flex-col gap-4 p-5 rounded-t-2xl bg-white">
        <p className="text-sm text-center text-gray-500">
          Deixe em branco apenas o valor que você quer descobrir e clique em
          calcular.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onChange={() => {
              setResultado(null);
            }}
            className="flex gap-4 flex-col"
          >
            <FormField
              control={form.control}
              name="valorPresente"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor presente</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                        <Money className="h-4 w-4" />
                      </div>
                      <Input
                        placeholder="Valor presente"
                        type="number"
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
              name="taxa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Taxa de juros</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input
                        onChange={(e) => {
                          field.onChange({
                            ...field.value,
                            valor: e.target.value,
                          });
                        }}
                        type="number"
                        value={field.value?.valor}
                        placeholder="Taxa de juros"
                        className="w-full"
                      />{" "}
                      <Select
                        onValueChange={(value) => {
                          field.onChange({
                            ...field.value,
                            unidade: value as UnidadeTempo,
                          });
                        }}
                        defaultValue={field.value?.unidade}
                        value={field.value?.unidade}
                      >
                        <SelectTrigger className="w-[220px]">
                          <SelectValue placeholder="Unidade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mes">% ao Mês</SelectItem>
                          <SelectItem value="ano">% ao Ano</SelectItem>
                          <SelectItem value="semestre">
                            % ao Semestre
                          </SelectItem>
                          <SelectItem value="dia">% ao Dia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>
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
                  <FormControl>
                    <div className="flex gap-2">
                      <Input
                        onChange={(e) => {
                          field.onChange({
                            ...field.value,
                            valor: e.target.value,
                          });
                        }}
                        value={field.value?.valor}
                        placeholder="Tempo"
                        type="number"
                        className="w-full"
                      />
                      {form.watch("tempo")?.valor != "" && (
                        <Select
                          onValueChange={(value) => {
                            field.onChange({
                              ...field.value,
                              unidade: value as UnidadeTempo,
                            });
                          }}
                          defaultValue={field.value?.unidade}
                          value={field.value?.unidade}
                        >
                          <SelectTrigger className="w-[220px]">
                            <SelectValue placeholder="Unidade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mes">Mês</SelectItem>
                            <SelectItem value="ano">Ano</SelectItem>
                            <SelectItem value="semestre">Semestre</SelectItem>
                            <SelectItem value="dia">Dia</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="valorFuturo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor Futuro</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <div className="relative  w-full">
                        <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                          <Money className="h-4 w-4" />
                        </div>
                        <Input
                          placeholder="Valor futuro"
                          type="number"
                          {...field}
                          className="w-full  pl-8"
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="h-20">
              {resultado && (
                <div className="flex items-center justify-center h-full">
                  <p className="text-2xl  text-gray-800">
                    <span>
                      {form.watch("valorPresente") == "" &&
                        "Valor Presente = " + resultado}
                      {form.watch("valorFuturo") == "" &&
                        "Valor Futuro = " + resultado}
                      {form.watch("taxa")?.valor == "" &&
                        "Taxa = " +
                          resultado +
                          "% ao " +
                          form.watch("taxa")?.unidade}
                      {form.watch("tempo")?.valor == "" &&
                        "Tempo = " + resultado}
                    </span>
                  </p>
                </div>
              )}
            </div>

            <Button className="w-full bg-[#00a63e]">Calcular</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
