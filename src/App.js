/*

todo - fix css
*/
import './App.css';
import {useState} from "react";


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

            let newTodo = todo.map(t => {
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
        days.push(<Days num={i} date={date} handleUpdateTodo={handleUpdateTodo}/>)
    }
    return (
        <div>
            <Buttons date={date}/>
            <div className='box'>


                {days}

            </div>


        </div>

    );

    function Buttons() {
        //need to think about logic of arangement of components

        function previousMonth() {
            console.log("hi from func")
            setDate(handleMonthChange(-1))
        }


        function handleMonthChange(i) {

            let nextDate = new Date()
            nextDate.setMonth(date.getMonth() - 1);
            console.log(nextDate)
            return nextDate;


        }

        return <div className='button-parent'>
            <button className='button' onClick={previousMonth}> Previous Month</button>
            <button className='button'> Next Month</button>
        </div>
    }


}

function Days(props) {


    let [inputArray, setInputArray] = useState([<input
        onChange={onTodoInputted}
    ></input>])

    let [todos, setTodos] = useState([])


    return <div className="day">


        <div className="button-parent">
            {props.date.toLocaleString('default', {month: 'long'})} {props.num}
            {inputArray}
            <button className="button" onClick={updateCounter}>
                Add new Line

            </button>
            <br/>
            <button onClick={updateTodo}>
                Save

            </button>


        </div>
        {todos}
    </div>

    function updateCounter() {
        let input = <input onChange={onTodoInputted}

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
