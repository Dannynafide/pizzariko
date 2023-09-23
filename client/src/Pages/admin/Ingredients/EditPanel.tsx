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
}: any) {
  const [ingredient, isLoading, isError] = useApiAdmin<Ingredient>(() =>
    getIngredient(ingredientID)
  );
  const [operations, isLoadingOper, isErrorOper] = useApiAdmin<Operation[]>(
    () => getAllOperations()
  );
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

  if (isLoading || isLoadingOper) {
    return <div>Loading...</div>;
  }

  if (!ingredient || isError || isErrorOper) {
    return <div>Error</div>;
  }

  return (
    <div>
      <form
        className="whitespace-nowrap py-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <span className="my-4">ID: {ingredient.id}</span>
        <br />
        <br />
        <div className="flex w-72 flex-col items-end gap-6">
          <Input
            register={{ ...register("name") }}
            defaultValue={ingredient.name}
            name="Operation name"
          />
        </div>
        <br />

        <Select
          register={{ ...register("operationID") }}
          defaultValue={ingredient.operation?.id}
          name="Operation"
        >
          <option value="">Select...</option>
          {operations?.map((operation: Operation) => (
            <option key={operation.id} value={operation.id}>
              {operation.name}
            </option>
          ))}
        </Select>

        <br />
        <div>
          <span>Pizzas:</span>
          {ingredient.pizzas.map((pizza: Pizza) => (
            <span key={pizza.id}> {pizza.name},</span>
          ))}
        </div>
        <br />

        <Button type="submit">Save</Button>
        <Button
          onClick={() => {
            closeEditPanel();
          }}
          className="ml-5"
        >
          Close
        </Button>
      </form>
    </div>
  );
}
