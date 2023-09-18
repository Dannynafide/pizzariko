import { Operation } from "./Operation";

export interface Ingredient {
  id: string;
  name: string;
  operation: Operation;
  pizzas: [];
}
