import React from 'react'
import './Buttons.css'
import {Link,useHistory} from 'react-router-dom'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


function Buttons() {
    let history = useHistory()

    const clickHandler = ()=>{
        history.push("/scanner")
    }
   
    return (
        <div className="buttons-container">
            <div className="goback">
            <ArrowBackIcon onClick={clickHandler}/>
            </div>

    <div className="w-11/12 mx-auto mb-4 my-6 md:w-5/12 shadow sm:px-10 sm:py-6 py-4 px-4 bg-white dark:bg-gray-800 rounded-md">
          
    <p className="mt-8 text-lg text-gray-800 dark:text-gray-100 pb-3 font-semibold">
                    To view the Table, click the button below.
                    </p>

    <Link to="/table">
    
    <button class="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
    Table
    </button>

    <p className="mt-8 text-lg text-gray-800 dark:text-gray-100 pb-3 font-semibold">
                    To view the class diagram, click the button below.
                    </p>
    </Link>


    <Link to="/cd">
    <button class="mb-8 w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
     Class Diagram
    </button>
    </Link> 
    
    </div>
    

                
       


        <div className="buttons">

     

        </div>
        </div>
    )
}

export default Buttons
