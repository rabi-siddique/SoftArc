import React from 'react'
import './VariablesTable.css'

function VariablesTable(props) {
  let tableData = props.vdata;
  let res=[];
  if(typeof tableData[0] !== 'undefined'){
      for(var i =0; i < tableData[0].length; i++){
          res.push(
              <tr class="bg-gray-100 border-b border-gray-200">
              <td class="px-4 py-3">{tableData[0][i]}</td>
              <td class="px-4 py-3">{tableData[1][i]}</td>
              <td class="px-4 py-3">{tableData[2][i]}</td>
            </tr>
          )
      }}
  else{
    return <p class="text-lg text-center font-bold m-5">No Variables</p>
}
  
    return (

      <div className="vtable">

<p class="text-lg text-center font-bold m-5">Variables</p>
    
    <table class="rounded-t-lg m-5 w-5/6 mx-auto bg-gray-200 text-gray-800">
    <tr class="text-left border-b-2 border-gray-300">
               <th class="px-4 py-3">Modifier</th>
               <th class="px-4 py-3">Name</th>
               <th class="px-4 py-3">Datatype</th>
             </tr>
   
        <tbody>

          {res}
        </tbody>

        </table>
      </div>
    )
}

export default VariablesTable
