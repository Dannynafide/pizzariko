import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import IngredientsList from "../Components/IngredientsList";
import MainTemplate from "../templates/MainTemplate/MainTemplate.js";

function Ingredients() {
  const [ingredients, setIngredients] = useState();
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/ingredient");

        if (!response.ok) {
          const message = `An error has occurred: ${response.statusText}`;
          setMessage(message);
          return;
        }

        const records = await response.json();
        if (!records) {
          setMessage(`Records not found`);
          return;
        }

        setIngredients(records);
      } catch (error) {
        setMessage("There has been a problem with your fetch operation");
      }
    };
    fetchPizzas();

    return;
  }, [navigate]);

  if (!ingredients) {
    return <MainTemplate title={message} />;
  }

  return (
    <MainTemplate title="The best ingredients for our pizzas">
      <IngredientsList ingredients={ingredients} />
    </MainTemplate>
  );
}

export default Ingredients;
