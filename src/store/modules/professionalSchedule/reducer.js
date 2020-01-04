import produce from 'immer';

const INITIAL_STATE = {
  data: [],
  loading: false,
};

export default function professionalSchedule(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@professionalSchedule/GET_PROFESSIONAL_SCHEDULE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@professionalSchedule/GET_PROFESSIONAL_SCHEDULE_SUCCESS': {
        draft.data = action.payload.data;
        draft.loading = false;
        break;
      }
      case '@professionalSchedule/SAVE_PROFESSIONAL_SCHEDULE_REQUEST': {
        draft.loading = false;
        break;
      }
      case '@professionalSchedule/REQUEST_FAILURE': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
