import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import NavBar from "./Components/NavBar";
import Ingredients from "./Pages/Ingredients";
import OneIngredient from "./Pages/OneIngredient";
import OneOperation from "./Pages/OneOperation";
import OnePizza from "./Pages/OnePizza";
import Operations from "./Pages/Operations";
import Pizzas from "./Pages/Pizzas";
import Admin from "./Pages/admin/Admin";
import { routes } from "./routes/index";
const NoMatch = lazy(() => import("./Pages/NoMatch"));
const AdminIngredients = lazy(() => import("./Pages/admin/Ingredients"));
const AdminOperations = lazy(() => import("./Pages/admin/Operations"));
const AdminPizzas = lazy(() => import("./Pages/admin/Pizzas"));

function App() {
  return (
    <>
      <NavBar />
      <Suspense fallback={<div className="container">Loading...</div>}>
        <Routes>
          <Route path={routes.pizzas} element={<Pizzas />} />
          <Route path={routes.ingredients} element={<Ingredients />} />
          <Route path={routes.operations} element={<Operations />} />

          <Route path={routes.pizza} element={<OnePizza />} />
          <Route path={routes.ingredient} element={<OneIngredient />} />
          <Route path={routes.operation} element={<OneOperation />} />

          <Route path={routes.admin} element={<Admin />}>
            <Route
              index
              element={<Navigate to={routes.adminPizzas} replace />}
            />
            <Route path={routes.adminPizzas} element={<AdminPizzas />} />
            <Route
              path={routes.adminIngredients}
              element={<AdminIngredients />}
            />
            <Route
              path={routes.adminOperations}
              element={<AdminOperations />}
            />
          </Route>

          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
