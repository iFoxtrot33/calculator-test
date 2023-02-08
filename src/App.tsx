import React from "react";
import { evaluate } from "mathjs";

const App: React.FC = () => {
  const [calc, setCalc] = React.useState("");
  const [result, setResult] = React.useState("0");

  const operators: string[] = ["+", "-", "*", "/", "%", ",", "C", "√", "="];

  const updateCalc = (value: string): void => {
    if (
      (operators.includes(value) && calc === "") ||
      (operators.includes(value) && operators.includes(calc.slice(-1)))
    ) {
      return;
    }

    let newCalc = calc;
    try {
      switch (value) {
        case "%":
          newCalc = `${evaluate(calc)}/100`;
          break;
        case ",":
          newCalc = `${calc}.`;
          break;
        case "√":
          newCalc = `${Math.sqrt(evaluate(calc))}`;
          break;
        default:
          newCalc = calc + value;
          break;
      }

      if (
        !operators.includes(value) ||
        (operators.includes(value) && value !== "=")
      ) {
        setCalc(newCalc);
      } else {
        const result = evaluate(newCalc);
        setResult(result.toString());
        setCalc("");
      }
    } catch (error) {
      if (
        !operators.includes(value) ||
        (operators.includes(value) && value !== "=")
      ) {
        setResult("Error");
      }
    }
  };

  const calculate = (): void => {
    setCalc(evaluate(calc).toString());
    setResult(evaluate(calc).toString());
  };

  const onClickDelete = (): void => {
    setCalc("");
    setResult("0");
  };

  return (
    <div className="app">
      <div className="wrapper"> </div>
      <div className="calculator">
        <div className="display">
          <span>{calc || "0"}</span>
          {result ? <div>{result}</div> : ""}
        </div>
        <div className="digits">
          <button onClick={onClickDelete}>C</button>
          <button onClick={() => updateCalc("√")}>√</button>
          <button onClick={() => updateCalc("%")}>%</button>
          <button onClick={() => updateCalc("/")}>/</button>
          <button onClick={() => updateCalc("7")}>7</button>
          <button onClick={() => updateCalc("8")}>8</button>
          <button onClick={() => updateCalc("9")}>9</button>
          <button onClick={() => updateCalc("*")}>*</button>
          <button onClick={() => updateCalc("4")}>4</button>
          <button onClick={() => updateCalc("5")}>5</button>
          <button onClick={() => updateCalc("6")}>6</button>
          <button onClick={() => updateCalc("-")}>-</button>
          <button onClick={() => updateCalc("1")}>1</button>
          <button onClick={() => updateCalc("2")}>2</button>
          <button onClick={() => updateCalc("3")}>3</button>
          <button onClick={() => updateCalc("+")}>+</button>
          <button onClick={() => updateCalc("100")}>00</button>
          <button onClick={() => updateCalc("0")}>0</button>
          <button onClick={() => updateCalc(",")}>,</button>
          <button className="digits-equal" onClick={calculate}>
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
