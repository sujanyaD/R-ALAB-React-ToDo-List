import {useState, useReducer } from 'react'
import './App.css'

const initialState = [
  { id: 1, Task: "Reading", complete: false, editing: true },
  { id: 2, Task: "Writing", complete: true, editing: false },
  { id: 3, Task: "Cleaning House", complete: true, editing: false },
  { id: 4, Task: "Moving lawn", complete: true, editing: false },

];
const TODOS_ACTIONS = {

  ADD_TODO: 'add_task',
  DELETE_TASK: 'delete_task',
  RESET_TODOS: 'reset_task',
  TOGGLE_COMPLETE: 'toggle_completeness',
 EDIT_TODO: 'start_editing',
   SAVE_EDIT: 'save_edit',
  // CANCEL_EDIT: 'cancel_edit',
}

//using useReducer Hook
function reducer(state, action) {
     switch (action.type) {
    case TODOS_ACTIONS.DELETE_TASK:
      return state.filter(d => d.id !== action.payload)
    case TODOS_ACTIONS.RESET_TODOS:
      return init(action.payload)
    case TODOS_ACTIONS.TOGGLE_COMPLETE:
      return state.map(task =>
        task.id === action.payload ? { ...task, complete: !task.complete } : task
      );
    case TODOS_ACTIONS.EDIT_TODO:
      return state.map(task =>
        task.id === action.payload ? { ...task, editing: true } : task
      );
    case TODOS_ACTIONS.SAVE_EDIT:
      return state.map(task =>
        task.id === action.payload.id ? { ...task, Task: action.payload.Task, editing: true } : task
      );
    case TODOS_ACTIONS.CANCEL_EDIT:
      return state.map(task =>
        task.id === action.payload ? { ...task, editing: false} : task
      );
    case UPDATE_TASK: default: return state;
  }
}
function init(initialState) {

  return initialState;
}
const ToDoApp = () => {
  //useReducer Hook
  const [todos, dispatch] = useReducer(reducer, initialState, init);
  //useState Hook
   const [newTodo, setNewTodo] = useState('');
   const handleAdd = () => {
    if (newTodo.trim() !== '') {
      dispatch({ type: TODOS_ACTIONS.ADD_TODO, payload: newTodo });
      setNewTodo('');
    }
  };
  const handleToggleComplete = (id) => {
    dispatch({ type: TODOS_ACTIONS.TOGGLE_COMPLETE, payload: id });
  };
  const handleStartEdit = (id) => {
    dispatch({ type: TODOS_ACTIONS.EDIT_TODO, payload: id });
  };

  const handleSaveEdit = (id, newTask) => {
    dispatch({ type: TODOS_ACTIONS.SAVE_EDIT, payload: { id, Task: newTask } });
    
  };

  
  return (
    <>
      <h2> ToDo-List{todos.length} </h2>
      <div className="todo-form">
      <input type="text" placeholder="Enter new todo" value={newTodo.Task} onChange={(e) => setNewTodo(e.target.value)}   />
   
      <button onClick={handleAdd}>Add</button>
    </div> 
      {/* <input type="text" onBlur={(e) => dispatch({ type: TODOS_ACTIONS.ADD_TASK, payload: e.target.value })}   />*/}
    
      {/*here on click action form is dispatched on payload :initialstate. */}
      <button style={{ backgroundColor: 'lightgrey' }} onClick={(event) => dispatch({ type: TODOS_ACTIONS.RESET_TODOS, payload: event.target.value })}>RESET</button>
      <hr />
      {/* using map method to iterate over each todo object in todos array */}
      {todos.map(todo => (
        // using Key prop to identify items that have changed or removed,using {todo.id} as uniue identifier
        <li key={todo.id}>
          {/* using ternary operator to check condition */}
          {todo.editing ? (
            <>
              <input type="text" value={todo.Task} onChange={(e) => handleSaveEdit(todo.id, e.target.va)} />
              <button style={{ backgroundColor: 'lightgrey' }} onClick={() => handleSaveEdit(todo.id, todo.Task)}>Save</button>
              {/* <button style={{ backgroundColor: 'lightgrey' }}onClick={() => handleCancelEdit(todo.id)}>Cancel</button> */}
            </>
          ) : (
            <>
              <input
                type="checkbox"
                checked={todo.complete}
                onChange={() => handleToggleComplete(todo.id)}
              />
              {todo.Task}
              <span>
                <button
                  onClick={() => handleStartEdit(todo.id)}
                  disabled={todo.complete}
                >
                  Edit
                </button>
                <button style={{ backgroundColor: 'lightgrey' }} onClick={() => dispatch({ type: TODOS_ACTIONS.DELETE_TASK, payload: todo.id })} >DELETE</button>
              </span>
            </>
          )}
        </li>
      ))}
    </>
  );
};
export default ToDoApp