import * as types from './types';
import { removeTodoFromList, generateId } from '../utils/todos';

export default {
  addTodo: (todo) => {
    todo.id = generateId();
    todo.active = false;

    if (todo.noDate) {
      const { date, ...todoWithNoDate } = todo;
      return {
        type: types.ADD_TODO,
        todo: todoWithNoDate,
      };
    }

    return {
      type: types.ADD_TODO_WITH_DATE,
      todo,
    };
  },
  removeTodo: (todo) => {
    return (dispatch, getState) => {

      if (todo.noDate) {
        const { globalTodos } = getState().todos;

        return dispatch({
          type: types.REMOVE_TODO,
          todo: removeTodoFromList(todo.id, globalTodos),
        });
      }

      const { todosWithDates } = getState().todos;

      return dispatch({
        type: types.REMOVE_TODO,
        todo: removeTodoFromList(todo.id, todosWithDates),
      });
    }
  },
  setInactiveTodo: (id, noDate) => ({
    type: types.SET_INACTIVE_TODO,
    todo: {
      id,
      noDate,
    },
  }),
  setActiveTodo: (id, noDate) => ({
    type: types.SET_ACTIVE_TODO,
    todo: {
      id,
      noDate,
    },
  }),
}
