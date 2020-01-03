import produce from 'immer';

const INITIAL_STATE = {
  data: [],
  loading: false,
};

export default function room(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@rooms/GET_ROOMS_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@rooms/GET_ROOMS_SUCCESS': {
        draft.data = action.payload.data;
        draft.loading = false;
        break;
      }
      case '@rooms/SAVE_ROOM_REQUEST': {
        draft.loading = false;
        break;
      }
      case '@rooms/REQUEST_FAILURE': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
