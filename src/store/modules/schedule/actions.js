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

export function getMySchedulesRequest(data) {
  return {
    type: '@schedules/GET_MY_SCHEDULE_REQUEST',
    payload: { data },
  };
}

export function getMySchedulesSuccess(data) {
  return {
    type: '@schedules/GET_MY_SCHEDULE_SUCCESS',
    payload: {
      data,
    },
  };
}

export function saveScheduleRequest(data) {
  return {
    type: '@schedules/SAVE_SCHEDULE_REQUEST',
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
