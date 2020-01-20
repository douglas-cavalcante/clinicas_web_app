import produce from 'immer';

const INITIAL_STATE = {
  data: [],
  loading: false,
  options: [],
};

export default function scheduleReport(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@schedule_report/GET_SCHEDULES_REPORT_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@schedule_report/GET_SCHEDULES_REPORT_SUCCESS': {
        draft.data = action.payload.data;
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
