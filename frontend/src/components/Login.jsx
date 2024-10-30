import  {useState} from 'react'
import getUserIdFromBackend from '../getUseridFromBackend';
 export default   function   Login({setUserfunc}){

    const [email,setEmail] = useState()
    const [firstName,setFirstName] = useState()
    const [lastName,setLastName] = useState()

    return (
        <div className='loginform'>
            <h2> Login   
            </h2>
            <input className='inputlogin'
            
            placeholder="Enter First Name"
            value ={firstName}
            onChange ={(e)=>setFirstName(e.target.value)}
            ></input>
<br/>
<input className='inputlogin'
        
            placeholder="Enter Last Name"
            value ={lastName}
            onChange ={(e)=>setLastName(e.target.value)}
            ></input>
            <br/>


<input className='inputlogin'
            type ="email"
            placeholder="Enter email"
            value ={email}
            onChange ={(e)=>setEmail(e.target.value)}
            ></input>

<br/>

            <button onClick ={onSubmit}>Login</button>
            </div>  
    );

    function onSubmit()
    {
       

       
// maybe rename funtion 
console.log(`first name from login submit ${firstName}`)
// this object setting seems to work
let userObj ={
  'firstname' : firstName,
  'lastname' : lastName,
    email,
    
}
console.log(`userObj ${JSON.stringify(userObj)}`)
//let userId =  getUserId(userObj);
//let userId =userIdProm.then()


getUserIdFromBackend(userObj)
    
        let id = localStorage.getItem('userId');
        console.log(`user id :  ${JSON.stringify(id)}`)

        localStorage.setItem('user',JSON.stringify(userObj))
   

        /**
         * let App know that user is logged in
         */
        setUserfunc(firstName)
    }
}

  
    
