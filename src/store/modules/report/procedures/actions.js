export function getProcredureReportRequest(data) {
  return {
    type: '@procedure_report/GET_PROCEDURE_REPORT_REQUEST',
    payload: { data },
  };
}

export function getProcredureReportSuccess(data) {
  return {
    type: '@procedure_report/GET_PROCEDURE_REPORT_SUCCESS',
    payload: {
      data,
    },
  };
}
