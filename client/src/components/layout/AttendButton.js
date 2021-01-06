
import React, {useState} from "react"; 

// import {listNumbers} from '../dashboard/API';


export default function Favorite() {

    const [state, setState] = useState(true);
    const [counter, setCounter] = useState(0); 
    
    
    // const getCategories = async () => {
    //     const counter = await listNumbers();
    //     setCounter(counter);

    // };
    // useEffect(()=> {
    //     getCategories();
    // }, []);

    
    function toggle() {
    
    setState(!state);
    if (state === true) {
      setCounter(counter +1);
    
    } else {
      setCounter(counter -1);
    
    }
    }
    return (
    <div>
    <button className="likes"id="likes" name="likes" required  onClick={toggle} > 
      {state ? <span>SAVE</span> : <span>DELATE </span>}
     </button>
        {/* <p>Attending: {counter}</p> */}
    </div>

    );
    }