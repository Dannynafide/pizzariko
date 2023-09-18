import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import NavBar from "./Components/NavBar";
import Ingredients from "./Pages/Ingredients";
import OneIngredient from "./Pages/OneIngredient";
import OneOperation from "./Pages/OneOperation";
import OnePizza from "./Pages/OnePizza";
import Operations from "./Pages/Operations";
import Pizzas from "./Pages/Pizzas";
import EditPizzas from "./Pages/admin/Admin";
const NoMatch = lazy(() => import("./Pages/NoMatch"));

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
