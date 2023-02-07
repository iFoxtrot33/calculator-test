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
    setCalc((prev) => prev + value);

    if (operators.includes(value)) {
      try {
        setResult(evaluate(calc).toString());
      } catch (error) {
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
          {calc || "0"}
          {result ? <span>{result}</span> : ""}
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
