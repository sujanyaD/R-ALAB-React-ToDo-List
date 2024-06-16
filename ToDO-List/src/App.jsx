import { useState, useReducer } from 'react'
import './App.css'

// const initialState = [];
const initialState = [
  { id: 1, name: "Task 1", complete: false, editing: false },
  { id: 2, name: "Task 2", complete: true, editing: false }
];

const TODOS_ACTIONS = {
  ADD_TASK: 'add_task',
  DELETE_TASK: 'delete_task',
  UPDATE_TASK: 'update_task',
  RESET_TODOS: 'reset_task',
  TOGGLE_COMPLETE: 'toggle_completeness',
  START_EDIT: 'start_editing',
  SAVE_EDIT: 'save_edit',
  CANCEL_EDIT: 'cancel_edit',
}
function reducer(state, action) {
  //mapping event action of type ADD-TASK 
  //taking previous state for return array.adding new object inside array
  switch (action.type) {
    case TODOS_ACTIONS.ADD_TASK:
      return [...state, { id: state.length + 1, name: action.payload }]
    case TODOS_ACTIONS.DELETE_TASK:
      return state.filter(d => d.id !== action.payload)
    case TODOS_ACTIONS.RESET_TODOS:
      return init(action.payload)
    case TODOS_ACTIONS.TOGGLE_COMPLETE:
      return state.map(task =>
        task.id === action.payload ? { ...task, complete: !task.complete } : task
      );
    case TODOS_ACTIONS.START_EDIT:
      return state.map(task =>
        task.id === action.payload ? { ...task, editing: true } : task
      );
    case TODOS_ACTIONS.SAVE_EDIT:
      return state.map(task =>
        task.id === action.payload.id ? { ...task, name: action.payload.name, editing: false } : task
      );
    case TODOS_ACTIONS.CANCEL_EDIT:
      return state.map(task =>
        task.id === action.payload ? { ...task, editing: false } : task
      );
    case UPDATE_TASK: default: return state;
  }
}
function init(initialState) {

  return initialState;
}
const App = () => {
  const [todos, dispatch] = useReducer(reducer, initialState, init);
  const handleToggleComplete = (id) => {
    dispatch({ type: TODOS_ACTIONS.TOGGLE_COMPLETE, payload: id });
  };
  const handleStartEdit = (id) => {
    dispatch({ type: TODOS_ACTIONS.START_EDIT, payload: id });
  };

  const handleSaveEdit = (id, newName) => {
    dispatch({ type: TODOS_ACTIONS.SAVE_EDIT, payload: { id, name: newName } });
  };

  const handleCancelEdit = (id) => {
    dispatch({ type: TODOS_ACTIONS.CANCEL_EDIT, payload: id });
  };
  return (
    <>
      <h2> ToDo-List{todos.length} </h2>
      Add New Task:
      {/* //dispatched a addtask event using  OnBlur event handler of type :ADD-TASK,mapping ADD task to reducer
    using payload to hold user entered data ,*/}
      <input type="text" onBlur={(e) => dispatch({ type: TODOS_ACTIONS.ADD_TASK, payload: e.target.value })}
      />
      {/*here on click action form is dispatched on payload :initialstate. */}
      <button onClick={(evt) => dispatch({ type: TODOS_ACTIONS.ADD_TASK, payload: evt.target.value })}>ADD</button>
      <button onClick={() => dispatch({ type: TODOS_ACTIONS.RESET_TODOS, payload: initialState })}>RESET</button>
      <hr />
      {todos.map(todo => (
        <li key={todo.id}>
          {/* {todo.name} */}
          {todo.editing ? (
            <>
              <input type="text" value={todo.name} onChange={(e) => handleSaveEdit(todo.id, e.target.value)} />
              <button onClick={() => handleSaveEdit(todo.id, todo.name)}>Save</button>
              <button onClick={() => handleCancelEdit(todo.id)}>Cancel</button>
            </>
          ) : (
            <>
              <input
                type="checkbox"
                checked={todo.complete}
                onChange={() => handleToggleComplete(todo.id)}
              />
              {todo.name}
              <span>
                <button
                  onClick={() => handleStartEdit(todo.id)}
                  disabled={todo.complete}
                >
                  Edit
                </button>
                <button onCick={() => dispatch({ type: TODOS_ACTIONS.DELETE_TASK, payload: todo.id })} >DELETE</button>
              </span>
              </>
          )}
            </li>
      ))}
        </>
      );
};
      export default App