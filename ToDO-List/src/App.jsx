import { useState, useReducer } from 'react'
import './App.css'

const initialState = [
  {
    "userId": 1,
    "id": 1,
    "Task": "delectus aut autem",
    "complete": false
  },
  {
    "userId": 1,
    "id": 2,
    "Task": "quis ut nam facilis et officia qui",
    "complete": false
  },
  {
    "userId": 1,
    "id": 3,
    "Task": "fugiat veniam minus",
    "complete": false
  },
  {
    "userId": 1,
    "id": 4,
    "Task": "et porro tempora",
    "complete": true
  },
  {
    "userId": 1,
    "id": 5,
    "Task": "laboriosam mollitia et enim quasi adipisci quia provident illum",
    "complete": false
  },
  {
    "userId": 1,
    "id": 6,
    "Task": "qui ullam ratione quibusdam voluptatem quia omnis",
    "complete": false
  },
  {
    "userId": 1,
    "id": 7,
    "Task": "illo expedita consequatur quia in",
    "complete": false
  },
  {
    "userId": 1,
    "id": 8,
    "Task": "quo adipisci enim quam ut ab",
    "complete": true
  },
  {
    "userId": 1,
    "id": 9,
    "Task": "molestiae perspiciatis ipsa",
    "complete": false
  },
  {
    "userId": 1,
    "id": 10,
    "Task": "illo est ratione doloremque quia maiores aut",
    "complete": true
  },
  {
    "userId": 1,
    "id": 11,
    "Task": "vero rerum temporibus dolor",
    "complete": true
  },
  {
    "userId": 1,
    "id": 12,
    "Task": "ipsa repellendus fugit nisi",
    "complete": true
  },
  {
    "userId": 1,
    "id": 13,
    "Task": "et doloremque nulla",
    "complete": false
  },
  {
    "userId": 1,
    "id": 14,
    "Task": "repellendus sunt dolores architecto voluptatum",
    "complete": true
  },
  {
    "userId": 1,
    "id": 15,
    "Task": "ab voluptatum amet voluptas",
    "complete": true
  },
  {
    "userId": 1,
    "id": 16,
    "Task": "accusamus eos facilis sint et aut voluptatem",
    "complete": true
  },
  {
    "userId": 1,
    "id": 17,
    "Task": "quo laboriosam deleniti aut qui",
    "complete": true
  },
  {
    "userId": 1,
    "id": 18,
    "Task": "dolorum est consequatur ea mollitia in culpa",
    "complete": false
  },
  {
    "userId": 1,
    "id": 19,
    "Task": "molestiae ipsa aut voluptatibus pariatur dolor nihil",
    "complete": true
  },
  {
    "userId": 1,
    "id": 20,
    "Task": "ullam nobis libero sapiente ad optio sint",
    "complete": true
  }
];

const TODOS_ACTIONS = {
  ADD_TODO: 'add_task',
  DELETE_TASK: 'delete_task',
  RESET_TODOS: 'reset_task',
  TOGGLE_COMPLETE: 'toggle_completeness',
  EDIT_TODO: 'start_editing',
  SAVE_EDIT: 'save_edit',
  CANCEL_EDIT: 'cancel_edit',
}

//using useReducer Hook
function reducer(state, action) {
  switch (action.type) {
    case TODOS_ACTIONS.ADD_TODO:
      return [...state,{id:Date.now(),Task:action.payload,complete:false,editing:false}]
    case TODOS_ACTIONS.DELETE_TASK:
      return state.filter(d => d.id !== action.payload)
    case TODOS_ACTIONS.RESET_TODOS:
      return init(action.payload)
    case TODOS_ACTIONS.TOGGLE_COMPLETE:
      return state.map(Task =>
        Task.id === action.payload ? { ...Task, complete: !Task.complete } : Task
      );
    case TODOS_ACTIONS.EDIT_TODO:
      return state.map(Task =>
        Task.id === action.payload ? { ...Task, editing: true } : Task
      );
    case TODOS_ACTIONS.SAVE_EDIT:
      return state.map(Task =>
        Task.id === action.payload.id ? { ...Task, Task: action.payload.Task, editing: true } : Task
      );
    case TODOS_ACTIONS.CANCEL_EDIT:
      return state.map(Task =>
        Task.id === action.payload ? { ...Task, editing: false } : Task
      );
    default: return state;
  }
}
function init(initialState) {

  return initialState;
}
const App = () => {
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
  const handleCancelEdit=(id,newTask)=>{
dispatch({type:TODOS_ACTIONS.CANCEL_EDIT,payload:{id,Task}})
  };
  return (
    <>
      <h2> ToDo-List{todos.length} </h2>
      <div className="todo-form">
        <input type="text" placeholder="Enter new todo" value={newTodo.Task} onChange={(e) => setNewTodo(e.target.value)} />
        <button onClick={handleAdd}>Add</button>
      </div>
      {/* <input type="text" onBlur={(e) => dispatch({ type: TODOS_ACTIONS.ADD_TASK, payload: e.target.value })}   /> */}

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
              <input type="text" value={todo.Task} onChange={(e) => handleSaveEdit(todo.id, e.target.value)} />
              <button style={{ backgroundColor: 'lightgrey' }}onClick={() => handleSaveEdit(todo.id, todo.Task)}>Save</button>
              <button style={{ backgroundColor: 'lightgrey' }}onClick={() => handleCancelEdit(todo.id)}>Cancel</button>
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
export default App