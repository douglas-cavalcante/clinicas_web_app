export function getIndicationsRequest() {
  return {
    type: '@indications/GET_INDICATIONS_REQUEST',
    payload: {},
  };
}

export function getIndicationsSuccess(data) {
  return {
    type: '@indications/GET_INDICATIONS_SUCCESS',
    payload: {
      data,
    },
  };
}
export function saveIndicationRequest(data) {
  return {
    type: '@indications/SAVE_INDICATION_REQUEST',
    payload: {
      data,
    },
  };
}

export function indicationFailure() {
  return {
    type: '@indications/REQUEST_FAILURE',
    payload: {},
  };
}
