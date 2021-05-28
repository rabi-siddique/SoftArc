import React from 'react'
import Pdf from 'react-to-pdf'
import {TableData} from '../../components'

const ref = React.createRef()

function PDF(props) {
    return (
        <>
        <Pdf targetRef={ref} filename="Data.pdf">
            {({ toPdf }) => <button onClick={toPdf}>Download as PDF</button>}
            </Pdf>
           <div className="PDF" ref={ref}>
           
            </div> 
            
        </>
    )
}

export default PDF

