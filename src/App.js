import React, {useState} from 'react';
import './App.css';
import Wrapper from './component/Wrapper';
import Screen from './component/Screen';
import ButtonBox from './component/ButtonBox';
import Button from './component/Button';

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, '.', '=']
];

const toLocaleString = (num) => String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");
const removeSpaces = (num) => num.toString().replace(/\s/g, "");
const math = (a, b, sign) => sign === "+" ? a + b 
                            : sign === "-" ? a - b
                            : sign === "X" ? a * b
                            : a / b;

const App = () => {

  let [calc, setCalc] = useState({
    sign : "",
    num : 0,
    res : 0
  });

  const numClick = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    if(removeSpaces(calc.num).length < 16){
      setCalc({
        ...calc,
        num : removeSpaces(calc.num) % 1 === 0 && !calc.num.toString().includes(".") ? toLocaleString(Number(removeSpaces(calc.num + value))) : toLocaleString(calc.num + value),
        res : !calc.sign ? 0 : calc.res

      })
    }
  }

  const resetClick = () => {
    setCalc({
      ...calc,
      sign : "",
      num : 0,
      res : 0
    })
  }

  const invertClick = () => {}

  const percentClick = () => {}

  const signClick = (e) => {
    setCalc({
      ...calc,
      sign : e.target.innerHTML,
      num : 0,
      res : !calc.num ? calc.res 
            : !calc.res ? calc.num 
            : toLocaleString(
                math(
                  Number(removeSpaces(calc.res)),
                  Number(removeSpaces(calc.num)),
                  calc.sign
                )
              )
    })
  }
  
  const equalsClick = () => {}

  const commaClick = () => {}

  const buttonClick = (e, btn) => {
    btn === "C" ? resetClick() 
    : btn === "+-" ? invertClick()
    : btn === "%" ? percentClick()
    : btn === "/" || btn ==="X" || btn === "-" || btn === "+" ? signClick(e)
    : btn === "=" ? equalsClick()
    : btn === "." ? commaClick()
    : numClick(e)
  }

  return (
        <Wrapper>
          <Screen value={calc.num ? calc.num : calc.res} />
          <ButtonBox>
            {
              btnValues.flat().map((btn, i) => (
                
                <Button key={i} 
                        className={ btn === "=" ? "equals" : "" }
                        value={ btn }
                        onClick={(e) => buttonClick(e, btn)}
                />
              ))
            }
          </ButtonBox>
        </Wrapper>
  );
}

export default App;
