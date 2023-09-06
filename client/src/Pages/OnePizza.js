import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import BackButton from "../Components/BackButton.js";
import IngredientsList from "../Components/IngredientsList";
import OperationList from "../Components/OperationsList";
import MainTemplate from "../templates/MainTemplate/MainTemplate.js";

function Home() {
  const [pizza, setPizza] = useState();
  const [message, setMessage] = useState();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const id = params.id.toString();
        const response = await fetch(`http://localhost:3001/api/pizza/${id}`);

        if (!response.ok) {
          const message = `An error has occurred: ${response.statusText}`;
          setMessage(message);
          return;
        }

        const record = await response.json();
        if (!record) {
          setMessage(`Records not found`);
          return;
        }

        setPizza(record);
      } catch (error) {
        setMessage("There has been a problem with your fetch operation");
      }
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  if (!pizza) {
    return <MainTemplate title={message} />;
  }

  return (
    <MainTemplate title={`Pizza: ${pizza?.name}`}>
      <p>Ingredients:</p>
      {pizza?.ingredients ? (
        <IngredientsList ingredients={pizza.ingredients} />
      ) : (
        <span>No ingredients</span>
      )}
      <br />

      <p>Operations:</p>
      {pizza?.operations ? (
        <OperationList operations={pizza.operations} />
      ) : (
        <span>No operations</span>
      )}
      <br />

      <BackButton onClick={() => navigate(-1)}>Go Back</BackButton>
    </MainTemplate>
  );
}

export default Home;
