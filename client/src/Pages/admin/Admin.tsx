import MainTemplate from "../../templates/MainTemplate/MainTemplate";
import Ingredients from "./Ingredients/index";
import Operations from "./Operations";

const Admin = () => {
  return (
    <MainTemplate title="Ingredients">
      <>
        <Operations />
        <Ingredients />
      </>
    </MainTemplate>
  );
};

export default Admin;
