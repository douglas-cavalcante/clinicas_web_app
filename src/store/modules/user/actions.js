export function updateProfileRequest(data) {
  return {
    type: '@user/UPDATE_PROFILE_REQUEST',
    payload: { data },
  };
}

export function updateProfileSuccess(profile) {
  return {
    type: '@user/UPDATE_PROFILE_SUCCESS',
    payload: { profile },
  };
}

export function getUsersOptionsRequest() {
  return {
    type: '@user/GET_USERS_OPTIONS_REQUEST',
    payload: {},
  };
}

export function getUsersOptionsSuccess(data) {
  return {
    type: '@user/GET_USERS_OPTIONS_SUCCESS',
    payload: { data },
  };
}

export function updateProfileFailure() {
  return {
    type: '@user/UPDATE_PROFILE_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
