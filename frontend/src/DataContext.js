import React,{useState,createContext} from 'react'

export const DataContext = createContext();

export const DataProvider = (props) => {

    const [datareceived,setdatareceived] = useState({})
    return (
        <DataContext.Provider value={[datareceived,setdatareceived]}>
            {props.children}
        </DataContext.Provider>
    )
}


