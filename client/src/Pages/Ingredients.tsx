import IngredientsList from "../Components/IngredientsList";
import { useApi } from "../hooks/useApi";
import { fetchIngredients } from "../services/ingredients";
import MainTemplate from "../templates/MainTemplate/MainTemplate";
import { Ingredient } from "../types/Ingredient";

function Ingredients() {
  const {
    data: ingredients,
    isLoading,
    isError,
  } = useApi<Ingredient[]>(fetchIngredients);

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
    <MainTemplate title="The best ingredients for our pizzas">
      <IngredientsList ingredients={ingredients} />
    </MainTemplate>
  );
}

export default Ingredients;
