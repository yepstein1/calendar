import {useState} from "react";


/**
 * 
 * @param {*} year passed in from App=> Month
 * @param {Date} date passed in from App=> Month
 * @param {function} handleUpdateTodo passed in from App=> Month to lift state u[p
 */
export default function Days({year,date,dayOfMonth,handleUpdateTodo}) {
    /**
     * State to store each days tasks
     */



    let [dailyTasks, setDailyTasks] = useState([])
    console.log(`hi from days ${dailyTasks}`)
   

       // array of inputs for each day
    let [inputArray, setInputArray] = useState([<input 
        onChange={onTodoInputted}
    ></input>])

    

    return <div className="day">


        <div className="button-parent">
            {date.toLocaleString('default', { month: 'long' })} {dayOfMonth+1}
            <br/>
            {inputArray}
            
            
            <button className="button" onClick={addInputLIne}>
                Add new Line

            </button>
            <br/>
            <button className="button" onClick={(e)=>handleUpdateTodo(year,date.getMonth(),dayOfMonth,dailyTasks)}>
                Save

            </button>
        </div>
       
    </div>

// adds new line to cell
    function addInputLIne() {
        let input = <input  onChange={onTodoInputted}

        ></input>
        setInputArray([...inputArray, input])
      
        
    }

   
// sets  individual days task
    function onTodoInputted(e) {
      
        setDailyTasks([...dailyTasks, e.target.value])
        
    }
}