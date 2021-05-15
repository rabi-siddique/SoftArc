import React from 'react'
import './MethodsTable.css'

function MethodsTable(props) {
  let tableData = props.mdata;
  let res=[];
  
  if(typeof tableData[0] !== 'undefined'){
      for(var i =0; i < tableData[0].length; i++){
          res.push(
          <tr >
          <td>{tableData[0][i]}</td>
          <td>{tableData[1][i]}</td>
          <td>{tableData[2][i]}</td>
          <td>{tableData[3][i]}</td>
          </tr>
          )
      }}
      else{
        return <div className="overall-container"> 
        <h1>No Methods</h1>
        </div>
      }


    return (
      <div>

    <div className="overall-container"> 
    <h1>Methods</h1>
    </div>

      <div className="table-container"> 
            <table className="mtable">
      <thead>
        <tr>
          <th scope="col">Modifier</th>
          <th scope="col">ReturnType</th>
          <th scope="col">Name</th>
          <th scope="col">Arguments</th>
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

export default MethodsTable
