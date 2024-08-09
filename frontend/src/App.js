/*

todo - fix css
*/
import './App.css';
import { useEffect, useState } from "react";
import SubmitButton from "./SubmitButton"
import { transformTodo } from './transformTodo';

import Month from './components/Month';


function App() {
    /**
     * 
     * @type {Date} the date state vairiable holds todays date
     */
    let [date, setDate] = useState(new Date());
    let [todo, setTodo] = useState([]);



    /**
     * 
     * @param {*} year - the year associated with this task
     * @param {*} month the month associated with this task
     * @param {*} dayOfMonth   the  day of the month associated with this task -all the dates here are passed in from the Dayc component
     * @param {*} dailytask  the actual task - this is passed in from the Days component
     */
    let setTodoInApp = (year, month, dayOfMonth, dailytask) => {
        // need to fix when user clicks save and then adds another line to the same date and presses button again
        let obj = {}

        let day = new Date(year, month, dayOfMonth + 1)
     
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
            console.log("hi from else")
            obj[day] = [...dailytask];
            console.log(`todo in else ${todo}`)
            setTodo(
                oldTodo => [...oldTodo, obj]
            )

        }


    }
    let [monthComponentArray, setMonthComponentArray] = useState([<Month year={date.getFullYear()} date={date} setTodoInApp={setTodoInApp} />])

    console.log(` current date :${date}`)
    monthComponentArray.map(x=> console.log(` month component array ${x.props.date.getMonth()}`))
    function changeMonth(i) {

        let nextDate = new Date()
        
        let newMonth = date.getMonth();
        newMonth= newMonth+i;
       nextDate.setMonth(newMonth);
    
       let month = newMonth
       
        let year = nextDate.getFullYear()
        setDate(nextDate)
        console.log(` new date :${nextDate}`)

        let test = (x) => {
            return x.props.year === year && x.props.date.getMonth() === month
        }

        if (!monthComponentArray.some(test



        )) {
            // I use nextDate and not date because of async state updaye
            let monthComponent = <Month year={nextDate.getFullYear()} date={nextDate} setTodoInApp={setTodoInApp} />
            //month = monthComponent
            setMonthComponentArray((prevState) => [...prevState, monthComponent])

        }
        
 
    }

//console.log(monthComponentArray[0].props)

    return (
        <div>



            <div className='button-parent'>
                <button className='button-change-month' onClick={() => { changeMonth(-1) }}>  Previous Month</button>
                <button className='button-change-month' onClick={() => { changeMonth(1) }}> Next Month</button>
            </div>
            < div className='box'>

{
    

        monthComponentArray.find(x => x.props.year === date.getFullYear() & x.props.date.getMonth() === date.getMonth())

}

        


                
                <br />

                <div className='submit-button-cont'>
                    <SubmitButton handleSubmitClick={persitsState} />

                </div>

                <br />
            </div>





        </div>

    );


    //need to think about logic of arangement of components









    async function persitsState() {
        //console.log(JSON.stringify(todo))

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',


            },
            body: JSON.stringify(transformTodo(todo)),
        };



        let resp = await fetch('https://nr07mr1q3d.execute-api.us-east-1.amazonaws.com/Prod/hello/', options);
        let res = await resp.text();

        console.log(JSON.parse(res))

    }
}



export default App;