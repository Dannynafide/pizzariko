import { useNavigate, useParams } from "react-router-dom";

import OperationList from "../Components/OperationsList";
import PizzasList from "../Components/PizzasList";
import BackButton from "../Components/buttons/BackButton";
import { useApi } from "../hooks/useApi";
import { get as getIngredient } from "../services/ingredients/get";
import MainTemplate from "../templates/MainTemplate/MainTemplate";
import { Ingredient } from "../types/Ingredient";

function OneIngredient() {
  const params = useParams();
  const id = params.id!;
  const {
    data: ingredient,
    isLoading,
    isError,
  } = useApi<Ingredient>(() => getIngredient(id));
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
    <MainTemplate title={`Ingredient: ${ingredient?.name}`}>
      <>
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
      </>
    </MainTemplate>
  );
}

export default OneIngredient;
