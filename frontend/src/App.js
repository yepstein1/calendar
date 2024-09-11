/*

todo - fix css
*/
import './App.css';
import {  useEffect, useState } from "react";
import SubmitButton from "./SubmitButton"
import { transformTodo } from './transformTodo';
import { v4 as uuidv4 } from 'uuid';
import { taskContext } from './components/context-tasks';


import Month from './components/Month';


function App() {
    /**
     * 
     * @type {Date} the date state vairiable holds todays date
     */
    let [date, setDate] = useState(new Date());
    //let nextDate =date;
    // still need this as state I believe to show preivously loaded states
    let [todo, setTodo] = useState([]);





    /**
     * 
     * @param {*} year - the year associated with this task
     * @param {*} month the month associated with this task
     * @param {*} dayOfMonth   the  day of the month associated with this task -all the dates here are passed in from the Dayc component
     * @param {*} dailytask  the actual task - this is passed in from the Days component
     */
    let  setTodoInApp =  async (year, month, dayOfMonth, dailytask) => {
        
        // need to fix when user clicks save and then adds another line to the same date and presses button again
        let obj = {}
       
        let day = new Date(year, month, dayOfMonth + 1)
    day= day.toISOString().split('T')[0]
    let ref=[];
    dailytask.forEach(x=> 
    {
ref.push({[day] : x})
    }
    )
  
        

       console.log(`ref is ${JSON.stringify(ref)} type is ${typeof ref}`)
        persitsState(ref)


    }

    let getDefaultValue = (param)=> {
// currently just trying to see if I can get the most up to date value of todo in day comp
       // console.log(JSON.stringify(todo))
        // console.log('from  get defaultValue from parent component`') 
       
       // return param.toString()
      let res;
       todo.forEach(element => {
        res += element
       });

       return res && ''
    }
    
    function changeMonth(i) {

        let nextDate = new Date()
        
        let newMonth = date.getMonth();
        newMonth= newMonth+i;
       nextDate.setMonth(newMonth);
    
       
        setDate(nextDate)
      

       
        
 
    }

    return (
        <taskContext.Provider value={todo}>
<div>

{JSON.stringify(todo)}

            <div className='button-parent'>
                <button className='button-change-month' onClick={() => { changeMonth(-1) }}>  Previous Month</button>
                <button className='button-change-month' onClick={() => { changeMonth(1) }}> Next Month</button>
            </div>
            < div >
            <Month year={date.getFullYear()} date={date} setTodoInApp={setTodoInApp} key={uuidv4()}  getDefaultValue={getDefaultValue} />;
          
                <br />

               
                <br />
            </div>

        </div>

        </taskContext.Provider>
        

    );


    //need to think about logic of arangement of components

    async function persitsState(ref) {
        

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',


            },
            body: JSON.stringify(transformTodo(ref)),
        };



        let resp = await fetch('https://nr07mr1q3d.execute-api.us-east-1.amazonaws.com/Prod/hello/', options);
        let res = await resp.text();

        //console.log(JSON.parse(res))

    }
}



export default App;