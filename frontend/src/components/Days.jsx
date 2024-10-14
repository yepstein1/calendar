import { useState, useContext, useEffect} from "react";
import { v4 as uuidv4 } from 'uuid';
import { taskContext } from "./context-tasks";


/**
 * 
 * @param {*} year passed in from App=> Month
 * @param {Date} date passed in from App=> Month
 * @param {function} handleUpdateTodo passed in from App=> Month to lift state up
 * 
 */

export default function Days({ year, date, dayOfMonth, handleUpdateTodo }) {

    const tasks = useContext(taskContext)
    let savedTasks = []
    const [isDisabled, setIsDisabled] = useState([])
    const [updatedTasks,setUpdatedTasks] = useState('')
    const [visibilityState,setVisibilityState] = useState([])
    
    /**
    * State to store each days tasks
    */
    let [dailyTasks, setDailyTasks] = useState([])
 
    useEffect(() => {
        if (tasks.length > 0) {
            console.log(`day from props ${dayOfMonth}`)

            tasks.map((x) => {
                console.log(`x ${JSON.stringify(x)}`)

                let s = new Date(x.date)
                console.log(`day from context ${s.getUTCDate()}`)
                // note get month starts from 0 and days of month is also starts from 0
                if (s.getUTCDate() == dayOfMonth + 1) {

                    setIsDisabled((prevState) => {
                        let temp = [...prevState, { [x.taskid]: true }]
                        return temp
                    })

                    setVisibilityState((prevState) =>
                    {
                        let temp = [...prevState, { [x.taskid]: false }]
                        return temp
                    })
                }
            })

        }


    },[tasks])

    if (tasks.length > 0) {
        tasks.map((x) => {

            let s = new Date(x.date)

            // note get month starts from 0 and days of month is also starts from 0
            if (s.getUTCDate() == dayOfMonth + 1) {

                let index = isDisabled.findIndex(y => Object.keys(y)[0] == x.taskid)
                if (index >= 0) {

                    let editButtonText = isDisabled[index][x.taskid]? 'Edit' : 'Discard';
                   // const visibilityState = isDisabled[index][x.taskid] ? 'hidden' : 'false';
                    
                    let elt = (<div key={x.taskid} className="edit-parent" >
                        <input defaultValue={x.taskname} onChange ={(e) => {handleSavedTasksChange(e,x.taskid)}} disabled={isDisabled[index][x.taskid]} ></input>
                        <button onClick={() => { handleEditButtonClicked(x.taskid) }} > {editButtonText}</button>
                        <button onClick={() => { handleUpdateButtonClicked(x.taskid) } } style={{visibility:visibilityState[index][x.taskid] ?'visible' : 'hidden'}} >Save</button>

                    </div>)

                    savedTasks.push(elt)
                }

            }
        })
    }
    let [inputArray, setInputArray] = useState([<input type="text"
        onChange={onTodoInputted}
        key={uuidv4()}  ></input>])

    return <div className="day" >


        <div className="button-parent">
            {new Date(date.getFullYear(), date.getMonth(), dayOfMonth + 1).toLocaleString('default', { weekday: 'long' })} {date.toLocaleString('default', { month: 'long' })} {dayOfMonth + 1}
            <br />

            {savedTasks}
            {inputArray}
<br></br>
            <button className="button" onClick={addInputLIne}>

                Add new Line

            </button>

            <button className="button" onClick={() => {
                handleUpdateTodo(year, date.getMonth(), dayOfMonth, dailyTasks)

            }}>
                Save to App state

            </button>


        </div>

    </div>

    // adds new line to cell
    function addInputLIne() {
        let input = <input onChange={onTodoInputted}

            key={uuidv4()} type="text"></input>
    
        setInputArray([...inputArray, input])

    }

    // sets  individual days task
    function onTodoInputted(e) {

        setDailyTasks([...dailyTasks, e.target.value])

    }

    function handleEditButtonClicked(id) {
        console.log(id)
        setIsDisabled(prevState => {

            let index = prevState.findIndex(y => {

               return Object.keys(y)[0] == id
            })
            
            if (index >= 0) {
                let newState = [...prevState];
                newState[index][id] = !newState[index][id]
                return newState
            }
            return prevState;
        }
        )

        setVisibilityState(prevState => {

            let index = prevState.findIndex(y => {

               return Object.keys(y)[0] == id
            })
            
            if (index >= 0) {
                let newState = [...prevState];
                newState[index][id] = !  newState[index][id] 
                return newState
            }
            return prevState;
        }
        )

    }

   async  function handleUpdateButtonClicked(id)
    {


        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',


            },
            body:JSON.stringify( updatedTasks
            ),
        };
        let resp = await fetch('https://53ysp8tu5j.execute-api.us-east-1.amazonaws.com/Prod/', options);
        let res = await resp;
       return res;

    }

    function handleSavedTasksChange(e,id)
    {
        console.log(`event : ${e.target.value}`)
        setUpdatedTasks(() =>{
        return    {'id':id,
          'taskname':  e.target.value}
        }
        
         
            

          
        
        )
    }

}