export function getProfessionalScheduleRequest(id) {
  return {
    type: '@professionalSchedule/GET_PROFESSIONAL_SCHEDULE_REQUEST',
    payload: { id },
  };
}

export function getProfessionalScheduleSuccess(data) {
  return {
    type: '@professionalSchedule/GET_PROFESSIONAL_SCHEDULE_SUCCESS',
    payload: {
      data,
    },
  };
}
export function saveProfessionalScheduleRequest(data) {
  return {
    type: '@professionalSchedule/SAVE_PROFESSIONAL_SCHEDULE_REQUEST',
    payload: {
      data,
    },
  };
}

export function professionalScheduleFailure() {
  return {
    type: '@professionalSchedule/REQUEST_FAILURE',
    payload: {},
  };
}
