import { SubmitHandler, useForm } from "react-hook-form";

import Button from "../../../Components/buttons/Button";
import Input from "../../../Components/form/Input";
import Select from "../../../Components/form/Select";
import { useApiAdmin } from "../../../hooks/useApiAdmin";
import { create as createIngredient } from "../../../services/ingredients/create";
import { getAll as getAllOperations } from "../../../services/operations/getAll";
import { Operation } from "../../../types/Operation";

interface IFormInputs {
  name: string;
  operationID: string;
}

export default function AddNew({ closePanel, refreshData }: any) {
  const { handleSubmit, register } = useForm<IFormInputs>();
  const [allOperations, isLoadingOperations, isErrorOperations] = useApiAdmin<
    Operation[]
  >(() => getAllOperations());

  const onSubmit: SubmitHandler<IFormInputs> = (body) => {
    const newBody = {
      name: body.name,
      operation: body.operationID || null,
    };

    createIngredient(newBody)
      .then((response) => response.json())
      .then(() => {
        refreshData();
      })
      .finally(() => {
        closePanel();
      });
  };

  if (isLoadingOperations) return <div>Loading...</div>;
  if (!allOperations || isErrorOperations) return <div>Error</div>;

  return (
    <div className="mt-5 mb-5 p-5 border-gray-500 border-b border-t transition duration-300 ease-in-out hover:bg-neutral-100">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <p className="font-semibold">Panel for adding a new ingredient</p>

        <Input
          register={{ ...register("name") }}
          defaultValue=""
          name="Operation name"
        />

        <Select register={{ ...register("operationID") }} name="Operation">
          <option value="">Select...</option>
          {allOperations?.map((operation: Operation) => (
            <option key={operation.id} value={operation.id}>
              {operation.name}
            </option>
          ))}
        </Select>

        <div className="mt-5">
          <Button className="mr-5" onClick={closePanel}>
            Close
          </Button>
          <Button type="submit">Create</Button>
        </div>
      </form>
    </div>
  );
}
