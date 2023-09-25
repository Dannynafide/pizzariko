import { SubmitHandler, useForm } from "react-hook-form";

import Button from "../../../Components/buttons/Button";
import Input from "../../../Components/form/Input";
import { create as createOperation } from "../../../services/operations/create";

interface IFormInputs {
  name: string;
}

export default function AddNew({ closePanel, refreshData }: any) {
  const { handleSubmit, register } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = (body) => {
    const newBody = {
      name: body.name,
    };

    createOperation(newBody)
      .then((response) => response.json())
      .then(() => {
        refreshData();
      })
      .finally(() => {
        closePanel();
      });
  };

  return (
    <div className="mt-5 mb-5 p-5 border-gray-500 border-b border-t transition duration-300 ease-in-out hover:bg-neutral-200">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <p className="font-semibold">Panel for adding a new operation</p>

        <Input register={{ ...register("name") }} name="Operation name" />

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
