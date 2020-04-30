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

const useCoin = (label, stateInitial, options) => {

    //State de nuestro custom hook
    const [state, updateState] = useState(stateInitial)

  const Select = () => (
    <Fragment>
      <Label>{label}</Label>
      <Selected
      onChange= {e => updateState(e.target.value)}
      value={state}
      >
        <option value="">- Seleccione -</option>
        {options.map(option =>(
          <option key={option.codigo} value={option.codigo}>{option.nombre}</option>
        ))}
      </Selected>
    </Fragment>
  );

  //Retornar state, interfaz y función que modifica el state
  return [state, Select, updateState]
};

export default useCoin;

