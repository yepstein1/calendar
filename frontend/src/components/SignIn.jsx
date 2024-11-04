import { useState } from 'react'
export default function SignIn({setUserfunc})

{
    let onSubmit =  async function ()
{
    const url = 'https://juchx9t4t4.execute-api.us-east-1.amazonaws.com/Prod/hello'
   let obj ={ email}
    const queryString = new URLSearchParams(obj);
    const fullUrl = `${url}?${queryString}`;
    let resp = (await fetch(fullUrl));
    let userId = await resp.json();
    console.log("userid");
    console.log(userId);
    if(userId==-1)
    {
        setUserNotFound(true)
        
    }
    else {
        localStorage.setItem("userId",userId);
        setUserfunc(userId);
    }
    
}
    const [email, setEmail] = useState()
    const [userNotFound, setUserNotFound] = useState(false)
    return (
        <div className='loginform'>
           

            <input className='inputlogin'
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)
                    
                }
                required
            ></input>

            <br />

            <button onClick={onSubmit} disabled={!email}>Login</button>
            <p className ="error-message" hidden={!userNotFound}> Email not found</p>
        </div>
    );
    
}

