import React from 'react'
import './MethodsTable.css'

function MethodsTable(props) {
  let tableData = props.mdata;
  let res=[];
  
  if(typeof tableData[0] !== 'undefined'){
      for(var i =0; i < tableData[0].length; i++){
          res.push(
            <tr class="bg-gray-100 border-b border-gray-200 dark:bg-gray-700 dark:text-gray-100">

            <div className="hidden sm:contents">
            <td class="px-4 py-3">{tableData[0][i]}</td>
            </div>

            <div className="hidden sm:contents">
            <td class="px-4 py-3">{tableData[2][i]}</td>
            </div>

            <div className="contents sm:hidden">
            <td class="px-4 py-3">{tableData[0][i]} {tableData[2][i]}</td>
            </div>

            <td class="px-4 py-3">{tableData[1][i]}</td>
            <td class="px-4 py-3">{tableData[3][i]}</td>
          
          </tr> 
          )
      }}
      else{
     return <p class="text-lg text-center font-bold m-5 dark:text-gray-100">No Methods</p>
      }


    return (
      <div className="mtable">

<p class="text-lg text-center font-bold m-5 dark:text-gray-100">Methods</p>
    
    <table class="rounded-t-lg m-5 w-5/6 mx-auto bg-indigo-300">
    <tr class="text-left border-b-2 border-gray-300  dark:bg-gray-900 dark:text-gray-100">
              
              <div className="hidden sm:contents">
               <th class="px-4 py-3">Modifier</th>
               </div>

               <div className="hidden sm:contents">
               <th class="px-4 py-3">Name</th>
               </div>
               <div className="contents sm:hidden">
               <th class="px-4 py-3">Name</th>
               </div>
               <th class="px-4 py-3">Return type</th>
               <th class="px-4 py-3">Arguments</th>
             </tr>
   
        <tbody></tbody>
   
        <tbody>

          {res}
        </tbody>

        </table>
            
        </div>
        
    )
}

export default MethodsTable
