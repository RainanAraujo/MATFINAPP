import { useState, useEffect } from "react";
import { evaluate } from "mathjs";
import DisplayWindow from "../components/DisplayWindow";
import KeysWindow from "../components/KeysWindow";
import Navbar from "../components/ui/navbar";

function Calculator() {
  const [expression, setExpression] = useState("");
  const [displayEXP, setDisplayEXP] = useState("");
  const [result, setResult] = useState("0");

  const sciFunc = {
    sin: "sin",
    cos: "cos",
    tan: "tan",
    ln: "log",
    log: "log10",
    π: "pi",
    e: "e",
    "^": "^",
    "√": "sqrt",
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const { key } = event;

      if (key >= "0" && key <= "9") {
        handleButton(key);
      } else if (key === "Enter" || key === "=") {
        handleButton("=");
      } else if (key === "Backspace") {
        handleButton("DEL");
      } else if (key === "Escape") {
        handleButton("AC");
      } else if (
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "." ||
        key === "(" ||
        key === ")"
      ) {
        handleButton(key);
      } else if (key === "s") {
        handleButton("sin");
      } else if (key === "c") {
        handleButton("cos");
      } else if (key === "t") {
        handleButton("tan");
      } else if (key === "l") {
        handleButton("ln");
      } else if (key === "L") {
        handleButton("log");
      } else if (key === "p") {
        handleButton("π");
      } else if (key === "e") {
        handleButton("e");
      } else if (key === "^") {
        handleButton("^");
      } else if (key === "r") {
        handleButton("√");
      } else if (key === "!") {
        handleButton("!");
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [expression, displayEXP]);

  function calcResult() {
    if (expression.length !== 0) {
      console.log(expression);
      try {
        let compute = evaluate(expression);
        compute = parseFloat(compute.toFixed(4));
        setResult(compute);
      } catch (error) {
        setResult("Error");
      }
    } else {
      setResult("An Error Occured!");
    }
  }
  function factorial(n: number) {
    let result = 1;
    for (let i = 1; i <= n; i++) result *= i;
    return result;
  }

  function handleButton(value: string) {
    if (value === "AC") {
      setExpression("");
      setDisplayEXP("");
      setResult("0");
    } else if (value === "=") {
      calcResult();
    } else if (value === "DEL") {
      setDisplayEXP(displayEXP.slice(0, -1));
      setExpression(expression.slice(0, -1));
    } else if (Object.prototype.hasOwnProperty.call(sciFunc, value)) {
      setDisplayEXP(displayEXP + value);
      if (value in sciFunc) {
        setExpression(expression + sciFunc[value as keyof typeof sciFunc]);
      }
    } else if (value === "!") {
      const lastNum = extractLastNum(expression);

      if (lastNum != null) {
        const num = parseFloat(lastNum);
        setDisplayEXP(displayEXP + value);
        setExpression(expression.replace(lastNum, factorial(num).toString()));
      }
    } else {
      setExpression(expression + value);
      setDisplayEXP(displayEXP + value);
    }
  }

  function extractLastNum(exp: string) {
    const numbers = exp.match(/\d+/g);
    return numbers ? numbers[numbers.length - 1] : null;
  }

  return (
    <div className="flex flex-col justify-between h-full bg-primary">
      <Navbar title="Calculadora Científica" />
      <div className="calculator w-full  rounded-t-2xl bg-white p-5">
        <DisplayWindow expression={displayEXP} result={result} />
        <KeysWindow handleButton={handleButton} />
      </div>
    </div>
  );
}

export default Calculator;
