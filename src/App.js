import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import image from "./cryptomonedas.png";
import Form from "./components/Form";
import axios from "axios";
import Quotation from "./components/Quotation";
import Spinner from "./components/Spinner";

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Image = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;
function App() {
  const [coin, saveCoin] = useState("");
  const [criptoCoin, saveCriptocoin] = useState("");
  const [result, saveResult] = useState({});
  const [loading, saveLoading] = useState(false);

  useEffect(() => {
    const quotationCriptocoin = async () => {
      //Evitamos la ejecución la primera vez
      if (coin === "") return;

      //Consultar la API para obtener la cotización
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoCoin}&tsyms=${coin}`;

      const result = await axios.get(url);

      //Mostrar el spinner
      saveLoading(true);

      //Ocultar el spinner y mostrar el resultado
      setTimeout(() => {
        //Cambiar el estado de cargando
        saveLoading(false);

        //Guardar cotización
        saveResult(result.data.DISPLAY[criptoCoin][coin]);
      }, 3000);
    };

    quotationCriptocoin();
  }, [coin, criptoCoin]);

  //Mostrar spinner o resultado
  const component = loading ? <Spinner /> : <Quotation result={result} />;

  return (
    <Container>
      <div>
        <Image src={image} alt="image-cryto" />
      </div>

      <div>
        <Heading>Cotiza Criptomonedas al instante</Heading>
        <Form saveCoin={saveCoin} saveCriptocoin={saveCriptocoin} />
        {component}
      </div>
    </Container>
  );
}

export default App;
