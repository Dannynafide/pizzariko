import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import BackButton from "../Components/BackButton.js";
import OperationList from "../Components/OperationsList";
import PizzasList from "../Components/PizzasList";
import MainTemplate from "../templates/MainTemplate/MainTemplate.js";

function Ingredient() {
  const [ingredient, setIngredient] = useState();
  const [message, setMessage] = useState();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const id = params.id.toString();
        const response = await fetch(
          `http://localhost:3001/api/ingredient/${id}`
        );

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

        setIngredient(record);
      } catch (error) {
        setMessage("There has been a problem with your fetch operation");
      }
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  if (!ingredient) {
    return <MainTemplate title={message} />;
  }

  return (
    <MainTemplate title={`Ingredient: ${ingredient?.name}`}>
      <p>Operations:</p>
      {ingredient?.operation ? (
        <OperationList operations={[ingredient.operation]} />
      ) : (
        <span>No operations</span>
      )}
      <br />

      <p>Pizzas:</p>
      {ingredient?.pizzas ? (
        <PizzasList pizzas={ingredient.pizzas} />
      ) : (
        <span>No pizzas</span>
      )}
      <br />

      <BackButton onClick={() => navigate(-1)}>Go Back</BackButton>
    </MainTemplate>
  );
}

export default Ingredient;
