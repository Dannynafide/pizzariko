import { NavLink, Outlet, redirectDocument } from "react-router-dom";

import { useEffect } from "react";
import { routes } from "../../routes/index";
import MainTemplate from "../../templates/MainTemplate/MainTemplate";

const Admin = () => {
  const classActive =
    "-mb-px bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold";
  const classNormal =
    "bg-white inline-block py-2 px-4 text-gray-500 hover:text-blue-800 font-semibold";

  const navLinks = [
    { to: routes.adminPizzas, title: "Pizzas" },
    { to: routes.adminIngredients, title: "Ingredients" },
    { to: routes.adminOperations, title: "Operations" },
  ];

  return (
    <MainTemplate title="Admin panel">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <ul className="flex border-b mb-4">
          {navLinks.map((link) => (
            <li className="mr-1" key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  isActive ? classActive : classNormal
                }
              >
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>

        <Outlet />
      </div>
    </MainTemplate>
  );
};

export default Admin;
