import React from 'react'
import {VariablesTable} from '../../components'
import {MethodsTable} from '../../components'
import './TableData.css'
import { useContext } from 'react'
import {DataContext} from '../../DataContext'

function TableData() {
    const [datareceived,setdatareceived] = useContext(DataContext)
    const arr = datareceived[0]
    const ext = datareceived[1]
   
    return (
        <div className="whole-table">
    
            <div  className="table-data">
            {arr.map(a => (

            <div>

            <div className="A">
            {a[3] !== ""?
            (<h1>{a[0]} extends {a[3]}</h1>)
            :
            (<h1>{a[0]}</h1>)
            }
            </div>

            {a[4].length !== 0?(
            <div class="B">
            {ext === '.cpp'?
            (<h1>Extends {a[4]}</h1>)
            :
            (<h1>Implements {a[4].toString()}</h1>) 
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
