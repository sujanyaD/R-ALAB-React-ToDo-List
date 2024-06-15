import { useState, useReducer } from 'react'
import './App.css'

const initialState=[];

function reducer(state,action){
  //mapping event action of type ADD-TASK 
  switch(action.type){

    case 'ADD-TASK':return[
      //taking previous state for return array.adding new object inside array
      ...state,{
        //total length +1
      id:state.length +1,
      name:action.payload
      }
    ]

    case 'DELETE-TASK':

    // case 'EDIT-TASK':

    case 'UPDATE-TASK':

    default:return state;
  }

}


const App=()=>{
      const[todos,dispatch]=useReducer(reducer,initialState);
    return(
    <>
    <h2> ToDo-List{todos.length} </h2>
    Add New Task:
    {/* //dispatched a addtask event using  OnBlur event handler of type :ADD-TASK,mapping ADD task to reducer
    usig payload to hold user entered data ,*/}
    <input type="text" onBlur={(e)=>dispatch({type:'ADD-TASK',payload:e.target.value})}/>


    <hr/>
    {todos.map(todo=><li key={todo.id}>{todo.name}</li>)}
    </>
    )
   
}
export default App