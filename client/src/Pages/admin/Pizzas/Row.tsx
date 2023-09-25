import { useState } from "react";

import Button from "../../../Components/buttons/Button";
import { remove as removePizzas } from "../../../services/pizzas/remove";
import { Pizza } from "../../../types/Pizza";
import { confirmAction } from "../../../utils/confirmAction";
import "../styles.css";
import EditPanel from "./EditPanel";

interface Props {
  data: Pizza;
  refreshData: () => void;
  updateData: (item: object) => void;
}

export default function Row({ data, refreshData, updateData }: Props) {
  const [editPanel, setEditPanel] = useState(false);

  const deletePizza = () => {
    if (
      confirmAction(
        `Confirm deleting the pizza and all associations. ID: ${data.id}, Name: ${data.name}`
      )
    ) {
      removePizzas(data.id).finally(() => {
        refreshData();
      });
    }
  };

  if (editPanel) {
    return (
      <>
        <td colSpan={3}>
          <EditPanel
            pizzaID={data.id}
            closeEditPanel={() => setEditPanel(false)}
            updateData={updateData}
          />
        </td>
      </>
    );
  }

  return (
    <>
      <td>{data.id}</td>
      <td>{data.name}</td>
      <td>
        <Button
          onClick={() => {
            setEditPanel(!editPanel);
          }}
          className="mr-5"
        >
          Edit
        </Button>
        <Button onClick={deletePizza} className="">
          Delete
        </Button>
      </td>
    </>
  );
}
