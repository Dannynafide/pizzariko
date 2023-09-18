// import { useApi } from "../../hooks/useApi";
// import { fetchOperations } from "../../services/operations";
// import { fetchPizza, fetchPizzas } from "../../services/pizzas";
import MainTemplate from "../../templates/MainTemplate/MainTemplate";
import Operations from "./Operations";
// import { Ingredient } from "../../types/Ingredient";
// import { Operation } from "../../types/Operation";
// import { Pizza } from "../../types/Pizza";

const Admin = () => {
  return (
    <MainTemplate title="Operations">
      <>
        <Operations />
        {/* <Pizzas /> */}
      </>
    </MainTemplate>
  );
};

// const Operations = () => {
//   const {
//     data: operations,
//     isLoading,
//     isError,
//   } = useApi<Operation[]>(fetchOperations);
//   if (isError) return <p>Error</p>;
//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <>
//       {operations.map((product) => (
//         <div key={product.id}>OneOperation: {product.name}</div>
//         // <div key={product.id}>
//         //   <OneOperation id={product.id} />
//         // </div>
//       ))}
//     </>
//   );
// };

// function OneOperation({ id }) {
//   const { data, isLoading, isError } = useApi<Operation>(() =>
//     fetchOperation(id)
//   );
//   if (isError) return <p>Error</p>;
//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <div key={data.id} style={{ border: "1px green solid" }}>
//       <div>ID: {data.id}</div>
//       <div>name: {data.name}</div>

//       <div style={{ color: "green" }}>
//         <p>Pizzas:</p>
//         {data.pizzas.map((item: Pizza) => (
//           <div key={item.id}>name: {item.name}</div>
//         ))}
//       </div>
//       <div style={{ color: "blue" }}>
//         <p>Ingredients:</p>
//         {data.ingredients.map((item: Ingredient) => (
//           <div key={item.id}>name: {item.name}</div>
//         ))}
//       </div>
//     </div>
//   );
// }

// const Pizzas = () => {
//   const { data: pizzas, isLoading, isError } = useApi<Pizza[]>(fetchPizzas);
//   if (isError) return <p>Error</p>;
//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <>
//       {pizzas.map((product) => (
//         <OnePizza key={product.id} id={product.id} />
//       ))}
//     </>
//   );
// };

// function OnePizza({ id }: string) {
//   const {
//     data: pizza,
//     isLoading,
//     isError,
//   } = useApi<Pizza>(() => fetchPizza(id));
//   if (isError) return <p>Error</p>;
//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <div key={pizza.id} style={{ border: "2px black solid" }}>
//       <div>ID: {pizza.id}</div>
//       <div>name: {pizza.name}</div>
//       <div>price: {pizza.price}</div>
//       <div>
//         {/* <img
//           src={pizza.imageSrc}
//           alt={pizza.imageAlt}
//           style={{ width: "20%" }}
//         /> */}
//         <div>src: {pizza.imageSrc}</div>
//         <div>alt: {pizza.imageAlt}</div>
//         <div style={{ color: "green" }}>
//           <p>Ingredients:</p>
//           {pizza.ingredients.map((ingredient) => (
//             <div key={ingredient.id}>name: {ingredient.name}</div>
//           ))}
//         </div>
//         <div style={{ color: "blue" }}>
//           <p>Operations:</p>
//           {pizza.operations.map((operation) => (
//             <div key={operation.id}>name: {operation.name}</div>
//           ))}

//           <br />
//         </div>
//       </div>
//     </div>
//   );
// }

export default Admin;
