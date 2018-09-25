import React, { Component } from 'react';
import './App.css';
import Button from './Button.js';
import Display from './Display.js';

class Calculator extends Component
{
  constructor(props)
  {
    super(props);
    this.state = { 
      numberKeys: [
        {value: "7", id: "seven", onClick: (value) => this.handleValue(value)}, 
        {value: "8", id: "eight", onClick: (value) => this.handleValue(value)}, 
        {value: "9", id: "nine", onClick: (value) => this.handleValue(value)},
        {value: "4", id: "four", onClick: (value) => this.handleValue(value)}, 
        {value: "5", id: "five", onClick: (value) => this.handleValue(value)}, 
        {value: "6", id: "six", onClick: (value) => this.handleValue(value)},
        {value: "1", id: "one", onClick: (value) => this.handleValue(value)}, 
        {value: "2", id: "two", onClick: (value) => this.handleValue(value)}, 
        {value: "3", id: "three", onClick: (value) => this.handleValue(value)}, 
        {value: "0", id: "zero", onClick: (value) => this.handleValue(value)}, 
        {value: ".", id: "decimal", onClick: (value) => this.handleValue(value)} 
      ],
    
      operatorKeys: [
        {value: "\u232b", id: "delete", onClick: () => this.delete()},
        {value: "AC", id: "clear", onClick: () => this.clear()},
        {value: "/", id: "divide", onClick: (value) => this.handleOperator(value)},
        {value: "*", id: "multiply", onClick: (value) => this.handleOperator(value)},
        {value: "-", id: "substract", onClick: (value) => this.handleOperator(value)},
        {value: "+", id: "add", onClick: (value) => this.handleOperator(value)},
        {value: "(", id: "leftPar", onClick: (value) => this.handleValue(value)},
        {value: ")", id: "rightPar", onClick: (value) => this.handleValue(value)},
        {value: "%", id: "add", onClick: (value) => this.handleOperator(value)},
        {value: "=", id: "equals", onClick: () => this.evaluateFormula()}
      ],
    
      advancedOperators: [
        {value: "sin", id: "sin", onClick: (value) => this.handleValue(value)},
        {value: "cos", id: "cos", onClick: (value) => this.handleValue(value)},
        {value: "tan", id: "tan", onClick: (value) => this.handleValue(value)},
        {value: "ctg", id: "ctg", onClick: (value) => this.handleValue(value)},
        {value: "log", id: "log", onClick: (value) => this.handleValue(value)},
        {value: "ln", id: "ln", onClick: (value) => this.handleValue(value)},
        {value: "exp", id: "exp", onClick: (value) => this.handleValue(value)},
        {value: "sqrt", id: "sqrt", onClick: (value) => this.handleValue(value)},
        {value: "abs", id: "abs", onClick: (value) => this.handleValue(value)},
        {value: "E", id: "E", onClick: (value) => this.handleValue(value)},
        {value: "PI", id: "PI", onClick: (value) => this.handleValue(value)}
      ],
      
      sign: "",
      currentValue: "", 
      formula: "",
    }
    
    this.createPanel = this.createPanel.bind(this);
    this.delete = this.delete.bind(this);
    this.clear = this.clear.bind(this);
    this.createMathFormula = this.createMathFormula.bind(this);
  }
  
  handleValue(value)
  {
    if(this.state.currentValue.length > 24)
      return;
        
    if(this.state.sign === "=")
    {
      this.clear();
      this.setState({currentValue: value,
                     formula: value, sign: ""});
      return;
    }  
    
    if(value === "0" && this.state.currentValue === "0")
      return;
    
    let parenthesis = "";
    if(value !== "E" && value !== "PI" && 
       this.state.advancedOperators.find(item => item.value === value))
    {
      parenthesis = "(";
    }  
    
    if(this.state.currentValue === "0" && value !== "0" && value !== ".")
    {
      this.setState({currentValue: value + parenthesis,
                     formula: this.state.formula.slice(0,-1) + value + parenthesis});
      return;
    }
    
    this.setState({currentValue: this.state.currentValue + value + parenthesis, 
                   formula: this.state.formula + value + parenthesis});
  }
  
 
  handleOperator(operator)
  {
    if(this.state.sign === "=")
    {
      this.setState({formula: this.state.currentValue + operator,
                     currentValue: "", sign: operator});
      return;
    }
    
    if(this.state.currentValue === "" && operator !== ")" && operator !=="(")
    {
      this.setState({sign: operator, formula: this.state.formula.slice(0, -1) + operator,    
                     currentValue: ""});
    }
    else
    {  
      this.setState({sign: operator, formula: this.state.formula + operator, 
                     currentValue: ""});
    }
  }
    
  delete()
  {
    if(this.state.sign === "=")
      this.clear();
    
    if(this.state.currentValue === "")
      this.setState({sign: ""});
    
    this.setState({currentValue: this.state.currentValue.slice(0, -1),
                   formula: this.state.formula.slice(0, -1)}); 
  }
  
  clear(){
    this.setState({
      currentValue: "",
      sign: "",
      formula: "",
    });  
  }
  
  evaluateFormula()
  {  
    if(this.state.formula.length === 0)
      return;
    
    let newFormula = "";
    let result = 0;
    try
    {
      newFormula = this.createMathFormula(this.state.formula);
      result = eval(newFormula);
      result = result.toFixed(4);
      this.setState({formula: this.state.formula + "=" + result.toString(),
                     sign: "=", currentValue: result.toString()})
    }
    catch(e)
    {
        alert(e.message);
    }
  }
  
  createMathFormula(showcaseFormula)
  {
     let regex = new RegExp('sin|cos|tan|exp|PI|E|sqrt|abs', 'g');
     let ctgRegex = new RegExp('ctg', 'g');
     let lnRegex = new RegExp('ln', 'g'); 
     let logRegex = new RegExp('log', 'g');
     let newFormula = showcaseFormula.
                        replace(regex, `Math.$&`).
                        replace(ctgRegex, `1/Math.tan`).
                        replace(logRegex, `Math.log10`).
                        replace(lnRegex, `Math.log`);
     return newFormula;
  }
  
  createPanel(array)
  {
    return array.map((item) => 
    {
      return <Button value={item["value"]} 
                     id={item["id"]}
                     onClick={item["onClick"]} /> 
    });
  }
  
  render()
  {
    return(
      <div id="application">
      <div id="calculator">
        <Display formula={this.state.formula} 
                 output={this.state.sign + this.state.currentValue}/>      
    
      <div id="buttonPanel">
      
        <div id="numberPanel">
          {this.createPanel(this.state.numberKeys)}
        </div>  
       
        <div id="operatorPanel">
         {this.createPanel(this.state.operatorKeys)}
        </div>
      </div>
      <div id="advancedPanel">
          {this.createPanel(this.state.advancedOperators)}
        </div>
        </div>
      
      <div id="footer">@Created by Ada</div>

      </div>
   
    )
  }
}


export default Calculator;
