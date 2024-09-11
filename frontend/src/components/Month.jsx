
import Days from './Days'
import { v4 as uuidv4 } from 'uuid';



/**
 * @param {any} year year passed in from App component
 *  @param {Date} date passed in from App component
 * @param {function} setTodoInApp function passed in from App component to lift state up
 */
export default function Month({year,date,setTodoInApp,todoList,getDefaultValue})
{
  
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

      const month =date.getMonth()
    /**
     * daysOfMonth Determine how many days in the current month
     */
    const dayOfMonth = daysOfMonth[month]
   /**
    * days array of Days components
    */
    let days = []
    for (let i = 0; i < dayOfMonth; i++) {
        days.push(<Days dayOfMonth={i} date={date}   handleUpdateTodo={setTodoInApp}  year ={year} key ={uuidv4()}    getDefaultValue={getDefaultValue} />)
    }
    return (
        <div className="box" >        
                {days}
             
        </div>
    );
}