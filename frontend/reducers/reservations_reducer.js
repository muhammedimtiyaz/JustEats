import {
  RECEIVE_ALL_RESERVATIONS,
  RECEIVE_RESERVATION,
  REMOVE_RESERVATION,
} from '../actions/reservation_actions';
import merge from 'lodash/merge';

const ReservationsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_ALL_RESERVATIONS:
      return action.reservations;
    case RECEIVE_RESERVATION:
      action.reservation["restaurantId"] = action.reservation.restaurant_id
      newState[action.reservation.id] = action.reservation;
      return newState;
    case REMOVE_RESERVATION:
      delete newState[action.reservationId];
      return newState;
    default:
      return state;
  }
};

export default ReservationsReducer;
