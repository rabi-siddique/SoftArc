import React from 'react'
import './VariablesTable.css'

function VariablesTable(props) {
  let tableData = props.vdata;
  let res=[];
  if(typeof tableData[0] !== 'undefined'){
      for(var i =0; i < tableData[0].length; i++){
          res.push(
          <tr >
          <td>{tableData[0][i]}</td>
          <td>{tableData[1][i]}</td>
          <td>{tableData[2][i]}</td>
          </tr>
          )
      }}
  else{
    return <div className="overall-container"> 
    <h1>No Variables</h1>
    </div>
  }
  
    return (

      <div>

    <div className="overall-container"> 
    <h1>Variables</h1>
    </div>

      <div className="table-container"> 
           <table className="vtable">
        <thead>
          <tr>
            <th scope="col">Modifier</th>
            <th scope="col">Datatype</th>
            <th scope="col">Name</th>
          </tr>
        </thead>

        <tbody>

          {res}
        </tbody>

      </table>
        </div>
        </div>
    )
}

export default VariablesTable
