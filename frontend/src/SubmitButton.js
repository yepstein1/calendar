import './App.css';
export default function SubmitButton(props)
{
    return (
<>
    <button className="submit-btn-cmp" onClick={props.handleSubmitClick}>Save to DB</button>
    </>

    );
    
}