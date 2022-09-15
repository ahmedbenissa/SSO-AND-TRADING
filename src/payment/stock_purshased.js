import axios from "axios";
import { useEffect } from "react";
import keycloakconfig from "../Keycloackconfig";
import { useState } from "react";
export default function StocksPurshased(){
    const [Purshases,setPurshases]=useState([])
    const [stocks,setstocks]=useState([])
    const [current_prices,setcurrentprices]=useState([])
    const [stock,setstock]=useState()
    
    useEffect(()=>{
        axios.get('stocks/getShares_stocksPaymentList').then((res)=>{
            console.log(res.data.filter(e=>e[0]==keycloakconfig.subject))
            let  x = res.data.filter(e=>e[0]==keycloakconfig.subject).length
            console.log(x)
           
            let list = res.data.filter(e=>e[0]==keycloakconfig.subject)
            let f=[]
            axios.get('stocks/get_last_Shares_stocksPaymentList').then((rs)=>{console.log(rs)
                var stock2={'timestamp':rs.data.stock_[0],"high":rs.data.stock_[1]/100,'low':rs.data.stock_[2]/100,"open":rs.data.stock_[3],"close":rs.data.stock_[4]/100
                ,"volume":rs.data.stock_[5],"owner":rs.data.stock_[6]}
                console.log(stock2)
                var purshase2 = { "Buyer": rs.data.Buyer,"sale_price":rs.data.price,"stock":stock2}
                setstock(purshase2)
                
                
                  f.push(purshase2)
                 
                })
          
            for(let i = 0 ; i <  x; i++ )
            {
                var stock={'timestamp':list[i][2][0],"high":list[i][2][1]/100,'low':list[i][2][2]/100,"open":list[i][2][3],"close":list[i][2][4]/100
                ,"volume":list[i][2][5],"owner":list[i][2][6]}
             //   let result= stocks.filter(x=>x.Financial_Instrument==stock.owner.substring(0,stock.owner.indexOf('stockholder')))[0].close
              //  console.log(result)
              //  f2.push(result)
               var purshase = { "Buyer": list[i][0],"sale_price":list[i][1],"stock":stock}
               let found=false
             
                 f.push(purshase)
            }
            f.filter(e=>e.stock.owner==keycloakconfig.tokenParsed.preferred_username)
            console.log(f)
          
            setPurshases(f)
           // setcurrentprices(f2)
            axios.get('stocks/list_of_stocks').then((rs)=>{
                
                console.log(rs.data)
               
                
                setstocks(rs.data)
                
             })   
        },[])
        
    },[])
   
     console.log( [...new Map(Purshases.map(item =>
        [item['sale_price'], item])).values()].filter(e=>e.stock.owner!=keycloakconfig.tokenParsed.preferred_username))
     let list =  [...new Map(Purshases.map(item =>
        [item['sale_price'], item])).values()]
       // list.filter(e=>e.stock.owner==keycloakconfig.tokenParsed.preferred_username)
    /*/Init_Sale_shares_to_Blockchain*/
    const sellstock = e => event => {
        console.log(stocks)
       let result= stocks.filter(x=>x.Stock_Symbol==e.stock.owner.substring(0,e.stock.owner.indexOf('stockholder')))[0].close
       console.log(result)
       
        const EthPayment={
            timestamp:  parseInt(e.stock.timestamp),
            high: parseInt(e.stock.high*100),
            low: parseInt(e.stock.low*100),
            open: 0,
            sale_price:parseInt(result*100),
            close: parseInt(e.stock.close*100),
            volume: parseInt(e.stock.volume),
            seller: keycloakconfig.tokenParsed.preferred_username,
        
            Financial_Instrument: e.stock.owner.substring(0,e.stock.owner.indexOf('stockholder'))
           }
           
           console.log(EthPayment)
           axios.post('stocks/Init_Sale_shares_to_Blockchain',EthPayment)
    } 
    return ( 
        <div>
            {
                (Purshases==undefined)?(
                    <p> l  o a  d  i  n   g </p>
                ):
                (
                    <table id="table" border="0px" className="center">
                    <thead>
                      <tr>
                     
                      <th>Seller</th>
                       <th>Date of Purshase</th>
                        <th>Highest_price</th>
                        <th>Lowest_price</th>
                        <th>Close_price</th>
                        <th>Sale_price</th>
                       
                        <th >sell Stocks</th>
                  
                      </tr>
                    </thead>
                    <tbody>
                      { 
                          list.map(e=>(
                              <tr>
                              
                            
                               {
                               e.stock.owner.indexOf('stockholder')!=-1 ? ( <td>{e.stock.owner.substring(0,e.stock.owner.indexOf('stockholder'))}</td>):(
                                <td>{e.stock.owner.substring(0,e.stock.owner.indexOf('@'))}</td>
                               )}
                               <td>{e.stock.timestamp}</td>
                              <td>{e.stock.high}</td>
                              <td>{e.stock.low}</td>
                              <td>{e.stock.close}</td>
                             
                            
                              <td><button className="button3" onClick={sellstock(e)} >Sell stock</button></td>
                             <td></td>
                              </tr>
                          ))
                       
                          
                      }
                       
                     
                      </tbody>
                   
                      </table>
                )
            }
        </div>
    )

}