export function getFinancialReportRequest(data) {
  return {
    type: '@financial_report/GET_FINANCIAL_REPORT_REQUEST',
    payload: { data },
  };
}

export function getFinancialReportSuccess(data) {
  return {
    type: '@financial_report/GET_FINANCIAL_REPORT_SUCCESS',
    payload: {
      data,
    },
  };
}
