
import Days from './Days'
import { v4 as uuidv4 } from 'uuid';



/**
 * @param {any} year year passed in from App component
 *  @param {Date} date passed in from App component
 * @param {function} setTodoInApp function passed in from App component to lift state up
 */
export default function Month({year,date,setTodoInApp,getDefaultValue})
{
  
    const daysOfMonth = {
        0: 31, // january
        1: 28, //febuary
        2: 31, // march
        3: 30, //april
        4: 31, //May
        5: 30,//June 

        6: 31, // July
        7: 31, // August
        8: 30, // September
        9: 31, // October
        10: 30, // November
        11: 31, // December
        
    }

      const month =date.getMonth()
    /**
     * daysOfMonth Determine how many days in the current month
     */
    const dayOfMonth = daysOfMonth[month]
   /**
    * days array of Days components
    * 
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