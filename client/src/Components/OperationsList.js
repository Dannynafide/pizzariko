import { useNavigate } from "react-router-dom";

import Button from "./buttons/Button";

export default function OperationsList({ operations }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-wrap">
        {operations.map((operation) => (
          <div key={operation.id} className="m-2">
            <Button
              className="bg-yellow-200"
              onClick={() => navigate(`/operation/${operation.id}`)}
            >
              {operation.name}
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
