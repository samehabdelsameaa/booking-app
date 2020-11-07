import { createReducer } from "utils/reduxsauce";
import produce from "immer";
import { DIRECTIONS } from "react-with-direction/dist/DirectionProvider";
import { DEFAULT_LOCALE, DEFAULT_DIRECTION, getLocaleDirection } from "../constants";
import { ActionTypes } from "./actions";

const initialState = {
  emailSent: false,
  paymentFailed: false,
  paymentErrors: undefined
};

const sendContactusEmail = (state, { payload }) => {
  return produce(state, draft => {});
};


export const reducer = createReducer(initialState, {
  [ActionTypes.SEND_CONTACTUS_EMAIL_SUCCESS]: sendContactusEmail,
});
