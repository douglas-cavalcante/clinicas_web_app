export function getSchedulesReportRequest(data) {
  return {
    type: '@schedule_report/GET_SCHEDULES_REPORT_REQUEST',
    payload: { data },
  };
}

export function getSchedulesReportSuccess(data) {
  return {
    type: '@schedule_report/GET_SCHEDULES_REPORT_SUCCESS',
    payload: {
      data,
    },
  };
}
