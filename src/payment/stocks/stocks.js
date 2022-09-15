import axios from "axios"
import { useState,useEffect } from "react"
import '../../App.css'
import keycloakconfig from "../../Keycloackconfig"
import { useNavigate } from "react-router-dom"
export default function Stocks()
{
    const navigate=useNavigate()
    const [stocks,setstocks]=useState([])
    const [stocksbackup,setbackup]=useState([])
    
useEffect(()=>{
 

 axios.get('stocks/list_of_stocks').then((rs)=>{
    console.log(rs)
    setstocks(rs.data)
 }) 

 

   
})
function nav(e)
{
    axios.put('stocks/list_stocks')
    navigate("/payment?"+e.Stock_Symbol)
}

  
    return (
        <div>
           
            <table id="table" border="0px" className="center">
  <thead>
    <tr>
    <th>Date</th>
    <th>Stock_Symbol</th>
     
      <th>High</th>
      <th>Low</th>
      <th>Close</th>
      <th>Change</th>
      <th>Volume</th>
      <th >Operations</th>

    </tr>
  </thead>
  <tbody>
    { (stocks==undefined || stocks.length==0)?(<p>loading........</p>):(
        stocks.map(e=>(
            <tr>
            <td>{Date.now()}</td>
            <td>{e.Stock_Symbol}</td>
            
            <td>{e.high}</td>
            <td>{e.low}</td>
            <td>{e.close}</td>
            <td> {
                               e.change.includes('-')==true ? ( <td className="stockired">{e.change}</td>):(
                                <td className="stockigreen">{e.change}</td>
                               )} </td>
            <td>{e.Volume}</td>
            {
                (keycloakconfig.realmAccess.roles.includes('Buy Stocks')==true)?(
                    <td><button className="button3" ><a href={"/payment?"+e.Stock_Symbol}>Buy</a></button></td>
                ):
                (  <td><button className="button3" ><a href={"/payment?"+e.Stock_Symbol}>Details</a></button></td>)
            }
           
         
            </tr>
        ))
    )
    }
    </tbody>
    </table>
    </div> 
        
    )
}