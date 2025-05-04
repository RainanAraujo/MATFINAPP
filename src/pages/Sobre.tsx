import Navbar from "@/components/ui/navbar";

export default function Sobre() {
  return (
    <div className="flex flex-col gap-8 mt-4 h-full">
      <Navbar title={"Sobre"} />
      <div className="h-full flex items-center justify-center flex-col gap-4">
        <img src="/logo.svg" alt="Logo" className="w-1/3 mx-auto mt-5" />
        <p className="text-center text-gray-500">
          Este aplicativo é resultado da pesquisa de doutorado em Ciências da
          Educação de <b>Abias Rodrigues da Cruz</b>, cujo tema é: Eficácia da
          utilização de aplicativos na resolução de problemas envolvendo
          matemática financeira por alunos do 3º ano do ensino médio do
          Instituto Federal do Maranhão – Campus Codó. Realizado na Universidade
          Tecnológica Intercontinental - Assunção PY. Ele é destinado a todos
          que desejam aprender um pouco sobre Matemática Financeira.
        </p>
      </div>
    </div>
  );
}
