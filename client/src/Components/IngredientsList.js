import { useNavigate } from "react-router-dom";

import Button from "./buttons/Button";

export default function IngredientsList({ ingredients }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-wrap">
        {ingredients.map((ingredient) => (
          <div key={ingredient.id} className="m-2">
            <Button
              className="bg-lime-200"
              onClick={() => navigate(`/ingredient/${ingredient.id}`)}
            >
              {ingredient.name}
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
