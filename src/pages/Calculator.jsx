import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/calculator.css";

export default function Calculator() {
  const navigate = useNavigate();

  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState(null);
  const [op, setOp] = useState(null);
  const [reset, setReset] = useState(false);

  const inputNumber = (num) => {
    if (reset) {
      setDisplay(num);
      setReset(false);
      return;
    }
    setDisplay(display === "0" ? num : display + num);
  };

  const inputDot = () => {
    if (reset) {
      setDisplay("0.");
      setReset(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const clearAll = () => {
    setDisplay("0");
    setPrev(null);
    setOp(null);
    setReset(false);
  };

  const backspace = () => {
    if (reset) return;
    setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
  };

  const calculate = () => {
    if (prev === null || op === null) return;

    const current = Number(display);
    let result = 0;

    if (op === "+") result = prev + current;
    if (op === "-") result = prev - current;
    if (op === "*") result = prev * current;
    if (op === "/") result = current === 0 ? 0 : prev / current;

    setDisplay(String(result));
    setPrev(null);
    setOp(null);
    setReset(true);
  };

  const operator = (operator) => {
    if (op && !reset) {
      calculate();
    } else {
      setPrev(Number(display));
    }
    setOp(operator);
    setReset(true);
  };

  const percent = () => {
    setDisplay(String(Number(display) / 100));
  };

  return (
    <div className="calc-page">

      {/* HEADER */}
      <div className="calc-header">
        <span onClick={() => navigate(-1)}>‹</span>
        <h2>Calculator</h2>
        <div className="calc-icons">
          <span>π</span>
          <span>Σ</span>
          <span>⏱</span>
        </div>
      </div>

      {/* DISPLAY */}
      <div className="calc-display">{display}</div>

      {/* KEYPAD */}
      <div className="calc-grid">
        <button className="btn light" onClick={clearAll}>AC</button>
        <button className="btn light" onClick={percent}>%</button>
        <button className="btn light" onClick={() => operator("/")}>÷</button>
        <button className="btn light" onClick={backspace}>⌫</button>

        <button className="btn" onClick={() => inputNumber("7")}>7</button>
        <button className="btn" onClick={() => inputNumber("8")}>8</button>
        <button className="btn" onClick={() => inputNumber("9")}>9</button>
        <button className="btn light" onClick={() => operator("*")}>×</button>

        <button className="btn" onClick={() => inputNumber("4")}>4</button>
        <button className="btn" onClick={() => inputNumber("5")}>5</button>
        <button className="btn" onClick={() => inputNumber("6")}>6</button>
        <button className="btn light" onClick={() => operator("-")}>−</button>

        <button className="btn" onClick={() => inputNumber("1")}>1</button>
        <button className="btn" onClick={() => inputNumber("2")}>2</button>
        <button className="btn" onClick={() => inputNumber("3")}>3</button>
        <button className="btn light" onClick={() => operator("+")}>+</button>

        <button className="btn" onClick={() => inputNumber("0")}>0</button>
        <button className="btn" onClick={() => inputNumber("00")}>00</button>
        <button className="btn" onClick={inputDot}>.</button>
        <button className="btn equal" onClick={calculate}>=</button>
      </div>
    </div>
  );
}
