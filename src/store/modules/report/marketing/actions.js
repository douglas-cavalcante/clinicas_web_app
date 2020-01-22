export function getMarketingReportRequest(data) {
  return {
    type: '@marketing_report/GET_MARKETING_REPORT_REQUEST',
    payload: { data },
  };
}

export function getMarketingReportSuccess(data) {
  return {
    type: '@marketing_report/GET_MARKETING_REPORT_SUCCESS',
    payload: {
      data,
    },
  };
}
