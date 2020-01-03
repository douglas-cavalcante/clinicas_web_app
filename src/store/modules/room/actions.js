export function getRoomsRequest() {
  return {
    type: '@rooms/GET_ROOMS_REQUEST',
    payload: {},
  };
}

export function getRoomsSuccess(data) {
  return {
    type: '@rooms/GET_ROOMS_SUCCESS',
    payload: {
      data,
    },
  };
}
export function saveRoomRequest(data) {
  return {
    type: '@rooms/SAVE_ROOM_REQUEST',
    payload: {
      data,
    },
  };
}

export function roomsFailure() {
  return {
    type: '@rooms/REQUEST_FAILURE',
    payload: {},
  };
}
