export function getCompanyRequest() {
  return {
    type: '@company/GET_COMPANY_REQUEST',
    payload: {},
  };
}
export function getCompanySuccess(data) {
  return {
    type: '@company/GET_COMPANY_SUCCESS',
    payload: {
      data,
    },
  };
}

export function SaveCompanyRequest(data) {
  return {
    type: '@company/SAVE_COMPANY_REQUEST',
    payload: { data },
  };
}

export function SaveCompanySuccess() {
  return {
    type: '@company/SAVE_COMPANY_SUCCESS',
    payload: {},
  };
}

export function getCompanyFailure() {
  return {
    type: '@company/REQUEST_FAILURE',
    payload: {},
  };
}
