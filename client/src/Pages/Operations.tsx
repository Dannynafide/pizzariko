import OperationList from "../Components/OperationsList";
import { useApi } from "../hooks/useApi";
import { getAll } from "../services/operations/getAll";
import MainTemplate from "../templates/MainTemplate/MainTemplate";
import { Operation } from "../types/Operation";

function Operations() {
  const { data: operations, isLoading, isError } = useApi<Operation[]>(getAll);

  if (isError) {
    return (
      <MainTemplate
        title={"There has been a problem with your fetch operation"}
      />
    );
  }

  if (isLoading) {
    return <MainTemplate title={"Loading..."} />;
  }

  return (
    <MainTemplate title="These are operations">
      <OperationList operations={operations} />
    </MainTemplate>
  );
}

export default Operations;
