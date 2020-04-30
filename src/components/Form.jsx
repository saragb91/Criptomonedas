import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Error from "./Error";
import useCoin from "./hooks/useCoin";
import useCriptocoin from "./hooks/useCriptocoin";
import axios from "axios";

const Button = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;
const Form = ({saveCoin, saveCriptocoin}) => {
  //State del listado de criptomonedas
  const [listcripto, saveCriptocoins] = useState([]);
  const [error, saveError] = useState(false);

  const COINS = [
    { codigo: "USD", nombre: "Dolar de Estados Unidos" },
    { codigo: "MXN", nombre: "Peso mexicano" },
    { codigo: "EUR", nombre: "Euro" },
    { codigo: "GBP", nombre: "Libra Esterlina" },
  ];
  //Utilizar useCoin
  const [coin, SelectCoin] = useCoin("Elige tu moneda", "", COINS);

  //Utilizar useCriptocoin
  const [criptocoin, SelectCripto] = useCriptocoin(
    "Elige tu Criptomoneda",
    "",
    listcripto
  );

  //>Ejectutar llamada a la API
  useEffect(() => {
    const consultAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

      const result = await axios.get(url);

      saveCriptocoins(result.data.Data);
    };
    consultAPI();
  }, []);

  //Cuando el usuario hace submit
  const quoteCoin = (e) => {
    e.preventDefault();

    //Validar si ambos campos están llenos
    if (coin === "" || criptocoin === "") {
      saveError(true);
      return;
    }
    //pasar los datos al componente principal
    saveError(false);
    saveCoin(coin);
    saveCriptocoin(criptocoin);

  };

  return (
    <form onSubmit={quoteCoin}>
      {error ? <Error message="Todos los campos son obligatorios" /> : null}
      <SelectCoin />

      <SelectCripto />
      <Button type="submit" value="Calculate" />
    </form>
  );
};

export default Form;
