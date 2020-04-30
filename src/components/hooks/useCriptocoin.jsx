import React, { Fragment, useState } from "react";
import styled from '@emotion/styled'

const Label= styled.label`
font-family: 'Bebas Neue', cursive;
color: #FFF;
text-transform: uppercase;
font-weight: bold;
font-size: 2.4rem;
margin-top: 2rem;
display:block;
`;

const Selected= styled.select`
width:100%;
display: block;
padding: 1rem;
-webkit-appearance: none;
border-radius: 10px;
border: none;
font-size:1.2rem;
`

const useCriptocoin = (label, stateInitial, options) => {
// console.log(options)
    //State de nuestro custom hook
    const [state, updateState] = useState(stateInitial)

  const SelectCripto = () => (
    <Fragment>
      <Label>{label}</Label>
      <Selected
      onChange= {e => updateState(e.target.value)}
      value={state}
      >
        <option value="">- Seleccione -</option>
        {options.map(option =>(
          <option key={option.CoinInfo.Id} value={option.CoinInfo.Name}>{option.CoinInfo.FullName}</option>
        ))}
      </Selected>
    </Fragment>
  );

  //Retornar state, interfaz y función que modifica el state
  return [state, SelectCripto, updateState]
};

export default useCriptocoin;

