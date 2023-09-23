import { useState } from "react";
import Button from "../../../Components/buttons/Button";
import { useApiAdmin } from "../../../hooks/useApiAdmin";
import { remove as removeIngredient } from "../../../services/ingredients/remove";
import { Ingredient } from "../../../types/Ingredient";
import EditPanel from "./EditPanel";
import "./styles.css";

interface Props {
  data: Ingredient;
  refreshData: () => void;
  updateData: (item: object) => void;
}

export default function Row({ data, refreshData, updateData }: Props) {
  const [editPanel, setEditPanel] = useState(false);

  const deleteIngredient = () => {
    function show_confirm() {
      var r = confirm(
        `Confirm deleting the operation and all associations. ID: ${data.id}, Name: ${data.name}`
      );
      if (r == true) {
        return true;
      } else {
        return false;
      }
    }

    if (show_confirm()) {
      removeIngredient(data.id).finally(() => {
        refreshData();
      });
    }
  };

  if (editPanel) {
    return (
      <>
        <td colSpan={3}>
          <EditPanel
            ingredientID={data.id}
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
        <Button
          onClick={() => {
            deleteIngredient();
          }}
          className=""
        >
          Delete
        </Button>
      </td>
    </>
  );
}
