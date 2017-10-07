import {
  GET_ALL_TASKS,
  GET_ONE_TASK,
  ADD_TASK,
  UPDATE_TASK,
  REMOVE_TASK
} from "../actions/task";

export const taskInitState = [];

const tasks = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_TASKS:
      return [...action.data];
    case ADD_TASK:
      return [...state, action.data];
    case UPDATE_TASK:
      return [...state].map(
        task => (action.data.id === task.id ? action.data.task : task)
      );
    case REMOVE_TASK:
      return state.filter(task => task._id !== action.data);
    default:
      return state;
  }
};
export default tasks;