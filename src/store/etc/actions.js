import { createActions } from "utils/reduxsauce";

const { Types, Creators } = createActions(
  {
    sendContactusEmail: { args: ["emailDetails"], meta: { async: true } },
  },
  {
    prefix: "@app/etc/"
  }
);

export const ActionTypes = Types;
export default Creators;
