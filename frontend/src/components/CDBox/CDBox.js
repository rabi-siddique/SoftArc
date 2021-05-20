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
        <div className="box">
            <div className="class-name">
                {clss}
            </div>

            <div className="variables">
                <ul>
                {v}
                </ul>
            </div>

            <div className="methods">
                <ul>
                {m}
                </ul>
            </div>

            <div className="accordian">
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
                    <li>Extends:</li>
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
                
            </div>


    )
}

export default CDBox
