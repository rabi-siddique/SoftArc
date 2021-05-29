import React from 'react'
import {VariablesTable} from '../../components'
import {MethodsTable} from '../../components'
import { useContext } from 'react'
import {DataContext} from '../../context/DataContext'
import './TableData.css'

function TableData(props) {
    const [datareceived,setdatareceived] = useContext(DataContext)
    const arr = datareceived[0]
    const ext = datareceived[1]
  
    return (
        <div className="whole-table">
    
            <div  className="divide-dashed">
            {arr.map(a => (

            <div className="tableinstance">
            <div className="AB">
            {a[3] !== ""?
            (<p class="text-lg bg-indigo-500 text-white text-center font-bold mt-5 px-4 py-3 dark:bg-gray-900 dark:text-gray-100">{a[0]} extends {a[3]}</p>)
            :
            (<p class="text-lg bg-indigo-500 text-white text-center font-bold mt-5 px-4 py-3 dark:bg-gray-900 dark:text-gray-100">{a[0]}</p>)
            }
            </div>

            {a[4].length !== 0?(
            <div class="BA">
            {ext === '.cpp'?
            (<p class="text-lg bg-indigo-500 text-white text-center font-bold mt-5 px-4 py-3 dark:bg-gray-900 dark:text-gray-100">{a[4]}</p>)
            :
            (<p class="text-lg bg-indigo-500 text-white text-center font-bold mt-5 px-4 py-3 dark:bg-gray-900 dark:text-gray-100">{a[4].toString()}</p>)
            
            }
            </div>):(<div></div>)
            }       

            <VariablesTable vdata={a[1]}/>
            <MethodsTable mdata={a[2]}/>
            
        </div> ))}
        </div>
        </div>
    )
}

export default TableData
