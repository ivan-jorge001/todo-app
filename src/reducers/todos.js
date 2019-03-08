import * as types from '../actions/types';
import { setActiveTodo, setInactiveTodo } from '../utils/todos';
import initialState from './initialState';

export default function sessionReducer(state = initialState.todos, action) {
  switch (action.type) {
    case types.ADD_TODO:
      return {
        ...state,
        globalTodos: [...state.globalTodos, action.todo]
      };

    case types.REMOVE_TODO:
      return {
        ...state,
        globalTodos: action.todo,
      };

    case types.ADD_TODO_WITH_DATE:
      return {
        ...state,
        todosWithDates: [...state.todosWithDates, action.todo]
      };

    case types.REMOVE_TODO_WITH_DATE:
      return {
        ...state,
        todosWithDates: action.todo,
      };

    case types.SET_ACTIVE_TODO: {
      const { id, noDate } = action.todo;

      if (!noDate) {
        return {
          ...state,
          todosWithDates: setActiveTodo(id, state.todosWithDates),
        }
      }

      return {
        ...state,
        globalTodos: setActiveTodo(id, state.globalTodos),
      };
    }

    case types.SET_INACTIVE_TODO: {
      const { id, noDate } = action.todo;

      if (!noDate) {
        return {
          ...state,
          todosWithDates: setInactiveTodo(id, state.todosWithDates),
        }
      }

      return {
        ...state,
        globalTodos: setInactiveTodo(id, state.globalTodos),
      };
    }

    default:
      return state;
  }
}