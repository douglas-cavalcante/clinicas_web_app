export function getOpeningHoursRequest() {
  return {
    type: '@openingHours/GET_OPENING_HOURS_REQUEST',
    payload: {},
  };
}

export function getOpeningHoursSuccess(data) {
  return {
    type: '@openingHours/GET_OPENING_HOURS_SUCCESS',
    payload: {
      data,
    },
  };
}

export function saveOpeningHoursRequest(data) {
  return {
    type: '@openingHours/SAVE_OPENING_HOURS_REQUEST',
    payload: {
      data: data.schedules,
    },
  };
}

export function saveOpeningHoursSuccess() {
  return {
    type: '@openingHours/SAVE_OPENING_HOURS_SUCCESS',
    payload: {},
  };
}

export function OpeningHoursFailure() {
  return {
    type: '@openingHours/REQUEST_FAILURE',
    payload: {},
  };
}
