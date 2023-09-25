import { useState } from "react";

import Button from "../../../Components/buttons/Button";
import { remove as removeOperations } from "../../../services/operations/remove";
import { Operation } from "../../../types/Operation";
import { confirmAction } from "../../../utils/confirmAction";
import "../styles.css";
import EditPanel from "./EditPanel";

interface Props {
  data: Operation;
  refreshData: () => void;
  updateData: (item: object) => void;
}

export default function Row({ data, refreshData, updateData }: Props) {
  const [editPanel, setEditPanel] = useState(false);

  const deleteIngredient = () => {
    if (
      confirmAction(
        `Confirm deleting the operation and all associations. ID: ${data.id}, Name: ${data.name}`
      )
    ) {
      removeOperations(data.id).finally(() => {
        refreshData();
      });
    }
  };

  if (editPanel) {
    return (
      <>
        <td colSpan={3}>
          <EditPanel
            operationID={data.id}
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
        <Button onClick={deleteIngredient}>Delete</Button>
      </td>
    </>
  );
}
