import React,{useState} from 'react'
import './CDBox.css'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import {IconButton} from '@material-ui/core'

function CDBox(props) {

    const [active,setActive] = useState(false)

    const clickHandler = () =>{
        setActive(!active)
        
    }


    let ext = props.ext
    let clss = props.clss
    let variables = props.vdata;
    let methods = props.mdata;
    let extended_class = props.extended_class;
    let interfaces = props.interfaces
    let v=[];
    let m=[];
    let k=[];

  if(typeof variables[0] !== 'undefined'){

    for(var i =0; i < variables[0].length; i++){
        if(variables[0][i].trim() === 'public'){
            variables[0][i] = '+'
        }
        if(variables[0][i].trim() === 'private'){
            variables[0][i] = '-'
        }
        if(variables[0][i].trim() === 'protected'){
            variables[0][i] = '#'
        }
    }


      for(var i =0; i < variables[0].length; i++){
          let temp = variables[0][i]+variables[2][i]+':'+variables[1][i] 
          v.push(
            <li>{temp}</li>
          )
      }}
  else{
    v.push( <span>No Variables</span>)
    
  }


  if(typeof methods[0] !== 'undefined'){

    for(var i =0; i < methods[0].length; i++){
        
        
        if(methods[0][i] === 'public'){
            methods[0][i] = '+'
        }
        if(methods[0][i] === 'private'){
            methods[0][i] = '-'
        }
        if(methods[0][i] === 'protected'){
            methods[0][i] = '#'
        }
    }

    for(var i =0; i < methods[0].length; i++){
        let temp = methods[0][i]+methods[2][i]+'()'+':'+methods[1][i] 
        m.push(
        <li>{temp}</li>
        )
    }}
else{
  m.push( <span>No Methods</span>)
}


if(typeof interfaces !== 'undefined'){

    for(var i =0; i < interfaces.length; i++){
        
        k.push(
        <li>{interfaces[i]}</li>
        )
    }}
else{
  k.push( <span>None</span>)
}
  
    return (
        <div className="w-1/2 mx-auto mb-4 my-6 md:w-72 shadow sm:px-0 sm:py-6 py-4 px-4 bg-white dark:bg-gray-900 rounded-xl">
            <p className="pl-2 pb-2 break-all text-sm sm:text-lg px-0 sm:px-2 border-b-2 border-black text-lg text-gray-800 dark:text-gray-100 pb-1 font-semibold dark:border-gray-100">
                   
             {clss}
            </p>

            <div className="variables">
                <ul>
                <p className="pl-2 pb-2 pt-2 break-all px-0 sm:px-2 border-b-2 border-black text-sm sm:text-lg text-gray-800 dark:text-gray-100 pb-1 font-semibold dark:border-gray-100">
                {v}
                </p>
                </ul>
            </div>

            <div className="methods">
            <ul>
                <p className="pl-2 pb-2 pt-2 break-all border-b-2 border-black dark:border-gray-100 text-sm sm:text-lg px-0 sm:px-2  text-lg text-gray-800 dark:text-gray-100 pb-1 font-semibold">
                {m}
                </p>
            </ul>
            </div>

            <div class="w-full lg:w-1/2 ">
                   
                    
                   <details class="mb-1">
                   <summary class="font-semibold bg-white dark:text-gray-100 dark:bg-gray-900 rounded-md py-2 px-2">
                      Extends 
                     </summary>
        
                     <span class="pl-4 font-semibold dark:text-gray-200">
                     {extended_class?extended_class:"None"}
                     </span>
                     </details>
                  
                 </div>

            <div class="w-full lg:w-1/2 ">
                   
                    
                   <details class="mb-1">
                   <summary class="font-semibold bg-white dark:text-gray-100 dark:bg-gray-900 rounded-md py-2 px-2">
                       Implements 
                     </summary>
        
                     <span class="pl-4 text-gray-900 font-semibold dark:text-gray-200">
                     {interfaces.length !==0 ? interfaces.join(", "):"None"}
                     </span>
                     </details>
                  
                 </div>
         {/*   <div className="accordian">
            <IconButton onClick={clickHandler}>
            <ArrowDownwardIcon style={{fill: props.icon_color}}/>
            </IconButton>
            </div>

            {ext === '.cpp'?
            (
            <div className={`accordian-data-inactive ${active ? "active" : ""}`}>
                {k.length !== 0?
                (
                <ul>
                    <li>
                        Extends:</li>
                    <ul>
                    {k}
                    </ul>
                </ul>
                ):
                (
                    <ul>
                    <li>Extends: None</li>
                    </ul>
                
                )}
            </div>
            )
            :
            (
            <div className={`accordian-data-inactive ${active ? "active" : ""}`}>
            <ul>
            <li>Extends: {extended_class !== ""?`${extended_class}`:'None'}</li>
            <li>Implements:</li>
            {k.length !== 0?
            (
            <ul>
                {k}
            </ul>
            ):
            (
                <ul>
                <li>None</li>
            </ul> 
            )
            }
            </ul>
            
                </div>
            )}       
        */}
            </div>


    )
}

export default CDBox
