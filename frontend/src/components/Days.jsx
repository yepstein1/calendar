import {useState, useContext, useEffect,useReducer} from "react";
import { v4 as uuidv4 } from 'uuid';
import { taskContext } from "./context-tasks";


/**
 * 
 * @param {*} year passed in from App=> Month
 * @param {Date} date passed in from App=> Month
 * @param {function} handleUpdateTodo passed in from App=> Month to lift state up
 * 
 */

export default function Days({year,date,dayOfMonth,handleUpdateTodo}) {
    
    const tasks = useContext(taskContext)
   //const [savedTasksid,setSavedTasksid] = useState([])
    const [savedTasks,setSavedTasks] = useState([''])
   const [isDisabled,setIsDisabled] = useState([])
   const initialState = {
    isDisabled: [],
    savedTasks: []
  };

   function taskReducer(state,action)
{
    //console.log(`action ${JSON.stringify(action.payload)}`)
console.log(` testing disabled array : ${JSON.stringify(state.isDisabled[0])}`)
    switch (action.type)
    {
        case 'ADD_TASK' :
            {
                const {task} = action.payload;
             
                //console.log(`date of calendar ${dayOfMonth}`)
                let savedTaskDate = new Date(task.date)//.toDateString()
              /*  console.log(`savedTaskDate  : ${savedTaskDate}`)
                console.log(`savedTaskDate UTC  : ${savedTaskDate.getUTCDate()}`)
                console.log(`date of task ${savedTaskDate.getDate()}`) */
            

                if(savedTaskDate.getUTCDate()===dayOfMonth+1)
                {
                   // console.log('hi from if statement')
                    const newIsDisabled =[...state.isDisabled, {[task.taskid] :true}]
                

                const newSavedTask =(
                    <div key ={task.taskid} >
                    <input  id ={task.taskid} defaultValue={task.taskname} readOnly={newIsDisabled[state.savedTasks.length]?.[task.taskid]}></input>
                    <button  onClick ={() =>{handleEditButtonClicked(task.taskid)}}>Edit</button>    
                 
                    </div>
                );
                return {
                    ...state,
                    isDisabled: newIsDisabled,
                    savedTasks: [...state.savedTasks,newSavedTask]
                };


            }
            return state
            }

            case 'ENABLE_EDITING':
                {
                    const{id }= action.payload
                    const index = state.isDisabled.findIndex(x => Object.keys(x)== id)

                    console.log(`id from reducer ${id}`)
                    console.log(`index from reducer ${index}`)
                    console.log(`isdisabled ${JSON.stringify(state.isDisabled)}`)
                    let newState =state.isDisabled;
                    newState[index][id]=false
                    console.log(`isdisabled index id ${state.isDisabled[index][id]}`)
                    let element = document.getElementById(636)
 console.log(`element : ${element.disabled}`)
                    
                    return {
                        ...state,
                        isDisabled: newState,
                       
                    };
                }




            default:
                return state;
    }
}
const [state, dispatch] = useReducer(taskReducer, initialState);

     /**
     * State to store each days tasks
     */
 let [dailyTasks, setDailyTasks] = useState([])
 // maybe loop through tasks and if there is a task with a cetain date then add it to the input form
 
 // Initial state for isDisabled and savedTasks


 


 useEffect(()=>
 {



    if(tasks.length>0)
        {
            
            
               tasks.forEach((task) => {
                  dispatch({
                    type: 'ADD_TASK',
                    payload: {
                      task,
                      dayOfMonth
                    }
                  });
                });
              }
      
 },[])
    let [inputArray, setInputArray] = useState([<input type="text"
        onChange={onTodoInputted}
        key={uuidv4()}  ></input>])
       
    return <div className="day" >


<div className="button-parent">
 { new Date(date.getFullYear(),date.getMonth(),dayOfMonth+1).toLocaleString('default',{  weekday: 'long' } )} {date.toLocaleString('default', { month: 'long' })} {dayOfMonth+1}
    <br/>

  {state.savedTasks}
    {inputArray}
    
    <button className="button" onClick={addInputLIne}>
        
        Add new Line

    </button>
    
    <button className="button" onClick={()=>{handleUpdateTodo(year,date.getMonth(),dayOfMonth,dailyTasks)

    }}>
        Save to App state

    </button>
    

</div>

</div>
        
// adds new line to cell
    function addInputLIne() {
        let input = <input  onChange={onTodoInputted}

        key={uuidv4()}  type ="text"></input>
        setInputArray([...inputArray, input])
           
    }

   
// sets  individual days task
    function onTodoInputted(e) {
      
        setDailyTasks([...dailyTasks, e.target.value])
        
    }
  

    // make call to backend to get saved tasks
    function getSavedTasks()
    {

    }

function handleEditButtonClicked(id)
{
console.log(id)
    console.log(state)
dispatch({type: 'ENABLE_EDITING',
    payload: {
      id,
      
    }

})
}

}