import { useNavigate } from "react-router-dom";

import Button from "./buttons/Button";

export default function OperationsList({ pizzas }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-wrap">
        {pizzas.map((pizza) => (
          <div key={pizza.id} className="m-2">
            <Button onClick={() => navigate(`/pizza/${pizza.id}`)}>
              {pizza.name}
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
