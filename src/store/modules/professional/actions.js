export function getProfessionalsRequest() {
  return {
    type: '@professionals/GET_PROFESSIONALS_REQUEST',
    payload: {},
  };
}

export function getProfessionalsSuccess(data) {
  return {
    type: '@professionals/GET_PROFESSIONALS_SUCCESS',
    payload: {
      data,
    },
  };
}
export function saveProfessionalRequest(data) {
  return {
    type: '@professionals/SAVE_PROFESSIONAL_REQUEST',
    payload: {
      data,
    },
  };
}

export function saveUserRequest(data) {
  return {
    type: '@professionals/SAVE_USER_REQUEST',
    payload: {
      data,
    },
  };
}

export function getProfessionalsOptionsRequest() {
  return {
    type: '@professionals/GET_PROFESSIONALS_OPTIONS_REQUEST',
    payload: {},
  };
}

export function getProfessionalsOptionsSuccess(data) {
  return {
    type: '@professionals/GET_PROFESSIONALS_OPTIONS_SUCCESS',
    payload: {
      data,
    },
  };
}

export function professionalsFailure() {
  return {
    type: '@professionals/REQUEST_FAILURE',
    payload: {},
  };
}
