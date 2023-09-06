import { useEffect, useState } from "react";

import ProductsList from "../Components/ProductsList";
import MainTemplate from "../templates/MainTemplate/MainTemplate.js";
import { createHrefFromID } from "../utils/transformDatabaseData";

const Pizzas = () => {
  const [pizzas, setPizzas] = useState();
  const [message, setMessage] = useState();

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/pizza");

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

        const pizzasFromHref = createHrefFromID("/pizza", records);

        setPizzas(pizzasFromHref);
      } catch (error) {
        setMessage("There has been a problem with your fetch operation");
      }
    };
    fetchPizzas();

    return;
  }, []);

  if (!pizzas) {
    return <MainTemplate title={message} />;
  }

  return (
    <MainTemplate title="List of pizzas in our offer">
      <ProductsList products={pizzas} />
    </MainTemplate>
  );
};

export default Pizzas;
