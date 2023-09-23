import { SubmitHandler, useForm } from "react-hook-form";

import Button from "../../../Components/buttons/Button";
import Input from "../../../Components/form/Input";
import Select from "../../../Components/form/Select";
import { useApiAdmin } from "../../../hooks/useApiAdmin";
import { create } from "../../../services/ingredients/create";
import { getAll } from "../../../services/operations/getAll";
import { Operation } from "../../../types/Operation";

interface IFormInputs {
  name: string;
  operationID: string;
}

export default function AddNew({ closePanel, refreshData }: any) {
  const { handleSubmit, register } = useForm<IFormInputs>();
  const [operations, isLoadingOper, isErrorOper] = useApiAdmin<Operation[]>(
    () => getAll()
  );

  const onSubmit: SubmitHandler<IFormInputs> = (body) => {
    const newBody = {
      name: body.name,
      operation: body.operationID || null,
    };

    create(newBody)
      .then((response) => response.json())
      .then(() => {
        refreshData();
      })
      .finally(() => {
        closePanel();
      });
  };

  return (
    <div className="mt-5 mb-5 p-5 border-gray-500 border-b border-t transition duration-300 ease-in-out hover:bg-neutral-100">
      <p className="font-semibold">Panel for adding a new operation</p>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            register={{ ...register("name") }}
            defaultValue=""
            name="Operation name"
          />
          <br />

          <Select register={{ ...register("operationID") }} name="Operation">
            <option value="">Select...</option>
            {operations?.map((operation: Operation) => (
              <option key={operation.id} value={operation.id}>
                {operation.name}
              </option>
            ))}
          </Select>

          <br />
          <div>
            <Button className="mr-5" onClick={closePanel}>
              Close
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
