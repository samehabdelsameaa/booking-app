import { createLogic } from "redux-logic";
import { ActionTypes } from "./actions";

export const contactUsLogic = createLogic({
  type: ActionTypes.SEND_CONTACTUS_EMAIL,
  latest: true,

  async process({ getState, action, api }, dispatch, done) {
    var res = await api.etc.contactUsEmail(action.emailDetails);
    dispatch({ type: ActionTypes.SEND_CONTACTUS_EMAIL_SUCCESS, payload: res.data });
    done();
  }
});

export default [contactUsLogic];
