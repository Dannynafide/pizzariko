import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import NavBar from "./Components/NavBar.js";
import Ingredients from "./Pages/Ingredients.js";
import OneIngredient from "./Pages/OneIngredient.js";
import OneOperation from "./Pages/OneOperation.js";
import OnePizza from "./Pages/OnePizza.js";
import Operations from "./Pages/Operations.js";
import Pizzas from "./Pages/Pizzas.js";
import EditPizzas from "./Pages/admin/EditPizzas.js";
const NoMatch = lazy(() => import("./Pages/NoMatch.js"));

function App() {
  return (
    <>
      <NavBar />
      <Suspense fallback={<div className="container">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Pizzas />} />
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/operations" element={<Operations />} />

          <Route path="/pizza/:id" element={<OnePizza />} />
          <Route path="/ingredient/:id" element={<OneIngredient />} />
          <Route path="/operation/:id" element={<OneOperation />} />

          <Route path="/admin" element={<EditPizzas />} />

          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
