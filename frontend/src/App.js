/*

todo - fix css
*/
import './App.css';
import {  useState } from "react";
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
    let [todo, setTodo] = useState([]);


//useEffect(()=> console.log("hi from app render"))

    /**
     * 
     * @param {*} year - the year associated with this task
     * @param {*} month the month associated with this task
     * @param {*} dayOfMonth   the  day of the month associated with this task -all the dates here are passed in from the Dayc component
     * @param {*} dailytask  the actual task - this is passed in from the Days component
     */
    let setTodoInApp = (year, month, dayOfMonth, dailytask) => {
        console.log(`${JSON.stringify(todo)}: from setToDoApp`)
        // need to fix when user clicks save and then adds another line to the same date and presses button again
        let obj = {}

        let day = new Date(year, month, dayOfMonth + 1)
    day= day.toISOString().split('T')[0]
        let checkKeyPresenceInArray = key => todo.some(obj => Object.keys(obj).includes(key));
        let isKeyPresent = checkKeyPresenceInArray(day);
        if (isKeyPresent) {

            let newTodo = todo.map((t) => {

                if (Object.keys(t).includes(day)) {
                    t[day].push(todo);

                }
                return t;

            })

            setTodo(oldTodo => [...oldTodo, newTodo])

        } else {
           // console.log("hi from else")
            obj[day] = [...dailytask];
            //console.log(`todo in else ${todo}`)
            setTodo(
                (oldTodo) =>   [...oldTodo, obj]
                    
            )
            

        }


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
    let [monthComponentArray, setMonthComponentArray] = useState([<Month year={date.getFullYear()} date={date} setTodoInApp={setTodoInApp} key={ uuidv4()} todoList={todo} getDefaultValue={getDefaultValue} />])

    //console.log(` current date :${date}`)
    //monthComponentArray.map(x=> console.log(` month component array ${x.props.date.getMonth()}`))
    function changeMonth(i) {

        let nextDate = new Date()
        
        let newMonth = date.getMonth();
        newMonth= newMonth+i;
       nextDate.setMonth(newMonth);
    
       let month = newMonth
       
        let year = nextDate.getFullYear()
        setDate(nextDate)
      

        let test = (x) => {
            return x.props.year === year && x.props.date.getMonth() === month
        }

        if (!monthComponentArray.some(test



        )) {
            const monthComp = <Month year={nextDate.getFullYear()} date={nextDate} setTodoInApp={setTodoInApp} key={uuidv4()} todoList={todo} getDefaultValue={getDefaultValue} />;
            // I use nextDate and not date because of async state updaye
            let monthComponent = monthComp
            //month = monthComponent
            setMonthComponentArray((prevState) => [...prevState, monthComponent])

        }
        
 
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

{
    

        monthComponentArray.find(x => x.props.year === date.getFullYear() & x.props.date.getMonth() === date.getMonth())

}             
                <br />

                <div>
                    <SubmitButton handleSubmitClick={persitsState} className="submit-btn-cmp" />

                </div>

                <br />
            </div>

        </div>

        </taskContext.Provider>
        

    );


    //need to think about logic of arangement of components

    async function persitsState() {
        console.log(' from persist state' + JSON.stringify(todo))

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',


            },
            body: JSON.stringify(transformTodo(todo)),
        };



        let resp = await fetch('https://nr07mr1q3d.execute-api.us-east-1.amazonaws.com/Prod/hello/', options);
        let res = await resp.text();

        //console.log(JSON.parse(res))

    }
}



export default App;