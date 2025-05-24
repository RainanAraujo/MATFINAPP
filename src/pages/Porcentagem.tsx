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

type PorcentagemValores = {
  valorX?: string;
  valorY?: string;
  valorZ?: string;
};

type AumentoFormData = {
  valorX?: string;
  valorY?: string;
  porcentagem?: string;
};
type DescontoFormData = {
  valorX?: string;
  valorY?: string;
  porcentagem?: string;
};

const formSchema = z.discriminatedUnion("tipo", [
  z.object({
    tipo: z.literal("porcentagem"),
    valorX: z
      .string()
      .optional()
      .transform((value) => (value === "" ? undefined : value)),
    valorY: z
      .string()
      .optional()
      .transform((value) => (value === "" ? undefined : value)),
    valorZ: z
      .string()
      .optional()
      .transform((value) => (value === "" ? undefined : value)),
  }),
  z.object({
    tipo: z.literal("aumento"),
    valorX: z
      .string()
      .optional()
      .transform((value) => (value === "" ? undefined : value)),
    valorY: z
      .string()
      .optional()
      .transform((value) => (value === "" ? undefined : value)),
    porcentagem: z
      .string()
      .optional()
      .transform((value) => (value === "" ? undefined : value)),
  }),
  z.object({
    tipo: z.literal("desconto"),
    valorX: z
      .string()
      .optional()
      .transform((value) => (value === "" ? undefined : value)),
    valorY: z
      .string()
      .optional()
      .transform((value) => (value === "" ? undefined : value)),
    porcentagem: z
      .string()
      .optional()
      .transform((value) => (value === "" ? undefined : value)),
  }),
]);

