export function getPatientsRequest() {
  return {
    type: '@patient/GET_PATIENTS_REQUEST',
    payload: {},
  };
}

export function getPatientsSuccess(data) {
  return {
    type: '@patient/GET_PATIENTS_SUCCESS',
    payload: {
      data,
    },
  };
}
export function savePatientRequest(data) {
  return {
    type: '@patient/SAVE_PATIENT_REQUEST',
    payload: {
      data,
    },
  };
}

export function savePrePatientRequest(data) {
  return {
    type: '@patient/SAVE_PRE_PATIENT_REQUEST',
    payload: {
      data,
    },
  };
}

export function changeModeRequest() {
  return {
    type: '@patient/CHANGE_MODE',
    payload: {},
  };
}

export function getPatientsOptionsRequest() {
  return {
    type: '@patient/GET_PATIENTS_OPTIONS_REQUEST',
    payload: {},
  };
}

export function getPatientsOptionsSuccess(data) {
  return {
    type: '@patient/GET_PATIENTS_OPTIONS_SUCCESS',
    payload: {
      data,
    },
  };
}

export function patientFailure() {
  return {
    type: '@patient/REQUEST_FAILURE',
    payload: {},
  };
}
