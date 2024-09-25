import {useState, useContext, useEffect} from "react";
import { v4 as uuidv4 } from 'uuid';
import { taskContext } from "./context-tasks";


/**
 * 
 * @param {*} year passed in from App=> Month
 * @param {Date} date passed in from App=> Month
 * @param {function} handleUpdateTodo passed in from App=> Month to lift state up
 */
export default function Days({year,date,dayOfMonth,handleUpdateTodo}) {

    const tasks = useContext(taskContext)
    const [savedTasksid,setSavedTasksid] = useState([])
    const [savedTasks,setSavedTasks] = useState([''])
    const [isDisabled,setIsDisabled] = useState([])
    

  
   
     /**
     * State to store each days tasks
     */
 let [dailyTasks, setDailyTasks] = useState([])
 // maybe loop through tasks and if there is a task with a cetain date then add it to the input form
 
 
 useEffect(()=>
 {
  // console.log(`size of saved task array ${savedTasks.length}`)

    if(tasks.length>0)
        {
          
           
        tasks.map((x)=> {
               let s = new Date(x.date)
        
            
               // note get month starts from 0 and days of month is also starts from 0
            if(s.getDate()== dayOfMonth)
                 {
                   
                    setSavedTasks((prevState)=>{
                       let newState = [...prevState,<div key ={x.taskid} >
                        <input defaultValue={x.taskname} disabled={isDisabled}></input>
                        <button  onClick ={() =>{handleEditButtonClicked(x.taskid)}}>Edit</button>    
                     
                        </div>]
                        return newState

                    })
                   
                  setSavedTasksid((prevState)=>
                    {
                    let temp = [...prevState,{[x.taskid] : true}]
                    return temp
                    })
                  //savedTasks.push()
                   }
                  //return savedTasks
            })
            
        }
       // console.log(`tasks length ${tasks.length}`)
       
 },[])
 
 
 
 

       // array of inputs for each day
    let [inputArray, setInputArray] = useState([<input type="text"
        onChange={onTodoInputted}
        key={uuidv4()}  ></input>])
    return <div className="day" >


<div className="button-parent">
 { new Date(date.getFullYear(),date.getMonth(),dayOfMonth+1).toLocaleString('default',{  weekday: 'long' } )} {date.toLocaleString('default', { month: 'long' })} {dayOfMonth+1}
    <br/>

    {savedTasks}
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
setSavedTasksid(prevState =>
{
    const findElt =(elt) => elt.id ===id
    let index = prevState.findIndex(findElt)

     let copy = prevState
     copy[index].id = false
     //copy.id = false
     return copy
}
)
    }

}