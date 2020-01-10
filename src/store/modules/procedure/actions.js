export function getProceduresRequest(id) {
  return {
    type: '@procedures/GET_PROCEDURES_REQUEST',
    payload: {
      id,
    },
  };
}

export function getProceduresSuccess(data) {
  return {
    type: '@procedures/GET_PROCEDURES_SUCCESS',
    payload: {
      data,
    },
  };
}
export function saveProcedureRequest(data) {
  return {
    type: '@procedures/SAVE_PROCEDURE_REQUEST',
    payload: {
      data,
    },
  };
}

export function setProcedureToProfessionalRequest(data) {
  return {
    type: '@procedures/SAVE_PROCEDURE_TO_PROFESSIONAL_REQUEST',
    payload: {
      data,
    },
  };
}

export function proceduresFailure() {
  return {
    type: '@procedures/REQUEST_FAILURE',
    payload: {},
  };
}
