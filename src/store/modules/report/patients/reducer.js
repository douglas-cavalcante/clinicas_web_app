import produce from 'immer';

const INITIAL_STATE = {
  data: [],
  loading: false,
};

export default function PatientReport(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@patient_report/GET_PATIENTS_REPORT_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@patient_report/GET_PATIENTS_REPORT_SUCCESS': {
        draft.data = action.payload.data;
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
