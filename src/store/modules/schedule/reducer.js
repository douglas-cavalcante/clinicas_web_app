import produce from 'immer';

const INITIAL_STATE = {
  data: [],
  loading: false,
  options: [],
};

export default function schedule(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@schedules/GET_SCHEDULE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@schedules/GET_SCHEDULE_SUCCESS': {
        draft.data = action.payload.data;
        draft.loading = false;
        break;
      }

      case '@schedules/GET_MY_SCHEDULE_SUCCESS': {
        draft.data = action.payload.data;
        draft.loading = false;
        break;
      }

      case '@schedules/REQUEST_FAILURE': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
