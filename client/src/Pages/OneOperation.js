import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import BackButton from "../Components/BackButton.js";
import IngredientsList from "../Components/IngredientsList";
import PizzasList from "../Components/PizzasList";
import MainTemplate from "../templates/MainTemplate/MainTemplate.js";

function Operation() {
  const [operation, setOperation] = useState();
  const [message, setMessage] = useState();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const id = params.id.toString();
        const response = await fetch(
          `http://localhost:3001/api/operation/${id}`
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

        setOperation(record);
      } catch (error) {
        setMessage("There has been a problem with your fetch operation");
      }
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  if (!operation) {
    return <MainTemplate title={message} />;
  }

  return (
    <MainTemplate title={`Operation: ${operation?.name}`}>
      <p>Ingredients:</p>
      {operation?.ingredients ? (
        <IngredientsList ingredients={operation.ingredients} />
      ) : (
        <span>No ingredients</span>
      )}
      <br />

      <p>Pizzas:</p>
      {operation?.pizzas ? (
        <PizzasList pizzas={operation.pizzas} />
      ) : (
        <span>No pizzas</span>
      )}
      <br />

      <BackButton onClick={() => navigate(-1)}>Go Back</BackButton>
    </MainTemplate>
  );
}

export default Operation;
