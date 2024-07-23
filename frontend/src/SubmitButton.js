import './App.css';
export default function SubmitButton(props)
{
    return (
<>
    <button className="button" onClick={props.handleSubmitClick}>Submit</button>
    </>

    );
    
}