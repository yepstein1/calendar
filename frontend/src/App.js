/*

todo - fix css
*/
import './App.css';
import {useState} from "react";
import SubmitButton from "./SubmitButton"


function App() {
    let [date, setDate] = useState(new Date());
    let [todo, setTodo] = useState([]);


    const daysOfMonth = {
        0: 31,
        1: 28,
        2: 31,
        3: 30,
        4: 31,
        5: 31,
        6: 30,
        7: 31,
        8: 31,
        9: 30,
        10: 31,
        11: 30,
        21: 30
    }

    const month = date.getMonth()
    const num = daysOfMonth[month]

    function handleUpdateTodo(e, numb) {
        let obj = {}
        console.log(numb)
        let day = new Date(date.getFullYear(), date.getMonth(), numb)

        let checkKeyPresenceInArray = key => todo.some(obj => Object.keys(obj).includes(key));
        let isKeyPresent = checkKeyPresenceInArray(day.toString());
        if (isKeyPresent) {

            let newTodo = todo.map((t) => {
                if (Object.keys(t).includes(day.toString())) {
                    t[day].push(e[e.length - 1]);

                }
                return t;

            })

            setTodo(newTodo)

        } else {
            obj[day] = [...e];
            setTodo([...todo, obj]);
        }

    }


    let days = []
    for (let i = 0; i < num; i++) {
        days.push(<Days num={i} date={date} handleUpdateTodo={handleUpdateTodo} />)
    }
    return (
        <div>
            <Buttons date={date}/>
            <div className='box'>


                {days}
                <br/>
                <div>
                <div className='submit-button-cont'>
            <SubmitButton handleSubmitClick={persitsState}/>

            </div>
                </div>
             
                </div>
            
                <br/>
                
           
       
        </div>

    );

    function Buttons() {
        //need to think about logic of arangement of components

        function changeMonth(i) {
            console.log("hi from func")
           // setDate(handleMonthChange(i))
            let nextDate = new Date()
            nextDate.setMonth(date.getMonth() +i);
            setDate(nextDate)
        }


      

        return <div className='button-parent'>
            <button className='button-change-month' onClick={()=>{changeMonth(-1)}}>  Previous Month</button>
            <button className='button-change-month' onClick ={()=>{changeMonth(1)}}> Next Month</button>
        </div>
    }

 function persitsState() {
console.log(JSON.stringify(todo))
 }
}

function Days(props) {


    let [inputArray, setInputArray] = useState([<input
        onChange={onTodoInputted}
    ></input>])

    let [todos, setTodos] = useState([])


    return <div className="day">


        <div className="button-parent">
            {props.date.toLocaleString('default', {month: 'long'})} {props.num+1}
            <br/>
            {inputArray}
            <button className="button" onClick={addInputLIne}>
                Add new Line

            </button>
            <br/>
            <button className="button" onClick={updateTodo}>
                Save

            </button>


        </div>
        {todos}
    </div>

// adds new line to cell
    function addInputLIne() {
        let input = <input  onChange={onTodoInputted}

        ></input>
        setInputArray([...inputArray, input])
    }

    function updateTodo() {
        props.handleUpdateTodo(todos, props.num)
    }

    function onTodoInputted(e) {
        console.log(`in updateontodo ${e}`)
        setTodos([...todos, e.target.value])
    }

}


export default App;
