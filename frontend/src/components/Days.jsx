import {useState,useEffect, useRef, useContext} from "react";
import { v4 as uuidv4 } from 'uuid';
import { taskContext } from "./context-tasks";




/**
 * 
 * @param {*} year passed in from App=> Month
 * @param {Date} date passed in from App=> Month
 * @param {function} handleUpdateTodo passed in from App=> Month to lift state u[p
 */
export default function Days({year,date,dayOfMonth,handleUpdateTodo,todoList}) {
    let tasks = useContext(taskContext)
let renderTimes = useRef(0)
    useEffect(()=> {
        renderTimes.current++
       // setRenderTimes(temp)
       // console.log("hi from day render : " +renderTimes.current)
    }
)
    /**
     * State to store each days tasks
     */

//console.log(`in day comp use context ${JSON.stringify(useContext(taskContext))}`)
console.log(`get default value : ${getDefaultValue(new Date(date.getFullYear(),date.getMonth(),dayOfMonth+1))}`)

    let [dailyTasks, setDailyTasks] = useState([])
    

       // array of inputs for each day
    let [inputArray, setInputArray] = useState([<input type="text"
        onChange={onTodoInputted}
        key={uuidv4()} defaultValue={getDefaultValue(new Date(date.getFullYear(),date.getMonth(),dayOfMonth+1))} ></input>])

    

    return <div className="day" key ={todoList[todoList.length-1]}>


<div className="button-parent">
 { new Date(date.getFullYear(),date.getMonth(),dayOfMonth+1).toLocaleString('default',{  weekday: 'long' } )} {date.toLocaleString('default', { month: 'long' })} {dayOfMonth+1}
    <br/>
    {inputArray}
  
    
    <button className="button" onClick={addInputLIne}>
        
        Add new Line

    </button>
    
    <button className="button" onClick={()=>handleUpdateTodo(year,date.getMonth(),dayOfMonth,dailyTasks)}>
        Save to App state

    </button>
    
 <p>{JSON.stringify(getDefaultValue(new Date(date.getFullYear(),date.getMonth(),dayOfMonth+1))) && ''}</p>
</div>

</div>
        
    
    

// adds new line to cell
    function addInputLIne() {
        let input = <input  onChange={onTodoInputted}

        key={uuidv4()} defaultValue={getDefaultValue(new Date(date.getFullYear(),date.getMonth(),dayOfMonth+1))} type ="text"></input>
        setInputArray([...inputArray, input])
      
        
    }

   
// sets  individual days task
    function onTodoInputted(e) {
      
        setDailyTasks([...dailyTasks, e.target.value])
        
    }
  
    function getDefaultValue(date)
    {
     // search through tasks and see if ther is a task that matched today's date
        let res= tasks.find( x =>  Object.keys(x).toString() === date.toString())       
      return  res ?  res[date] : ''
    }

}