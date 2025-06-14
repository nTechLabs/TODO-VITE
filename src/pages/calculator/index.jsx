import "./calculator.css";
import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { calculatorActs } from "../../store/calculatorSlice";
import Decimal from "decimal.js";

function Calculator() {
  const dispatch = useDispatch();
  const { firstCalcNumber, secondCalcNumber, operator, result } = useSelector(
    (state) => state.calculator
  );

  const updateNumber = (number, isSecondNumber) => {
    const action = isSecondNumber
      ? calculatorActs.setSecondCalcNumber
      : calculatorActs.setFirstCalcNumber;
    const currentNumber = isSecondNumber ? secondCalcNumber : firstCalcNumber;
    dispatch(action([...currentNumber, number].join("")));
  };

  const onClickNumber = (number) => {
    updateNumber(number, Boolean(operator));
  };

  const onClickClear = useCallback(() => {
    dispatch(calculatorActs.clearCalculator());
  }, [dispatch]);

  const checkDot = () => {
    const currentNumber = operator ? secondCalcNumber : firstCalcNumber;
    if (!currentNumber.includes(".") && currentNumber !== "") {
      onClickNumber(".");
    }
  };

  const checkNumberZero = () => {
    const currentNumber = operator ? secondCalcNumber : firstCalcNumber;
    if (currentNumber !== "0") {
      onClickNumber("0");
    }
  };

  const handleOperator = () => {
    if (!operator) return;

    try {
      const firstNumber = new Decimal(firstCalcNumber || 0);
      const secondNumber = new Decimal(secondCalcNumber || 0);
      let calculatedResult;

      switch (operator) {
        case "+":
          calculatedResult = firstNumber.plus(secondNumber);
          break;
        case "-":
          calculatedResult = firstNumber.minus(secondNumber);
          break;
        case "X":
          calculatedResult = firstNumber.times(secondNumber);
          break;
        case "/":
          if (secondNumber.isZero()) {
            alert("0으로 나눌 수 없습니다");
            onClickClear();
            return;
          }
          calculatedResult = firstNumber.div(secondNumber);
          break;
        default:
          return;
      }

      dispatch(calculatorActs.setResult(calculatedResult.toString()));
      dispatch(calculatorActs.setOperator(""));
      dispatch(calculatorActs.setSecondCalcNumber(""));
    } catch {
      alert("계산 중 오류가 발생했습니다");
      onClickClear();
    }
  };

  useEffect(() => {
    if (result === 0) {
      alert("결과가 0 입니다");
      onClickClear();
    } else if (result === Infinity) {
      alert("숫자값이 아닙니다");
      onClickClear();
    } else if (isNaN(result)) {
      alert("숫자값이 아닙니다");
      onClickClear();
    }
  }, [result, onClickClear]);

  useEffect(() => {
    if (result) {
      dispatch(calculatorActs.setFirstCalcNumber(result));
    }
  }, [result, dispatch]);

  return (
    <>
      <div className="wrap">
        <div className="number-view">
          <div className="view-number">
            <input
              className="view-number-title"
              readOnly
              type="text"
              value={secondCalcNumber || firstCalcNumber}
            />
          </div>
        </div>
        <div className="numbers">
          {["7", "8", "9"].map((num) => (
            <button
              key={num}
              className="number-btn"
              onClick={() => onClickNumber(num)}
            >
              {num}
            </button>
          ))}
          <button
            className="number-btn-orange"
            onClick={() => {
              handleOperator();
              dispatch(calculatorActs.setOperator("X"));
            }}
          >
            X
          </button>
        </div>
        <div className="numbers">
          {["4", "5", "6"].map((num) => (
            <button
              key={num}
              className="number-btn"
              onClick={() => onClickNumber(num)}
            >
              {num}
            </button>
          ))}
          <button
            className="number-btn-orange"
            onClick={() => {
              handleOperator();
              dispatch(calculatorActs.setOperator("-"));
            }}
          >
            -
          </button>
        </div>
        <div className="numbers">
          {["1", "2", "3"].map((num) => (
            <button
              key={num}
              className="number-btn"
              onClick={() => onClickNumber(num)}
            >
              {num}
            </button>
          ))}
          <button
            className="number-btn-orange"
            onClick={() => {
              handleOperator();
              dispatch(calculatorActs.setOperator("+"));
            }}
          >
            +
          </button>
        </div>
        <div className="numbers">
          <button className="number-btn orange-color" onClick={onClickClear}>
            AC
          </button>
          <button className="number-btn" onClick={checkNumberZero}>
            0
          </button>
          <button
            className="number-btn orange-color"
            onClick={() => {
              handleOperator();
            }}
          >
            =
          </button>
          <button
            className="number-btn-orange"
            onClick={() => {
              handleOperator();
              dispatch(calculatorActs.setOperator("/"));
            }}
          >
            /
          </button>
        </div>
        <div className="numbers">
          <button className="number-btn-dot" onClick={checkDot}>
            .
          </button>
        </div>
      </div>
    </>
  );
}

export default Calculator;
