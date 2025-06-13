import "./calculator.css";
import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { calculatorActions } from "../../store/calculatorSlice";
import Decimal from "decimal.js";

function Calculator() {
  const dispatch = useDispatch();
  const { firstCalcNumber, secondCalcNumber, operator, result } = useSelector(
    (state) => state.calculator
  );

  const onClickNumber = (number) => {
    if (!operator) {
      dispatch(
        calculatorActions.setFirstCalcNumber(
          [...firstCalcNumber, number].join("")
        )
      );
    } else {
      dispatch(
        calculatorActions.setSecondCalcNumber(
          [...secondCalcNumber, number].join("")
        )
      );
    }
  };

  const onClickClear = useCallback(() => {
    dispatch(calculatorActions.clearCalculator());
  }, [dispatch]); // Wrap in useCallback to stabilize reference

  const checkOperator = () => {
    if (!operator) {
      alert("연산기호를 입력해 주세요");
    }
  };

  const checkDot = () => {
    if (!operator && !firstCalcNumber.includes(".") && firstCalcNumber !== "") {
      onClickNumber(".");
    }
    if (
      operator &&
      !secondCalcNumber.includes(".") &&
      secondCalcNumber !== ""
    ) {
      onClickNumber(".");
    }
  };

  const checkNumberZero = () => {
    if (!operator && firstCalcNumber !== "0") {
      onClickNumber("0");
    }
    if (operator && secondCalcNumber !== "0") {
      onClickNumber("0");
    }
  };

  const handleOperator = () => {
    if (!operator) {
      alert("연산기호를 입력해 주세요");
      return;
    }

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
          alert("유효하지 않은 연산기호입니다");
          return;
      }

      dispatch(calculatorActions.setResult(calculatedResult.toString()));
      dispatch(calculatorActions.setOperator(""));
      dispatch(calculatorActions.setSecondCalcNumber(""));
    } catch {
      alert("계산 중 오류가 발생했습니다");
      onClickClear();
    }
  };

  useEffect(() => {
    if (result === 0) {
      alert("결과가 0 입니다");
      onClickClear();
    }
    if (result === Infinity) {
      alert("숫자값이 아닙니다1");
      onClickClear();
    }
    if (isNaN(result) === true) {
      onClickClear();
      alert("숫자값이 아닙니다11");
    }
  }, [result, onClickClear]);

  useEffect(() => {
    if (result) {
      dispatch(calculatorActions.setFirstCalcNumber(result));
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
              value={secondCalcNumber ? secondCalcNumber : firstCalcNumber}
            />
          </div>
        </div>
        <div className="numbers">
          <button
            className="number-btn"
            onClick={() => {
              onClickNumber("7");
            }}
          >
            7
          </button>
          <button
            className="number-btn"
            onClick={() => {
              onClickNumber("8");
            }}
          >
            8
          </button>
          <button
            className="number-btn"
            onClick={() => {
              onClickNumber("9");
            }}
          >
            9
          </button>
          <button
            className="number-btn-orange"
            onClick={() => {
              handleOperator();
              dispatch(calculatorActions.setOperator("X"));
            }}
          >
            X
          </button>
        </div>
        <div className="numbers">
          <button
            className="number-btn"
            onClick={() => {
              onClickNumber("4");
            }}
          >
            4
          </button>
          <button
            className="number-btn"
            onClick={() => {
              onClickNumber("5");
            }}
          >
            5
          </button>
          <button
            className="number-btn"
            onClick={() => {
              onClickNumber("6");
            }}
          >
            6
          </button>
          <button
            className="number-btn-orange"
            onClick={() => {
              handleOperator();
              dispatch(calculatorActions.setOperator("-"));
            }}
          >
            -
          </button>
        </div>
        <div className="numbers">
          <button
            className="number-btn"
            onClick={() => {
              onClickNumber("1");
            }}
          >
            1
          </button>
          <button
            className="number-btn"
            onClick={() => {
              onClickNumber("2");
            }}
          >
            2
          </button>
          <button
            className="number-btn"
            onClick={() => {
              onClickNumber("3");
            }}
          >
            3
          </button>
          <button
            className="number-btn-orange"
            onClick={() => {
              handleOperator();
              dispatch(calculatorActions.setOperator("+"));
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
              checkOperator();
            }}
          >
            =
          </button>
          <button
            className="number-btn-orange"
            onClick={() => {
              handleOperator();
              dispatch(calculatorActions.setOperator("/"));
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
