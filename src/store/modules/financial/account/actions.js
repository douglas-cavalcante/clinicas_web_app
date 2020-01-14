export function getAccountsRequest() {
  return {
    type: '@account/GET_ACCOUNTS_REQUEST',
    payload: {},
  };
}

export function getAccountsSuccess(data) {
  return {
    type: '@account/GET_ACCOUNTS_SUCCESS',
    payload: {
      data,
    },
  };
}
export function saveAccountRequest(data) {
  return {
    type: '@account/SAVE_ACCOUNT_REQUEST',
    payload: {
      data,
    },
  };
}

export function accountFailure() {
  return {
    type: '@account/REQUEST_FAILURE',
    payload: {},
  };
}
