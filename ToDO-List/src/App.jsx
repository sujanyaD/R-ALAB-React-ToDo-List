import { useState, useReducer } from 'react'
import './App.css'

const initialState = [];

const TODOS_ACTIONS = {
  ADD_TASK: 'add_task',
  DELETE_TASK: 'delete_task',
  UPDATE_TASK: 'update_task',
  RESET_TODOS: 'reset_task',
}

function reducer(state, action) {
  //mapping event action of type ADD-TASK 
  switch (action.type) {

    case TODOS_ACTIONS.ADD_TASK: return [
      //taking previous state for return array.adding new object inside array
      ...state, {
        //total length +1
        id: state.length + 1,
        name: action.payload
      }
    ]

    case TODOS_ACTIONS.DELETE_TASK: return state.filter(d => d.id !== action.payload)
    case TODOS_ACTIONS.RESET_TODOS: return init(action.payload)

    // case 'EDIT_TASK':

    case UPDATE_TASK:

    default: return state;
  }

}

function init(initialState) {

  // const result=[...initialState,{id:'1',name:'reading'}]
  // return result;

  return initialState;

}
const App = () => {

  const [todos, dispatch] = useReducer(reducer, initialState, init);
  return (
    <>
      <h2> ToDo-List{todos.length} </h2>
      Add New Task:
      {/* //dispatched a addtask event using  OnBlur event handler of type :ADD-TASK,mapping ADD task to reducer
    using payload to hold user entered data ,*/}
      <input type="text" onBlur={(e) => dispatch({ type: TODOS_ACTIONS.ADD_TASK, payload: e.target.value })}
      />

      <button onClick={() => dispatch({ type: TODOS_ACTIONS.RESET_TODOS, payload: initialState })}>RESET</button>
        <hr />
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.name}
          <span>
            <button Delete onCick={() => dispatch({ type: TODOS_ACTIONS.DELETE_TASK, payload: todo.id })} >DELETE</button>
          </span>
        </li>
        ))}
      </>
      ) 
   }
      export default App