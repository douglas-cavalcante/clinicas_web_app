export function getSchedulesRequest(data) {
  return {
    type: '@schedules/GET_SCHEDULE_REQUEST',
    payload: { data },
  };
}

export function getSchedulesSuccess(data) {
  return {
    type: '@schedules/GET_SCHEDULE_SUCCESS',
    payload: {
      data,
    },
  };
}

export function scheduleFailure() {
  return {
    type: '@schedules/REQUEST_FAILURE',
    payload: {},
  };
}
