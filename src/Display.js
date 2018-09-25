import React from 'react';

const Display = (props) =>
{
  return(
    <div id="display">
      <div id="formula">{props.formula}</div>
      <div id="output">{props.output}</div>
    </div>
  )
}

export default Display;
