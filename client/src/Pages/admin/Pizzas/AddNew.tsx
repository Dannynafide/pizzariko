import { SubmitHandler, useForm } from "react-hook-form";

import Button from "../../../Components/buttons/Button";
import Checkboxes from "../../../Components/form/Checkboxes";
import Input from "../../../Components/form/Input";
import { useApiAdmin } from "../../../hooks/useApiAdmin";
import { getAll as getAllIngredients } from "../../../services/ingredients/getAll";
import { getAll as getAllOperations } from "../../../services/operations/getAll";
import { create as createPizza } from "../../../services/pizzas/create";
import { Ingredient } from "../../../types/Ingredient";
import { Operation } from "../../../types/Operation";

interface IFormInputs {
  name: string;
  imageSrc: string;
  price: number;
  ingredients: Array<string>;
  operations: Array<string>;
}

export default function AddNew({ closePanel, refreshData }: any) {
  const { handleSubmit, register } = useForm<IFormInputs>();

  const [allIngredients, isLoadingIngredients, isErrorIngredients] =
    useApiAdmin<Ingredient[]>(() => getAllIngredients());
  const [allOperations, isLoadingOperations, isErrorOperations] = useApiAdmin<
    Operation[]
  >(() => getAllOperations());

  const onSubmit: SubmitHandler<IFormInputs> = (body) => {
    const newBody = {
      name: body.name,
      price: body.price || null,
      imageSrc: body.imageSrc || null,
      ingredients: body.ingredients || null,
      operations: body.operations || null,
    };

    createPizza(newBody)
      .then((response) => response.json())
      .then(() => {
        refreshData();
      })
      .finally(() => {
        closePanel();
      });
  };

  if (isLoadingIngredients) return <div>Loading...</div>;
  if (!allIngredients || isErrorIngredients) return <div>Error</div>;

  if (isLoadingOperations) return <div>Loading...</div>;
  if (!allOperations || isErrorOperations) return <div>Error</div>;

  return (
    <div className="mt-5 mb-5 p-5 border-gray-500 border-b border-t transition duration-300 ease-in-out hover:bg-neutral-200">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <p className="font-semibold">Panel for adding a new pizza</p>

        <Input register={{ ...register("name") }} name="Operation name" />

        <Input register={{ ...register("imageSrc") }} name="Image src" />

        <Input register={{ ...register("price") }} name="Price" type="number" />

        <Checkboxes
          register={{ ...register("ingredients") }}
          title="Ingredients:"
          data={allIngredients ?? null}
        />

        <Checkboxes
          register={{ ...register("operations") }}
          title="Operations:"
          data={allOperations ?? null}
        />

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
