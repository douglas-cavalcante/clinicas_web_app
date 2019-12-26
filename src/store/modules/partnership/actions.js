export function getPartnesershipsRequest() {
  return {
    type: '@partnesership/GET_PARTNESERSHIPS_REQUEST',
    payload: {},
  };
}

export function getPartnesershipsSuccess(data) {
  return {
    type: '@partnesership/GET_PARTNERSHIPS_SUCCESS',
    payload: {
      data,
    },
  };
}

export function savePartnesershipRequest(data) {
  return {
    type: '@partnesership/SAVE_COMPANY_REQUEST',
    payload: { data },
  };
}

export function savePartnesershipSuccess() {
  return {
    type: '@comppartnesershipany/SAVE_COMPANY_SUCCESS',
    payload: {},
  };
}

export function partnesershipFailure() {
  return {
    type: '@partnesership/REQUEST_FAILURE',
    payload: {},
  };
}
