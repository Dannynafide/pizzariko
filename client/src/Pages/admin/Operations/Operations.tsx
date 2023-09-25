import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Button from "../../../Components/buttons/Button";
import Input from "../../../Components/form/Input";
import { useApiAdmin } from "../../../hooks/useApiAdmin";
import { create as createOperation } from "../../../services/operations/create";
import { get as getOperation } from "../../../services/operations/get";
import { getAll as getAllOperations } from "../../../services/operations/getAll";
import { remove as removeOperation } from "../../../services/operations/remove";
import { update as updateOperation } from "../../../services/operations/update";
import { Operation } from "../../../types/Operation";
import { Pizza } from "../../../types/Pizza";

function Operations() {
  const [data, isLoading, isError, request, updateData] =
    useApiAdmin<Operation[]>(getAllOperations);
  const [showPanel, setShowPanel] = useState(false);

  if (isError) return <p>Error</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      {!showPanel && (
        <Button
          className="bg-green-100"
          onClick={() => {
            setShowPanel(true);
          }}
        >
          Add new operaion
        </Button>
      )}
      {showPanel && (
        <AddNew closePanel={() => setShowPanel(false)} refreshData={request} />
      )}

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <div className="min-w-full text-left text-sm font-light">
                <div className="grid grid-cols-5 gap-4 border-b font-semibold dark:border-neutral-500">
                  <div className="px-6 py-4">#</div>
                  <div className="px-6 py-4 col-span-2">ID</div>
                  <div className="px-6 py-4">Name</div>
                  <div className="px-6 py-4">Edit</div>
                </div>
              </div>

              <div className="min-w-full text-left text-sm font-light">
                {data &&
                  data.map((operation, index) => (
                    <div
                      key={operation.id}
                      className="grid grid-cols-5 gap-4 border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                    >
                      <div className="whitespace-nowrap px-6 py-4 font-semibold">
                        {index + 1}
                      </div>
                      <OneOperation
                        operation={operation}
                        updateData={updateData}
                        refresh={request}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface Props {
  operation: Operation;
  updateData: (item: object) => void;
  refresh: () => void;
}

interface IFormInputs {
  name: string;
}

function OneOperation({ operation, updateData, refresh }: Props) {
  const [showEditPanel, setShowEditPanel] = useState(false);

  function show_confirm() {
    var r = confirm(
      `Confirm deleting the operation and all associations. ID: ${operation.id}, Name: ${operation.name}`
    );
    if (r == true) {
      return true;
    } else {
      return false;
    }
  }

  const onDelete = () => {
    if (show_confirm()) {
      removeOperation(operation.id).finally(() => {
        refresh();
      });
    }
  };

  if (showEditPanel) {
    return (
      <>
        <div className="whitespace-nowrap px-6 py-4 col-span-4">
          <EditPanel
            operation={operation}
            closeEditPanel={() => setShowEditPanel(false)}
            updateData={updateData}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="whitespace-nowrap px-6 py-4 col-span-2">
        {operation.id}
      </div>
      <div className="whitespace-nowrap px-6 py-4 ">{operation.name}</div>
      <div className="whitespace-nowrap px-6 py-4">
        <Button
          onClick={() => {
            setShowEditPanel(!showEditPanel);
          }}
          className="mr-2"
        >
          Edit
        </Button>
        <Button
          onClick={() => {
            onDelete();
          }}
        >
          Delete
        </Button>
      </div>
    </>
  );
}

function EditPanel({ operation, closeEditPanel, updateData }: any) {
  const [data, isLoading, isError] = useApiAdmin<Operation>(() =>
    getOperation(operation.id)
  );
  const { handleSubmit, register } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = (body) => {
    updateOperation(operation.id, body)
      .then((response) => response.json())
      .then((data) => {
        updateData(data);
      })
      .finally(() => {
        closeEditPanel();
      });
  };

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (!data || isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>ID: {data.id}</p>
        <br />
        <div className="flex w-72 flex-col items-end gap-6">
          <Input
            register={{ ...register("name") }}
            defaultValue={data.name}
            name="Operation name"
          />
        </div>
        <br />
        <div>
          <span>Pizzas:</span>
          {data?.pizzas.map((pizza: Pizza) => (
            <span key={pizza.id}> {pizza.name},</span>
          ))}
        </div>
        <br />
        <div>
          <span>Ingredients:</span>
          {data?.ingredients.map((pizza: Pizza) => (
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

function AddNew({ closePanel, refreshData }: any) {
  const { handleSubmit, register } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = (body) => {
    createOperation(body)
      .then((response) => response.json())
      .then(() => {
        refreshData();
      })
      .finally(() => {
        closePanel();
      });
  };

  return (
    <div className="mt-5 mb-5 p-5 border-b border-t transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
      <p className="font-semibold">Panel for adding a new operation</p>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-end gap-6">
          <Input
            register={{ ...register("name") }}
            defaultValue=""
            name="Operation name"
          />
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

export default Operations;
