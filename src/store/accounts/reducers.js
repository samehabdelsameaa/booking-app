import { createReducer } from "reduxsauce";
import { produce } from "immer";
import isEmpty from "ramda/es/isEmpty";
import jwtDecoder from "jwt-decode";
import { push } from "connected-react-router";
import { store } from "store";

import { ActionTypes } from "./actions";

const initialState = {
  emailVerifing: true,
  profile: null,
  emailVerified: false,
  signupErrors: [],
  signupFailed: undefined,
  forgotPasswordErrors: [],
  forgotPasswordFailed: false
};

const signupFinished = (state, action) => {
  store.dispatch(push("/account/checkYourEmail"));
  return state;
};

const signupFailed = (state, { payload }) => {
  return produce(state, draft => {
    draft.signupErrors = payload;
    draft.signupFailed = true;
  });
};

const verifyEmail = state => {
  return produce(state, draft => {
    draft.emailVerified = true;
    draft.error = false;
    draft.errors = undefined;
    draft.emailVerifing = false;
  });
};

const verifyEmailFailed = (state, { payload }) => {
  return produce(state, draft => {
    draft.errors = payload;
    draft.error = true;
    draft.emailVerifing = false;
  });
};

const forgotPassword = state => {
  return produce(state, draft => {
    draft.forgotPasswordErrors = [];
    draft.forgotPasswordFailed = false;
  });
};

const forgotPasswordFailed = (state, { payload }) => {
  return produce(state, draft => {
    draft.forgotPasswordErrors = payload;
    draft.forgotPasswordFailed = true;
  });
};

const resetPassword = state => {
  return produce(state, draft => {
    draft.error = false;
    draft.errors = undefined;
  });
};

const resetPasswordFailed = (state, { payload }) => {
  return produce(state, draft => {
    draft.errors = payload;
    draft.error = true;
  });
};


const resetSignupErrors = (state, action) => {
  return produce(state, draft => {
    draft.signupErrors = [];
    draft.signupFailed = false;
  });
};

const resetForgotPasswordErrors = (state, action) => {
  return produce(state, draft => {
    draft.forgotPasswordErrors = [];
    draft.forgotPasswordFailed = false;
  });
};

const fetchUserProfile = (state, action) => {
  return produce(state, draft => {
  });
}
const fetchUserProfileSuccess = (state, action) => {
  return produce(state, draft => {
    draft.profile = action.payload;
  });
}
const fetchUserProfileFailed = (state, action) => {
  return produce(state, draft => {
  });
}

const changePassword = state => {
  return produce(state, draft => {
    draft.error = false;
    draft.errors = undefined;
  });
};

const changePasswordFailed = (state, { payload }) => {
  return produce(state, draft => {
    draft.errors = payload;
    draft.error = true;
  });
};

const updateUserProfile = (state, action) => {
  return produce(state, draft => {
  });
}

const updateUserProfileSuccess = (state, action) => {
  return produce(state, draft => {
    draft.profile = action.payload;
  });
};

const updateUserProfileFailed = (state, { payload }) => {
  return produce(state, draft => {
  });
};

export const reducer = createReducer(initialState, {
  [ActionTypes.SIGNUP_SUCCESS]: signupFinished,
  [ActionTypes.SIGNUP_FAIL]: signupFailed,
  [ActionTypes.RESET_SIGNUP_ERRORS]: resetSignupErrors,
  [ActionTypes.VERIFY_EMAIL_SUCCESS]: verifyEmail,
  [ActionTypes.VERIFY_EMAIL_FAIL]: verifyEmailFailed,
  [ActionTypes.FORGOT_PASSWORD_SUCCESS]: forgotPassword,
  [ActionTypes.FORGOT_PASSWORD_FAIL]: forgotPasswordFailed,
  [ActionTypes.RESET_FORGOT_PASSWORD_ERRORS]: resetForgotPasswordErrors,
  [ActionTypes.RESET_PASSWORD_SUCCESS]: resetPassword,
  [ActionTypes.RESET_PASSWORD_FAIL]: resetPasswordFailed,

  [ActionTypes.FETCH_USER_PROFILE]: fetchUserProfile,
  [ActionTypes.FETCH_USER_PROFILE_SUCCESS]: fetchUserProfileSuccess,
  [ActionTypes.FETCH_USER_PROFILE_FAIL]: fetchUserProfileFailed,

  [ActionTypes.CHANGE_PASSWORD_SUCCESS]: changePassword,
  [ActionTypes.CHANGE_PASSWORD_FAIL]: changePasswordFailed,

  [ActionTypes.UPDATE_USER_PROFILE]: updateUserProfile,
  [ActionTypes.UPDATE_USER_PROFILE_SUCCESS]: updateUserProfileSuccess,
  [ActionTypes.UPDATE_USER_PROFILE_FAIL]: updateUserProfileFailed
});
