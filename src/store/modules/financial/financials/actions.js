export function getFinancialsRequest() {
  return {
    type: '@financials/GET_FINANCIALS_REQUEST',
    payload: {},
  };
}

export function getFinancialsSuccess(data) {
  return {
    type: '@financials/GET_FINANCIALS_SUCCESS',
    payload: {
      data,
    },
  };
}
export function saveFinancialRequest(data) {
  return {
    type: '@financials/SAVE_FINANCIAL_REQUEST',
    payload: {
      data,
    },
  };
}

export function financialFailure() {
  return {
    type: '@financials/REQUEST_FAILURE',
    payload: {},
  };
}
