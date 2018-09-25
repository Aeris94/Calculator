import React from 'react';

const Button = (props) =>
{
  return(
    <button id={props.id} 
            onClick={() => props.onClick(props.value)}>{props.value}</button>
  )
}

export default Button;