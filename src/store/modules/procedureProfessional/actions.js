export function getProceduresProfessionalsRequest(id) {
  return {
    type: '@procedures/GET_PROCEDURES_PROFESSIONALS_REQUEST',
    payload: {
      id,
    },
  };
}

export function getProceduresProfessionalsSuccess(data) {
  return {
    type: '@procedures/GET_PROCEDURES_PROFESSIONALS_SUCCESS',
    payload: {
      data,
    },
  };
}
