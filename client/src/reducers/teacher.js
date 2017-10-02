import {
  START_REQUEST,
  GET_ALL_TEACHERS,
  GET_ONE_TEACHER,
  CREATE_TEACHER,
  UPDATE_TEACHER,
  DELETE_TEACHER,
  FAILURE_REQUEST
} from "../actions/teacher";

const teacher = (state = {}, action) => {
  switch (action.type) {
    case START_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case GET_ALL_TEACHERS:
      return {
        ...state,
        isFetching: true
      };
    case GET_ONE_TEACHER:
      return {
        ...state,
        isFetching: true
      };
    case CREATE_TEACHER:
      return {
        ...state,
        isFetching: true
      };
    case UPDATE_TEACHER:
      return {
        ...state,
        isFetching: true
      };
    case DELETE_TEACHER:
      return {
        ...state,
        isFetching: true
      };
    case FAILURE_REQUEST:
      return {
        ...state,
        isFetching: false,
        error: action.data
      };
    default:
      return state;
  }
};
export default teacher;
