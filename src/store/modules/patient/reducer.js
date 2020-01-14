import produce from 'immer';

const INITIAL_STATE = {
  data: [],
  loading: false,
  options: [],
};

export default function patient(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@patient/GET_PATIENTS_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@patient/GET_PATIENTS_SUCCESS': {
        draft.data = action.payload.data;
        draft.loading = false;
        break;
      }
      case '@patient/SAVE_PATIENT_REQUEST': {
        draft.loading = false;
        break;
      }
      case '@patient/GET_PATIENTS_OPTIONS_SUCCESS': {
        draft.options = action.payload.data;
        break;
      }
      case '@patient/REQUEST_FAILURE': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
