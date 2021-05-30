import React from 'react'
import './ClassDiagram.css'
import {MiniNavBar} from '../../components'
import {CDBox} from '../../components'
import { useContext } from 'react'
import {DataContext} from '../../context/DataContext'
import {useHistory} from 'react-router-dom'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
    Diagram,
    DiagramComponent,
    ConnectorModel
    } from "@syncfusion/ej2-react-diagrams";

    let diagramInstance = DiagramComponent;
    
    // A node is created and stored in nodes array.
    let connector = [{
    id: "connector",
    //Define connector start and end points
    sourcePoint: { x: 100, y: 100 },
    targetPoint: { x: 300, y: 300 },
    type: "Straight",
    shape: {
      type: "UmlClassifier",
      //Set an relationship for connector
      relationship: "Inheritance"
    }
    }];
    


function ClassDiagram(props) {
    const ref = React.createRef()
    const icon_color = props.darkmode?"#fff":"#121212"
    const [datareceived,setdatareceived] = useContext(DataContext)
    const arr = datareceived[0]
    const ext = datareceived[1]
    let history = useHistory()
    let cd = "cd"
    const options = {
        orientation: 'landscape',
        
    };

    const clickHandler = ()=>{
        history.goBack()
    }
  
    return (
        <div className="min-h-screen bg-gray-200 dark:bg-gray-600">
            <div className="goback">
            <ArrowBackIcon style={{fill:props.darkmode?"#121212":"#fff"}} onClick={clickHandler}/>
            </div>
            <MiniNavBar 
            d={cd}
            ref={ref}
            filename="ClassDiagram.pdf"
            icon_color={icon_color} 
            email={props.email}
            id={props.id} darkmode={props.darkmode}/>


        <div className="boxes" ref={ref}>
            {arr.map(a => (
                <div>
               
         
                <CDBox clss={a[0]} 
                ext = {ext}
                vdata={a[1]} 
                mdata={a[2]}
                extended_class = {a[3]}
                interfaces = {a[4]} 
                icon_color={icon_color}
                />

<div className="flex flex-col justify-center items-center">
                    
                   {/* <div class="w-full lg:w-1/2 px-4 py-2">
                   
                    
                   <details class="mb-4">
                   <summary class="font-semibold bg-white dark:text-gray-100 dark:bg-gray-900 rounded-md py-2 px-4">
                      Extends 
                     </summary>
        
                     <span class="font-semibold dark:text-gray-200">
                     {a[3]?a[3]:"None"}
                     </span>
                     </details>
                  
                 </div>*/}
        
                {/* <div class="w-full lg:w-1/2 px-4 py-2">
                   
                    
                   <details class="mb-4">
                   <summary class="font-semibold bg-white dark:text-gray-100 dark:bg-gray-900 rounded-md py-2 px-4">
                       Implements 
                     </summary>
        
                     <span class="text-gray-900 font-semibold dark:text-gray-200">
                     {a[4].length !==0 ? a[4].join(", "):"None"}
                     </span>
                     </details>
                  
                 </div>*/}
                 
                 </div>

        

                </div>
 ))}
        </div>
        </div>
    )
}

export default ClassDiagram
