import { useEffect, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Button from "../../../Components/buttons/Button";
import Checkboxes from "../../../Components/form/Checkboxes";
import Input from "../../../Components/form/Input";
import { useApiAdmin } from "../../../hooks/useApiAdmin";
import { getAll as getAllIngredients } from "../../../services/ingredients/getAll";
import { getAll as getAllOperations } from "../../../services/operations/getAll";
import { get as getPizza } from "../../../services/pizzas/get";
import { update } from "../../../services/pizzas/update";
import { Ingredient } from "../../../types/Ingredient";
import { Operation } from "../../../types/Operation";
import { Pizza } from "../../../types/Pizza";

interface IFormInputs {
  name: string;
  imageSrc: string;
  price: number;
  ingredients: Array<string>;
  operations: Array<string>;
}

export default function EditPanel({
  pizzaID,
  closeEditPanel,
  updateData,
}: any): React.ReactElement {
  const [pizza, isLoading, isError] = useApiAdmin<Pizza>(() =>
    getPizza(pizzaID)
  );

  const [allIngredients, isLoadingIngredients, isErrorIngredients] =
    useApiAdmin<Ingredient[]>(() => getAllIngredients());
  const [allOperations, isLoadingOperations, isErrorOperations] = useApiAdmin<
    Operation[]
  >(() => getAllOperations());

  const pizzaIngredients = pizza?.ingredients.map(
    (item: Ingredient) => item.id
  );
  const pizzaOperations = pizza?.operations.map((item: Operation) => item.id);

  const { handleSubmit, reset, register } = useForm<IFormInputs>({
    defaultValues: useMemo(() => {
      return {
        ingredients: pizzaIngredients,
        operations: pizzaOperations,
      };
    }, [pizza]),
  });

  useEffect(() => {
    reset({
      ingredients: pizzaIngredients,
      operations: pizzaOperations,
    });
  }, [pizza?.ingredients, pizza?.operations]);

  const onSubmit: SubmitHandler<IFormInputs> = (body) => {
    const newBody = {
      name: body.name,
      price: body.price || null,
      imageSrc: body.imageSrc || null,
      ingredients: body.ingredients || null,
      operations: body.operations || null,
    };

    update(pizzaID, newBody)
      .then((response) => response.json())
      .then((data: Pizza) => {
        updateData(data);
      })
      .finally(() => {
        closeEditPanel();
      });
  };

  if (isLoading) return <div>Loading...</div>;
  if (!pizza || isError) return <div>Error</div>;

  if (isLoadingIngredients) return <div>Loading...</div>;
  if (!allIngredients || isErrorIngredients) return <div>Error</div>;

  if (isLoadingOperations) return <div>Loading...</div>;
  if (!allOperations || isErrorOperations) return <div>Error</div>;

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
          {pizza.id}
        </div>

        <Input
          register={{ ...register("name") }}
          defaultValue={pizza.name}
          name="Operation name"
        />

        <Input
          register={{ ...register("imageSrc") }}
          defaultValue={pizza.imageSrc}
          name="Image src"
        />

        <Input
          register={{ ...register("price") }}
          defaultValue={pizza.price}
          name="Price"
          type="number"
        />

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

        <div className="mt-5 flex gap-5">
          <Button type="submit">Save</Button>
          <Button onClick={closeEditPanel}>Close</Button>
        </div>
      </form>
    </div>
  );
}
