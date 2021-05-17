import React,{useEffect,useState} from 'react'
import './Saved.css'
import {SavedCard} from '../../components'
import axios from 'axios'

function Saved(props) {
    const [data,setData] = useState([])
    let url = `http://127.0.0.1:8000/scanner/saved/${props.id}/`;
    const config = {headers:{"Content-Type":"application/json"}}

    useEffect(()=>{
        async function fetchData(){
            const response = await axios.get(url,config)
            setData(Array.from(response.data))
            
        }  

        fetchData()

},[data])

if(data.length !== 0){
    return (
        <div className="card-container">
            {
                data.map(
                    (obj) =>{
                        
                        return ( 
                            <div>
                        <SavedCard 
                        key={obj.id} 
                        k = {obj.id}
                        name={obj.name}
                        details={obj.details}
                        data={obj.data}
                        id = {obj.id}
                        />
                         </div>
                        )
                       
                    }
                )
            }
           
            
        </div>
    )
    }
    else{
        return (
            <div className="nothing-to-show">
                <h1>No Items Saved. Nothing to Show.</h1>
            </div>
        )
    }
}

export default Saved
