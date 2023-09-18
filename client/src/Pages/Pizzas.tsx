import ProductsList from "../Components/ProductsList";
import { useApi } from "../hooks/useApi";
import { fetchPizzas } from "../services/pizzas";
import MainTemplate from "../templates/MainTemplate/MainTemplate";
import { Pizza } from "../types/Pizza";
import { addHrefFromID } from "../utils/transformDatabaseData";

const Pizzas = () => {
  const { data: pizzas, isLoading, isError } = useApi<Pizza[]>(fetchPizzas);

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
  const pizzasFromHref = addHrefFromID("/pizza", pizzas);
  return (
    <MainTemplate title="List of pizzas in our offer">
      <ProductsList products={pizzasFromHref} />
    </MainTemplate>
  );
};

export default Pizzas;
