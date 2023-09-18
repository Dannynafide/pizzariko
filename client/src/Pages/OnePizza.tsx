import { useNavigate, useParams } from "react-router-dom";

import BackButton from "../Components/buttons/BackButton";
import IngredientsList from "../Components/IngredientsList";
import OperationList from "../Components/OperationsList";
import { useApi } from "../hooks/useApi";
import { fetchPizza } from "../services/pizzas";
import MainTemplate from "../templates/MainTemplate/MainTemplate";
import { Pizza } from "../types/Pizza";

function Home() {
  const params = useParams();
  const id = params.id!;
  const {
    data: pizza,
    isLoading,
    isError,
  } = useApi<Pizza>(() => fetchPizza(id));
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
    <MainTemplate title={`Pizza: ${pizza?.name}`}>
      <>
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
      </>
    </MainTemplate>
  );
}

export default Home;