function Porcentagem() {
  const [resultado, setResultado] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipo: "porcentagem",
      valorX: "",
      valorY: "",
      valorZ: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    if (data.tipo === "aumento") {
      calcularAumento(data as AumentoFormData);
    }

    if (data.tipo === "porcentagem")
      calcularPorcentagem(data as PorcentagemValores);

    if (data.tipo === "desconto") {
      calcularDesconto(data as DescontoFormData);
    }
  }

  function calcularAumento({ valorX, valorY, porcentagem }: AumentoFormData) {
    const x = valorX ? parseFloat(valorX) : undefined;
    const y = valorY ? parseFloat(valorY) : undefined;
    const p = porcentagem ? parseFloat(porcentagem) : undefined;

    if (
      (x === undefined && y === undefined && p === undefined) ||
      (x !== undefined && y !== undefined && p !== undefined) ||
      (x === undefined && y === undefined && p !== undefined) ||
      (x === undefined && y !== undefined && p === undefined) ||
      (x !== undefined && y === undefined && p === undefined)
    ) {
      console.log("Valores inválidos");
      toast.error("Preencha apenas dois valores para calcular.");
      return;
    }

    // valorX + (valorX * porcentagem / 100) = valorY
    if (x !== undefined && p !== undefined && y === undefined) {
      const valorFinal = x + (x * p) / 100;
      setResultado(valorFinal.toFixed(2));
    }

    // (valorY - valorX) / valorX * 100 = porcentagem
    if (x !== undefined && y !== undefined && p === undefined) {
      const percentual = ((y - x) / x) * 100;
      setResultado(percentual.toFixed(2));
    }

    // valorX = valorY / (1 + porcentagem / 100)
    if (y !== undefined && p !== undefined && x === undefined) {
      const valorInicial = y / (1 + p / 100);

      setResultado(valorInicial.toFixed(2));
    }
  }

  function calcularDesconto({ valorX, valorY, porcentagem }: DescontoFormData) {
    const x = valorX ? parseFloat(valorX) : undefined;
    const y = valorY ? parseFloat(valorY) : undefined;
    const p = porcentagem ? parseFloat(porcentagem) : undefined;

    if (
      (x === undefined && y === undefined && p === undefined) ||
      (x !== undefined && y !== undefined && p !== undefined) ||
      (x === undefined && y === undefined && p !== undefined) ||
      (x === undefined && y !== undefined && p === undefined) ||
      (x !== undefined && y === undefined && p === undefined)
    ) {
      console.log("Valores inválidos");
      toast.error("Preencha apenas dois valores para calcular.");
      return;
    }
    // valorY = valorX * porcentagem / 100
    if (x !== undefined && p !== undefined && y === undefined) {
      const valorFinal = x - (x * p) / 100;
      setResultado(valorFinal.toFixed(2));
    }

    // porcentagem = ((valorX - valorY) / valorX) * 100
    if (x !== undefined && y !== undefined && p === undefined) {
      const percentual = ((x - y) / x) * 100;
      setResultado(percentual.toFixed(2));
    }

    // valorX = valorY / (1 - porcentagem / 100)
    if (y !== undefined && p !== undefined && x === undefined) {
      const valorInicial = y / (1 - p / 100);
      setResultado(valorInicial.toFixed(2));
    }
  }

  function calcularPorcentagem({ valorX, valorY, valorZ }: PorcentagemValores) {
    const x = parseFloat(valorX || "");
    const y = parseFloat(valorY || "");
    const z = parseFloat(valorZ || "");

    const isX = !isNaN(x);
    const isY = !isNaN(y);
    const isZ = !isNaN(z);

    if (
      (isX && isY && isZ) ||
      (!isX && !isY && !isZ) ||
      (!isX && !isY && isZ) ||
      (!isX && isY && !isZ) ||
      (isX && !isY && !isZ)
    ) {
      toast.error("Preencha apenas dois valores para calcular.");
      return;
    }

    // Calcular Z → x% de y
    if (isX && isY && !isZ) {
      setResultado(((x / 100) * y).toFixed(2));
    }

    // Calcular Y → z / (x / 100)
    if (isX && isZ && !isY) {
      if (x === 0) return { erro: "x não pode ser zero para calcular y." };
      setResultado((z / (x / 100)).toFixed(2));
    }

    // Calcular X → (z / y) * 100
    if (isY && isZ && !isX) {
      if (y === 0) return { erro: "y não pode ser zero para calcular x." };
      setResultado(((z / y) * 100).toFixed(2));
    }
  }
  return (
    <div className="flex flex-col  h-full bg-primary justify-between">
      <Navbar title="Porcentagem" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-4 flex-col p-5 bg-white rounded-t-2xl pt-10"
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
                      <SelectItem value="porcentagem">x % de y = z</SelectItem>
                      <SelectItem value="aumento">Aumento</SelectItem>
                      <SelectItem value="desconto">Desconto</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          {form.watch("tipo") === "porcentagem" && (
            <div className="flex flex-col gap-4">
              <p className="text-sm text-center text-gray-500">
                Deixe em branco apenas o valor que você quer descobrir e clique
                em calcular.
              </p>

              <FormField
                control={form.control}
                name="valorX"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>x</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        inputMode="numeric"
                        placeholder="Valor de x"
                        {...field}
                        className="w-full border p-2 rounded"
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="valorY"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>y</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        inputMode="numeric"
                        placeholder="Valor de y"
                        {...field}
                        className="w-full border p-2 rounded"
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="valorZ"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>z</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        inputMode="numeric"
                        placeholder="Valor de z"
                        {...field}
                        defaultValue={field.value}
                        className="w-full border p-2 rounded"
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {form.watch("tipo") === "aumento" && (
            <div className="flex flex-col gap-4">
              <p className="text-sm text-center text-gray-500">
                Deixe em branco apenas o valor que você quer descobrir e clique
                em calcular.
              </p>
              <FormField
                control={form.control}
                name="valorX"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor inicial</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        inputMode="numeric"
                        placeholder="Valor inicial"
                        {...field}
                        className="w-full border p-2 rounded"
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="valorY"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor final</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        inputMode="numeric"
                        placeholder="Valor final"
                        {...field}
                        className="w-full border p-2 rounded"
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="porcentagem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Porcentagem de aumento</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        inputMode="numeric"
                        placeholder="Valor da porcentagem de aumento"
                        {...field}
                        className="w-full border p-2 rounded"
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {form.watch("tipo") === "desconto" && (
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="valorX"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor inicial</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        inputMode="numeric"
                        placeholder="Valor inicial"
                        {...field}
                        className="w-full border p-2 rounded"
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="valorY"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor final</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        inputMode="numeric"
                        placeholder="Valor final"
                        {...field}
                        className="w-full border p-2 rounded"
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="porcentagem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Porcentagem de desconto</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        inputMode="numeric"
                        placeholder="Valor da porcentagem de desconto"
                        {...field}
                        className="w-full border p-2 rounded"
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          <div className="h-20">
            {resultado && (
              <div className="flex items-center justify-center h-full">
                <p className="text-2xl  text-gray-800">
                  {form.watch("tipo") === "porcentagem" && (
                    <span>
                      {(form.watch("valorX") != ""
                        ? form.watch("valorX")
                        : resultado) +
                        "% de " +
                        (form.watch("valorY") != ""
                          ? form.watch("valorY")
                          : resultado) +
                        " = " +
                        (form.watch("valorZ") != ""
                          ? form.watch("valorZ")
                          : resultado)}
                    </span>
                  )}
                  {form.watch("tipo") === "aumento" && (
                    <span>
                      {(form.watch("valorX") == "" ||
                        form.watch("valorX") == undefined) &&
                        "Valor inicial = " + resultado}
                      {(form.watch("valorY") == "" ||
                        form.watch("valorY") == undefined) &&
                        "Valor final = " + resultado}
                      {(form.watch("porcentagem") == "" ||
                        form.watch("porcentagem") == undefined) &&
                        resultado + "%"}
                    </span>
                  )}
                  {form.watch("tipo") === "desconto" && (
                    <span>
                      {(form.watch("valorX") == "" ||
                        form.watch("valorX") == undefined) &&
                        "Valor inicial = " + resultado}
                      {(form.watch("valorY") == "" ||
                        form.watch("valorY") == undefined) &&
                        "Valor final = " + resultado}
                      {(form.watch("porcentagem") == "" ||
                        form.watch("porcentagem") == undefined) &&
                        resultado + "%"}
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>
          <Button type="submit" className="w-full bg-[#00a63e]">
            Calcular
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Porcentagem;
