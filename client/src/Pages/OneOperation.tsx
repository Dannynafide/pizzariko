import { useNavigate, useParams } from "react-router-dom";

import IngredientsList from "../Components/IngredientsList";
import PizzasList from "../Components/PizzasList";
import BackButton from "../Components/buttons/BackButton";
import { useApi } from "../hooks/useApi";
import { get } from "../services/operations/get";
import MainTemplate from "../templates/MainTemplate/MainTemplate";
import { Operation } from "../types/Operation";

function OneOperation() {
  const params = useParams();
  const id = params.id!;
  const {
    data: operation,
    isLoading,
    isError,
  } = useApi<Operation>(() => get(id));
  const navigate = useNavigate();

  if (isError) {
    return (
      <MainTemplate
        title={"There has been a problem with your fetch operation"}
      />
    );
  }

  if (isLoading) {
    return <MainTemplate title={"Loading..."} />;
  }

  return (
    <MainTemplate title={`Operation: ${operation?.name}`}>
      <>
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
      </>
    </MainTemplate>
  );
}

export default OneOperation;
