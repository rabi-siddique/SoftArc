import React from 'react'
import {useHistory} from 'react-router-dom'
import {MiniNavBar} from '../../components'
import {TableData} from '../../components'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './Table.css'


function Table(props) {
    const icon_color = props.darkmode?"#fff":"#121212"
    let history = useHistory()

    const clickHandler = ()=>{
        history.goBack()
    }
    
    
    
    return (
        <div className="entire-table">
           
            <p class="text-lg text-center font-bold m-5">Classic Table Design</p>
<table class="rounded-t-lg m-5 w-5/6 mx-auto bg-gray-200 text-gray-800">
  <tr class="text-left border-b-2 border-gray-300">
    <th class="px-4 py-3">Firstname</th>
    <th class="px-4 py-3">Lastname</th>
    <th class="px-4 py-3">Age</th>
    <th class="px-4 py-3">Sex</th>
  </tr>
  
  <tr class="bg-gray-100 border-b border-gray-200">
    <td class="px-4 py-3">Jill</td>
    <td class="px-4 py-3">Smith</td>
    <td class="px-4 py-3">50</td>
    <td class="px-4 py-3">Male</td>
  </tr> 

  <tr class="bg-gray-100 border-b border-gray-200">
    <td class="px-4 py-3">Jill</td>
    <td class="px-4 py-3">Smith</td>
    <td class="px-4 py-3">50</td>
    <td class="px-4 py-3">Male</td>
  </tr> 

  <tr class="bg-gray-100 border-b border-gray-200">
    <td class="px-4 py-3">Jill</td>
    <td class="px-4 py-3">Smith</td>
    <td class="px-4 py-3">50</td>
    <td class="px-4 py-3">Male</td>
  </tr> 


</table>





<p class="text-lg text-center font-bold m-5">Dark Table Design</p>
<table class="rounded-t-lg m-5 w-5/6 mx-auto bg-gray-800 text-gray-200">
  <tr class="text-left border-b border-gray-300">
    <th class="px-4 py-3">Firstname</th>
    <th class="px-4 py-3">Lastname</th>
    <th class="px-4 py-3">Age</th>
    <th class="px-4 py-3">Sex</th>
  </tr>
  <tr class="bg-gray-700 border-b border-gray-600">
    <td class="px-4 py-3">Jill</td>
    <td class="px-4 py-3">Smith</td>
    <td class="px-4 py-3">50</td>
    <td class="px-4 py-3">Male</td>
  </tr>    

  <tr class="bg-gray-700 border-b border-gray-600">
    <td class="px-4 py-3">Jill</td>
    <td class="px-4 py-3">Smith</td>
    <td class="px-4 py-3">50</td>
    <td class="px-4 py-3">Male</td>
  </tr>    

  <tr class="bg-gray-700 border-b border-gray-600">
    <td class="px-4 py-3">Jill</td>
    <td class="px-4 py-3">Smith</td>
    <td class="px-4 py-3">50</td>
    <td class="px-4 py-3">Male</td>
  </tr>    

</table>




<p class="text-lg text-center font-bold m-5">Gradient Table Design</p>
<table class="rounded-t-lg m-5 w-5/6 mx-auto text-gray-100 bg-gradient-to-l from-indigo-500 to-indigo-800">
  <tr class="text-left border-b-2 border-indigo-300">
    <th class="px-4 py-3">Firstname</th>
    <th class="px-4 py-3">Lastname</th>
    <th class="px-4 py-3">Age</th>
    <th class="px-4 py-3">Sex</th>
  </tr>
  <tr class="border-b border-indigo-400">
    <td class="px-4 py-3">Jill</td>
    <td class="px-4 py-3">Smith</td>
    <td class="px-4 py-3">50</td>
    <td class="px-4 py-3">Male</td>
  </tr>    

  <tr class="border-b border-indigo-400">
    <td class="px-4 py-3">Jill</td>
    <td class="px-4 py-3">Smith</td>
    <td class="px-4 py-3">50</td>
    <td class="px-4 py-3">Male</td>
  </tr>    

  <tr class="border-b border-indigo-400">
    <td class="px-4 py-3">Jill</td>
    <td class="px-4 py-3">Smith</td>
    <td class="px-4 py-3">50</td>
    <td class="px-4 py-3">Male</td>
  </tr>    


</table>




<p class="text-lg text-center font-bold m-5">Flat Color Table Design</p>
<table class="rounded-t-lg m-5 w-5/6 mx-auto text-pink-100 bg-pink-700">
  <tr class="text-left border-b-2 border-pink-200 font-bold">
    <th class="px-4 py-3">Firstname</th>
    <th class="px-4 py-3">Lastname</th>
    <th class="px-4 py-3">Age</th>
    <th class="px-4 py-3">Sex</th>
  </tr>
  <tr class="bg-pink-600 font-semibold">
    <td class="px-4 py-3 border-b border-pink-500">Jill</td>
    <td class="px-4 py-3 border-b border-pink-500">Smith</td>
    <td class="px-4 py-3 border-b border-pink-500">50</td>
    <td class="px-4 py-3 border-b border-pink-500">Male</td>
  </tr>    

  <tr class="bg-pink-600 font-semibold">
    <td class="px-4 py-3 border-b border-pink-500">Jill</td>
    <td class="px-4 py-3 border-b border-pink-500">Smith</td>
    <td class="px-4 py-3 border-b border-pink-500">50</td>
    <td class="px-4 py-3 border-b border-pink-500">Male</td>
  </tr>    

  <tr class="bg-pink-600 font-semibold">
    <td class="px-4 py-3 border-b border-pink-500">Jill</td>
    <td class="px-4 py-3 border-b border-pink-500">Smith</td>
    <td class="px-4 py-3 border-b border-pink-500">50</td>
    <td class="px-4 py-3 border-b border-pink-500">Male</td>
  </tr>    


</table>

    
        </div>
    )
}

export default Table
