export function getPatientReportRequest(data) {
  return {
    type: '@patient_report/GET_PATIENTS_REPORT_REQUEST',
    payload: { data },
  };
}

export function getPatientReportSuccess(data) {
  return {
    type: '@patient_report/GET_PATIENTS_REPORT_SUCCESS',
    payload: {
      data,
    },
  };
}
