import { useState } from 'react'
import getUserIdFromBackend from '../getUseridFromBackend';
import SignIn from './SignIn';
export default function Login({ setUserfunc }) {

 let  isDisabled = function ()
    {
        if(!email|| !firstName || !lastName )
            return true;
        return false;
    }

    const [email, setEmail] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [isNewUser,setIsNewUser] = useState(true)

    let signUpElt =   (<div className='loginform'>
        <h2> Sign Up
        </h2>
        <input className='inputlogin'

            placeholder="Enter First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
        ></input>
        <br />
        <input className='inputlogin'

            placeholder="Enter Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
        ></input>
        <br />


        <input className='inputlogin'
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
        ></input>

        <br />

        <button onClick={onSubmit}  disabled={!email|| !firstName || !lastName }>Submit</button>
        <div>
            <button className='login' onClick={()=>{setIsNewUser(false)}}>
            <sub>click here if you already have an account</sub>
            </button>
        
        </div>
        </div>
        )

        

  


    return (
   
     isNewUser ?   signUpElt :<SignIn setIsIsnewUser={setIsIsnewUser} setUserfunc={setUserfunc}/>
    );

    function onSubmit() {


// prevent null submission
// rething storing stuff in local storage

        let userObj = {
            'firstname': firstName,
            'lastname': lastName,
            email,

        }
   getUserIdFromBackend(userObj,setUserfunc)
       

        /**
         * let App know that user is logged in
         */
      
    }

    function setIsIsnewUser()
    {
        setIsNewUser(false)
    }
}



