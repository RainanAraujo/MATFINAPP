import { useEffect, useRef } from "react";
import Navbar from "../components/ui/navbar";
const inner = ` <div>
<div  class=container>

  <div id=pointer_div style=" height: 375px; width: 600px;">
    <img src="arquivos/hp12c.png" draggable=false style="position: absolute;left: 0px;top:0px;width: 600px;" id=cross
      onclick="key_pressed(event)" alt="">
    <div
      style="z-index: 1; position: absolute; left: 87px; top: 24px; font-weight: bold; font-size: 16px; font-family: sans-serif;">
      <span id=display></span>
    </div>
    <div style="z-index: 1; position: absolute; left: 120px; top: 65px; font-size: 12px; font-family: sans-serif;">
      <span id=modifier></span>
    </div>
    <div style="z-index: 1; position: absolute; left: 257px; top: 65px; font-size: 12px; font-family: sans-serif;">
      <span id=begin></span>
    </div>
    <div style="z-index: 1; position: absolute; left: 307px; top: 65px; font-size: 12px; font-family: sans-serif;">
      <span id=dmyc></span>
    </div>
    <div style="z-index: 1; position: absolute; left: 188px; top: 65px; font-size: 12px; font-family: sans-serif;">
      <span id=pgrm></span>
    </div>




    <img id=lcd0a src="arquivos/lcda.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 120px;">
    <img id=lcd0b src="arquivos/lcdb.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 120px;">
    <img id=lcd0c src="arquivos/lcdc.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 120px;">
    <img id=lcd0d src="arquivos/lcdd.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 120px;">
    <img id=lcd0e src="arquivos/lcde.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 120px;">
    <img id=lcd0f src="arquivos/lcdf.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 120px;">
    <img id=lcd0g src="arquivos/lcdg.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 120px;">
    <img id=lcd0p src="arquivos/lcdp.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 120px;">
    <img id=lcd0t src="arquivos/lcdt.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 120px;">

    <img id=lcd1a src="arquivos/lcda.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 144px;">
    <img id=lcd1b src="arquivos/lcdb.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 144px;">
    <img id=lcd1c src="arquivos/lcdc.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 144px;">
    <img id=lcd1d src="arquivos/lcdd.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 144px;">
    <img id=lcd1e src="arquivos/lcde.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 144px;">
    <img id=lcd1f src="arquivos/lcdf.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 144px;">
    <img id=lcd1g src="arquivos/lcdg.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 144px;">
    <img id=lcd1p src="arquivos/lcdp.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 144px;">
    <img id=lcd1t src="arquivos/lcdt.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 144px;">

    <img id=lcd2a src="arquivos/lcda.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 168px;">
    <img id=lcd2b src="arquivos/lcdb.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 168px;">
    <img id=lcd2c src="arquivos/lcdc.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 168px;">
    <img id=lcd2d src="arquivos/lcdd.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 168px;">
    <img id=lcd2e src="arquivos/lcde.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 168px;">
    <img id=lcd2f src="arquivos/lcdf.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 168px;">
    <img id=lcd2g src="arquivos/lcdg.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 168px;">
    <img id=lcd2p src="arquivos/lcdp.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 168px;">
    <img id=lcd2t src="arquivos/lcdt.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 168px;">

    <img id=lcd3a src="arquivos/lcda.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 192px;">
    <img id=lcd3b src="arquivos/lcdb.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 192px;">
    <img id=lcd3c src="arquivos/lcdc.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 192px;">
    <img id=lcd3d src="arquivos/lcdd.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 192px;">
    <img id=lcd3e src="arquivos/lcde.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 192px;">
    <img id=lcd3f src="arquivos/lcdf.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 192px;">
    <img id=lcd3g src="arquivos/lcdg.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 192px;">
    <img id=lcd3p src="arquivos/lcdp.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 192px;">
    <img id=lcd3t src="arquivos/lcdt.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 192px;">

    <img id=lcd4a src="arquivos/lcda.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 216px;">
    <img id=lcd4b src="arquivos/lcdb.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 216px;">
    <img id=lcd4c src="arquivos/lcdc.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 216px;">
    <img id=lcd4d src="arquivos/lcdd.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 216px;">
    <img id=lcd4e src="arquivos/lcde.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 216px;">
    <img id=lcd4f src="arquivos/lcdf.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 216px;">
    <img id=lcd4g src="arquivos/lcdg.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 216px;">
    <img id=lcd4p src="arquivos/lcdp.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 216px;">
    <img id=lcd4t src="arquivos/lcdt.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 216px;">

    <img id=lcd5a src="arquivos/lcda.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 240px;">
    <img id=lcd5b src="arquivos/lcdb.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 240px;">
    <img id=lcd5c src="arquivos/lcdc.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 240px;">
    <img id=lcd5d src="arquivos/lcdd.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 240px;">
    <img id=lcd5e src="arquivos/lcde.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 240px;">
    <img id=lcd5f src="arquivos/lcdf.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 240px;">
    <img id=lcd5g src="arquivos/lcdg.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 240px;">
    <img id=lcd5p src="arquivos/lcdp.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 240px;">
    <img id=lcd5t src="arquivos/lcdt.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 240px;">

    <img id=lcd6a src="arquivos/lcda.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 264px;">
    <img id=lcd6b src="arquivos/lcdb.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 264px;">
    <img id=lcd6c src="arquivos/lcdc.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 264px;">
    <img id=lcd6d src="arquivos/lcdd.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 264px;">
    <img id=lcd6e src="arquivos/lcde.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 264px;">
    <img id=lcd6f src="arquivos/lcdf.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 264px;">
    <img id=lcd6g src="arquivos/lcdg.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 264px;">
    <img id=lcd6p src="arquivos/lcdp.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 264px;">
    <img id=lcd6t src="arquivos/lcdt.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 264px;">

    <img id=lcd7a src="arquivos/lcda.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 288px;">
    <img id=lcd7b src="arquivos/lcdb.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 288px;">
    <img id=lcd7c src="arquivos/lcdc.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 288px;">
    <img id=lcd7d src="arquivos/lcdd.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 288px;">
    <img id=lcd7e src="arquivos/lcde.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 288px;">
    <img id=lcd7f src="arquivos/lcdf.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 288px;">
    <img id=lcd7g src="arquivos/lcdg.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 288px;">
    <img id=lcd7p src="arquivos/lcdp.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 288px;">
    <img id=lcd7t src="arquivos/lcdt.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 288px;">

    <img id=lcd8a src="arquivos/lcda.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 312px;">
    <img id=lcd8b src="arquivos/lcdb.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 312px;">
    <img id=lcd8c src="arquivos/lcdc.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 312px;">
    <img id=lcd8d src="arquivos/lcdd.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 312px;">
    <img id=lcd8e src="arquivos/lcde.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 312px;">
    <img id=lcd8f src="arquivos/lcdf.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 312px;">
    <img id=lcd8g src="arquivos/lcdg.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 312px;">
    <img id=lcd8p src="arquivos/lcdp.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 312px;">
    <img id=lcd8t src="arquivos/lcdt.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 312px;">

    <img id=lcd9a src="arquivos/lcda.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 337px;">
    <img id=lcd9b src="arquivos/lcdb.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 337px;">
    <img id=lcd9c src="arquivos/lcdc.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 337px;">
    <img id=lcd9d src="arquivos/lcdd.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 337px;">
    <img id=lcd9e src="arquivos/lcde.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 337px;">
    <img id=lcd9f src="arquivos/lcdf.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 337px;">
    <img id=lcd9g src="arquivos/lcdg.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 337px;">
    <img id=lcd9p src="arquivos/lcdp.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 337px;">
    <img id=lcd9t src="arquivos/lcdt.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 337px;">

    <img id=lcd10a src="arquivos/lcda.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 362px;">
    <img id=lcd10b src="arquivos/lcdb.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 362px;">
    <img id=lcd10c src="arquivos/lcdc.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 362px;">
    <img id=lcd10d src="arquivos/lcdd.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 362px;">
    <img id=lcd10e src="arquivos/lcde.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 362px;">
    <img id=lcd10f src="arquivos/lcdf.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 362px;">
    <img id=lcd10g src="arquivos/lcdg.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 362px;">
    <img id=lcd10p src="arquivos/lcdp.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 362px;">
    <img id=lcd10t src="arquivos/lcdt.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 362px;">

  </div>
  `;
declare function Init_hp12c(): void;
function CalculatorFinanceira() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = inner;

      const script = document.createElement("script");
      script.src = "arquivos/hp12c.js";
      script.onload = () => {
        if (typeof Init_hp12c === "function") {
          Init_hp12c();
        } else {
          console.error("Função Init_hp12c não encontrada.");
        }
      };
      script.onerror = () => {
        console.error("Erro ao carregar hp12c.js");
      };
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  return (
    <div className="flex flex-col h-full  ">
      <Navbar title="Calculadora Científica" />

      <div className="flex flex-col items-center justify-center h-full">
        <div
          className=" flex items-center justify-center rotate-90 origin-center"
          style={{ transform: "rotate(90deg)", transformOrigin: "center" }}
        >
          <div
            className=""
            ref={containerRef}
            dangerouslySetInnerHTML={{ __html: inner }}
          />
        </div>
      </div>
    </div>
  );
}

export default CalculatorFinanceira;
