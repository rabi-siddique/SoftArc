import React,{useState, useEffect,createContext} from 'react'

export const DataContext = createContext();

export const DataProvider = (props) => {

    const getLocalStorageValue = (key)=>{
          const value = window.localStorage.getItem(key);
          return value ? JSON.parse(value) : {};
        
      }

    const [datareceived,setdatareceived] = useState(() => getLocalStorageValue('datareceived'))
    
    useEffect(()=>{
        localStorage.setItem('datareceived',JSON.stringify(datareceived))
    },[datareceived])
    
    return (
        <DataContext.Provider value={[datareceived,setdatareceived]}>
            {props.children}
        </DataContext.Provider>
    )
}


