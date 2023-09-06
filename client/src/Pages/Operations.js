import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import OperationList from "../Components/OperationsList";
import MainTemplate from "../templates/MainTemplate/MainTemplate.js";

function Operations() {
  const [operations, setOperations] = useState();
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOperations = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/operation");

        if (!response.ok) {
          const message = `An error has occurred: ${response.statusText}`;
          setMessage(message);
          return;
        }

        const records = await response.json();
        if (!records) {
          setMessage(`Records not found`);
          return;
        }

        setOperations(records);
      } catch (error) {
        setMessage("There has been a problem with your fetch operation");
      }
    };
    fetchOperations();

    return;
  }, [navigate]);

  if (!operations) {
    return <MainTemplate title={message} />;
  }

  return (
    <MainTemplate title="These are operations">
      <OperationList operations={operations} />
    </MainTemplate>
  );
}

export default Operations;
