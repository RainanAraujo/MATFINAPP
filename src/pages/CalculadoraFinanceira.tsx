import { useEffect, useRef, useState } from "react";
import Navbar from "../components/ui/navbar";
const inner = ` <div>
<div  class=container>

  <div id=pointer_div style=" height: 375px; width: 600px;">
    <img src="/hpCalculator/hp12c.png" draggable=false style="position: absolute;left: 0px;top:0px;width: 600px;" id=cross
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




    <img id=lcd0a src="/hpCalculator/lcda.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 120px;">
    <img id=lcd0b src="/hpCalculator/lcdb.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 120px;">
    <img id=lcd0c src="/hpCalculator/lcdc.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 120px;">
    <img id=lcd0d src="/hpCalculator/lcdd.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 120px;">
    <img id=lcd0e src="/hpCalculator/lcde.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 120px;">
    <img id=lcd0f src="/hpCalculator/lcdf.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 120px;">
    <img id=lcd0g src="/hpCalculator/lcdg.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 120px;">
    <img id=lcd0p src="/hpCalculator/lcdp.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 120px;">
    <img id=lcd0t src="/hpCalculator/lcdt.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 120px;">

    <img id=lcd1a src="/hpCalculator/lcda.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 144px;">
    <img id=lcd1b src="/hpCalculator/lcdb.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 144px;">
    <img id=lcd1c src="/hpCalculator/lcdc.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 144px;">
    <img id=lcd1d src="/hpCalculator/lcdd.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 144px;">
    <img id=lcd1e src="/hpCalculator/lcde.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 144px;">
    <img id=lcd1f src="/hpCalculator/lcdf.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 144px;">
    <img id=lcd1g src="/hpCalculator/lcdg.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 144px;">
    <img id=lcd1p src="/hpCalculator/lcdp.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 144px;">
    <img id=lcd1t src="/hpCalculator/lcdt.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 144px;">

    <img id=lcd2a src="/hpCalculator/lcda.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 168px;">
    <img id=lcd2b src="/hpCalculator/lcdb.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 168px;">
    <img id=lcd2c src="/hpCalculator/lcdc.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 168px;">
    <img id=lcd2d src="/hpCalculator/lcdd.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 168px;">
    <img id=lcd2e src="/hpCalculator/lcde.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 168px;">
    <img id=lcd2f src="/hpCalculator/lcdf.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 168px;">
    <img id=lcd2g src="/hpCalculator/lcdg.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 168px;">
    <img id=lcd2p src="/hpCalculator/lcdp.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 168px;">
    <img id=lcd2t src="/hpCalculator/lcdt.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 168px;">

    <img id=lcd3a src="/hpCalculator/lcda.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 192px;">
    <img id=lcd3b src="/hpCalculator/lcdb.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 192px;">
    <img id=lcd3c src="/hpCalculator/lcdc.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 192px;">
    <img id=lcd3d src="/hpCalculator/lcdd.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 192px;">
    <img id=lcd3e src="/hpCalculator/lcde.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 192px;">
    <img id=lcd3f src="/hpCalculator/lcdf.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 192px;">
    <img id=lcd3g src="/hpCalculator/lcdg.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 192px;">
    <img id=lcd3p src="/hpCalculator/lcdp.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 192px;">
    <img id=lcd3t src="/hpCalculator/lcdt.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 192px;">

    <img id=lcd4a src="/hpCalculator/lcda.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 216px;">
    <img id=lcd4b src="/hpCalculator/lcdb.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 216px;">
    <img id=lcd4c src="/hpCalculator/lcdc.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 216px;">
    <img id=lcd4d src="/hpCalculator/lcdd.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 216px;">
    <img id=lcd4e src="/hpCalculator/lcde.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 216px;">
    <img id=lcd4f src="/hpCalculator/lcdf.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 216px;">
    <img id=lcd4g src="/hpCalculator/lcdg.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 216px;">
    <img id=lcd4p src="/hpCalculator/lcdp.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 216px;">
    <img id=lcd4t src="/hpCalculator/lcdt.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 216px;">

    <img id=lcd5a src="/hpCalculator/lcda.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 240px;">
    <img id=lcd5b src="/hpCalculator/lcdb.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 240px;">
    <img id=lcd5c src="/hpCalculator/lcdc.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 240px;">
    <img id=lcd5d src="/hpCalculator/lcdd.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 240px;">
    <img id=lcd5e src="/hpCalculator/lcde.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 240px;">
    <img id=lcd5f src="/hpCalculator/lcdf.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 240px;">
    <img id=lcd5g src="/hpCalculator/lcdg.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 240px;">
    <img id=lcd5p src="/hpCalculator/lcdp.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 240px;">
    <img id=lcd5t src="/hpCalculator/lcdt.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 240px;">

    <img id=lcd6a src="/hpCalculator/lcda.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 264px;">
    <img id=lcd6b src="/hpCalculator/lcdb.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 264px;">
    <img id=lcd6c src="/hpCalculator/lcdc.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 264px;">
    <img id=lcd6d src="/hpCalculator/lcdd.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 264px;">
    <img id=lcd6e src="/hpCalculator/lcde.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 264px;">
    <img id=lcd6f src="/hpCalculator/lcdf.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 264px;">
    <img id=lcd6g src="/hpCalculator/lcdg.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 264px;">
    <img id=lcd6p src="/hpCalculator/lcdp.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 264px;">
    <img id=lcd6t src="/hpCalculator/lcdt.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 264px;">

    <img id=lcd7a src="/hpCalculator/lcda.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 288px;">
    <img id=lcd7b src="/hpCalculator/lcdb.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 288px;">
    <img id=lcd7c src="/hpCalculator/lcdc.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 288px;">
    <img id=lcd7d src="/hpCalculator/lcdd.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 288px;">
    <img id=lcd7e src="/hpCalculator/lcde.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 288px;">
    <img id=lcd7f src="/hpCalculator/lcdf.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 288px;">
    <img id=lcd7g src="/hpCalculator/lcdg.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 288px;">
    <img id=lcd7p src="/hpCalculator/lcdp.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 288px;">
    <img id=lcd7t src="/hpCalculator/lcdt.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 288px;">

    <img id=lcd8a src="/hpCalculator/lcda.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 312px;">
    <img id=lcd8b src="/hpCalculator/lcdb.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 312px;">
    <img id=lcd8c src="/hpCalculator/lcdc.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 312px;">
    <img id=lcd8d src="/hpCalculator/lcdd.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 312px;">
    <img id=lcd8e src="/hpCalculator/lcde.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 312px;">
    <img id=lcd8f src="/hpCalculator/lcdf.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 312px;">
    <img id=lcd8g src="/hpCalculator/lcdg.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 312px;">
    <img id=lcd8p src="/hpCalculator/lcdp.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 312px;">
    <img id=lcd8t src="/hpCalculator/lcdt.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 312px;">

    <img id=lcd9a src="/hpCalculator/lcda.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 337px;">
    <img id=lcd9b src="/hpCalculator/lcdb.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 337px;">
    <img id=lcd9c src="/hpCalculator/lcdc.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 337px;">
    <img id=lcd9d src="/hpCalculator/lcdd.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 337px;">
    <img id=lcd9e src="/hpCalculator/lcde.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 337px;">
    <img id=lcd9f src="/hpCalculator/lcdf.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 337px;">
    <img id=lcd9g src="/hpCalculator/lcdg.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 337px;">
    <img id=lcd9p src="/hpCalculator/lcdp.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 337px;">
    <img id=lcd9t src="/hpCalculator/lcdt.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 337px;">

    <img id=lcd10a src="/hpCalculator/lcda.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 362px;">
    <img id=lcd10b src="/hpCalculator/lcdb.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 362px;">
    <img id=lcd10c src="/hpCalculator/lcdc.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 362px;">
    <img id=lcd10d src="/hpCalculator/lcdd.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 362px;">
    <img id=lcd10e src="/hpCalculator/lcde.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 362px;">
    <img id=lcd10f src="/hpCalculator/lcdf.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 362px;">
    <img id=lcd10g src="/hpCalculator/lcdg.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 362px;">
    <img id=lcd10p src="/hpCalculator/lcdp.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 362px;">
    <img id=lcd10t src="/hpCalculator/lcdt.png" alt=""
      style="z-index:1; position:absolute; top: 35px; width: 24px; visibility: hidden; left: 362px;">

  </div>
  `;
declare function Init_hp12c(): void;
function CalculatorFinanceira() {
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = inner;

      const script = document.createElement("script");
      script.src = "/hpCalculator/hp12c.js";
      script.onload = () => {
        if (typeof Init_hp12c === "function") {
          Init_hp12c();
        } else {
          setError("Função Init_hp12c não encontrada.");
        }
      };
      script.onerror = () => {
        setError("Erro ao carregar hp12c.js");
      };
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  return (
    <div className="flex flex-col h-full  ">
      <Navbar title="Calculadora Financeira" />

      <div className="flex flex-col items-center justify-center h-full">
        {error && <div className="text-red-500 text-center">{error}</div>}
        <div
          className=" flex items-center justify-center "
          style={{ transform: "rotate(90deg)", transformOrigin: "center" }}
        >
          <div ref={containerRef} dangerouslySetInnerHTML={{ __html: inner }} />
        </div>
      </div>
    </div>
  );
}

export default CalculatorFinanceira;
