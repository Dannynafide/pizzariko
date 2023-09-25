import { useState } from "react";

import Button from "../../../Components/buttons/Button";
import { useApiAdmin } from "../../../hooks/useApiAdmin";
import { getAll as getAllOperations } from "../../../services/operations/getAll";
import { Operation } from "../../../types/Operation";
import AddNew from "./AddNew";
import Row from "./Row";

export default function Operations() {
  const [allOperations, isLoading, isError, refreshData, updateData] =
    useApiAdmin<Operation[]>(getAllOperations);
  const [showPanel, setShowPanel] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div className="min-w-full text-left text-sm font-light">
      {!showPanel && (
        <Button
          onClick={() => {
            setShowPanel(true);
          }}
        >
          Create a new pizza
        </Button>
      )}
      {showPanel && (
        <AddNew
          closePanel={() => setShowPanel(false)}
          refreshData={refreshData}
        />
      )}

      <table>
        <thead className="font-semibold">
          <tr>
            <th className="px-4 py-4">#</th>
            <th className="py-4">ID</th>
            <th className="py-4">Name</th>
            <th className="py-4">Function</th>
          </tr>
        </thead>
        <tbody>
          {allOperations &&
            allOperations.map((operation, index) => (
              <tr
                key={operation.id}
                className="transition duration-300 ease-in-out hover:bg-neutral-200"
              >
                <td className="font-semibold px-4 py-4">{index}</td>
                <Row
                  data={operation}
                  refreshData={refreshData}
                  updateData={updateData}
                />
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
