import { SubmitHandler, useForm } from "react-hook-form";

import Button from "../../../Components/buttons/Button";
import Input from "../../../Components/form/Input";
import { useApiAdmin } from "../../../hooks/useApiAdmin";
import { get as getOperation } from "../../../services/operations/get";
import { update } from "../../../services/pizzas/update";
import { Ingredient } from "../../../types/Ingredient";
import { Operation } from "../../../types/Operation";
import { Pizza } from "../../../types/Pizza";

interface IFormInputs {
  name: string;
  pizzas: Array<string>;
  ingredients: Array<string>;
}

export default function EditPanel({
  operationID,
  closeEditPanel,
  updateData,
}: any): React.ReactElement {
  const [operation, isLoading, isError] = useApiAdmin<Operation>(() =>
    getOperation(operationID)
  );

  const { handleSubmit, reset, register } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = (body) => {
    const newBody = {
      name: body.name,
    };

    update(operationID, newBody)
      .then((response) => response.json())
      .then((data: Operation) => {
        updateData(data);
      })
      .finally(() => {
        closeEditPanel();
      });
  };

  if (isLoading) return <div>Loading...</div>;
  if (!operation || isError) return <div>Error</div>;

  const ingredientNames = Array.from(
    operation.ingredients,
    (x: Ingredient) => x.name
  ).join(", ");

  const pizzaNames = Array.from(operation.pizzas, (x: Pizza) => x.name).join(
    ", "
  );

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
          {operation.id}
        </div>

        <Input
          register={{ ...register("name") }}
          defaultValue={operation.name}
          name="Operation name"
        />

        <div>
          <span className="font-semibold">Ingredients: </span>
          {ingredientNames}
        </div>

        <div>
          <span className="font-semibold">Pizzas: </span>
          {pizzaNames}
        </div>

        <div className="mt-5 flex gap-5">
          <Button type="submit">Save</Button>
          <Button onClick={closeEditPanel}>Close</Button>
        </div>
      </form>
    </div>
  );
}
