import { useState } from "react";

import Button from "../../../Components/buttons/Button";
import { useApiAdmin } from "../../../hooks/useApiAdmin";
import { getAll as getAllIngredients } from "../../../services/ingredients/getAll";
import { Ingredient } from "../../../types/Ingredient";
import AddNew from "./AddNew";
import Row from "./Row";
import "./styles.css";

export default function Ingredients() {
  const [data, isLoading, isError, request, updateData] =
    useApiAdmin<Ingredient[]>(getAllIngredients);
  const [showPanel, setShowPanel] = useState(false);

  if (isError) return <p>Error</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="min-w-full text-left text-sm font-light">
      {!showPanel && (
        <Button
          onClick={() => {
            setShowPanel(true);
          }}
        >
          Add new items
        </Button>
      )}
      {showPanel && (
        <AddNew closePanel={() => setShowPanel(false)} refreshData={request} />
      )}

      <table>
        <thead className="font-semibold">
          <tr>
            <th className="px-4 py-4">#</th>
            <th className="py-4">ID</th>
            <th className="py-4">Name</th>
            <th className="py-4">Function</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((ingredient, index) => (
              <tr
                key={ingredient.id}
                className="transition duration-300 ease-in-out hover:bg-neutral-200"
              >
                <td className="font-semibold px-4 py-4">{index}</td>
                <Row
                  data={ingredient}
                  refreshData={request}
                  updateData={updateData}
                />
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
