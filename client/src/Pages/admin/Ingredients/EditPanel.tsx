import { SubmitHandler, useForm } from "react-hook-form";

import Button from "../../../Components/buttons/Button";
import Input from "../../../Components/form/Input";
import Select from "../../../Components/form/Select";
import { useApiAdmin } from "../../../hooks/useApiAdmin";
import { get as getIngredient } from "../../../services/ingredients/get";
import { update as updateIngredient } from "../../../services/ingredients/update";
import { getAll as getAllOperations } from "../../../services/operations/getAll";
import { Ingredient } from "../../../types/Ingredient";
import { Operation } from "../../../types/Operation";
import { Pizza } from "../../../types/Pizza";

interface IFormInputs {
  name: string;
  operationID: string;
}

export default function EditPanel({
  ingredientID,
  closeEditPanel,
  updateData,
}: any): React.ReactElement {
  const [ingredient, isLoading, isError] = useApiAdmin<Ingredient>(() =>
    getIngredient(ingredientID)
  );

  const [allOperations, isLoadingOperations, isErrorOperations] = useApiAdmin<
    Operation[]
  >(() => getAllOperations());

  const { handleSubmit, register } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = (body) => {
    const newBody = {
      name: body.name,
      operation: body.operationID || null,
    };

    updateIngredient(ingredientID, newBody)
      .then((response) => response.json())
      .then((data) => {
        updateData(data);
      })
      .finally(() => {
        closeEditPanel();
      });
  };

  if (isLoading) return <div>Loading...</div>;
  if (!ingredient || isError) return <div>Error</div>;

  if (isLoadingOperations) return <div>Loading...</div>;
  if (!allOperations || isErrorOperations) return <div>Error</div>;

  const ingredientNames = Array.from(
    ingredient.pizzas,
    (x: Pizza) => x.name
  ).join(", ");

  return (
    <div>
      <form
        className="whitespace-nowrap py-4 flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <span className="my-4 mr-1 text-sm font-semibold leading-6 text-gray-900">
            ID:
          </span>
          {ingredient.id}
        </div>

        <Input
          register={{ ...register("name") }}
          defaultValue={ingredient.name}
          name="Operation name"
        />

        <Select
          register={{ ...register("operationID") }}
          defaultValue={ingredient.operation?.id}
          name="Operation"
        >
          <option value="">Select...</option>
          {allOperations?.map((operation: Operation) => (
            <option key={operation.id} value={operation.id}>
              {operation.name}
            </option>
          ))}
        </Select>

        <div>
          <span className="font-semibold">Pizzas: </span>
          {ingredientNames}
        </div>

        <div className="mt-5 flex gap-5">
          <Button type="submit">Save</Button>
          <Button onClick={closeEditPanel}>Close</Button>
        </div>
      </form>
    </div>
  );
}
