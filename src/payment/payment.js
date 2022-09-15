import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from "axios";
import { useEffect, useState } from "react";
import "../App.css"
import paypalpng from '../paypal.png'
import  {useParams} from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
import keycloakconfig from "../Keycloackconfig";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { TextField } from "@mui/material";
import Chart from 'react-apexcharts'
import ReactApexChart from "react-apexcharts";
export default function Payment()
{
    const [lst,setlst]=useState([])
    const [searchParams] = useSearchParams();
    const [shares,setshares]=useState()
    const [dataset,setdataset]=useState([])
    let param=[]
    let y = lst
    let options = {
        options: {
          chart: {
            id: 'apexchart-example'
          },
          type: 'line',
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
              speed: 1000
            }
          },
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        title: {
          text: 'Dynamic Updating Chart',
          align: 'left'
        },
        markers: {
          size: 0
        },
          xaxis: {
            categories: dataset.map(e=>e.x)
          }
        ,
        series: [{
          name: 'series-1',
          data: dataset.map(e=>e.y)
        }]
      }
    console.log(options)
    
    for (const entry of searchParams.entries()) {
        param.push(entry)
        console.log(entry);
      }
     const Id= searchParams.entries()
     console.log(param[0][0])   
    const [stock,setstock]=useState([])
    const [stocks,setstocks]=useState([])
    const [stocksbackup,setstocksbackup]= useState([])
    useEffect(()=>{
     // axios.get('stocks/stock_records').then((rs)=>{
     // setstocks(rs.data)
     //})
        axios.get('stocks/list_of_stocks').then((rs)=>{
        console.log(rs)
        setstocks(rs.data)
        let x=rs.data.filter(e=>e.Stock_Symbol==param[0][0])
        console.log(x)
        let currentdate= new Date().toTimeString()
        let o = {"x":currentdate.substring(0,8),"y":parseFloat(x[0].close)}
        y.push(o)
        setdataset(y)
       // console.log(parseInt(x[0].close*shares.shares*100))
        console.log(y)
        setstock(x)
     })   
    },[stocks])
    console.log(dataset)
    const CreatePayment = e=> event =>{
        
      axios.get("stocks/getShares_stocksPaymentList").then(async(res)=>{
        const response = await axios.post(
            'https://api-m.sandbox.paypal.com/v1/oauth2/token',
            new URLSearchParams({
                'grant_type': 'client_credentials'
            }),
            {
                auth: {
                    username: 'AWla8-NynFHzR2idw-3ZrJXi2Fq_EvEJe9W7YiwWlO2B1SARjr2evfpOIc2Oa94G5qm9wlOtFE9RiJCF',
                    password: 'EN70Okt8s3Ad8q_ofzw7rroY1eVk1BH0xGX_VQ7h3OUUc01Z9vd5EFsCLGTTWyjm2l39COghQmWtW5NR'
                }
            }
       ).then(async function(response) {
        const token = response.data.access_token
        console.log(token)
        console.log(keycloakconfig.tokenParsed.email.substring(0,keycloakconfig.tokenParsed.email.indexOf("@"))+"stockbroker@gmail.com")
        const amount=parseFloat(e.close)*shares.shares
        console.log(amount)
        //const amount = 0.5*1
        const response2 = await axios.post(
            'https://api-m.sandbox.paypal.com/v1/payments/payment',
            // '{\n  "intent": "sale",\n  "payer": {\n    "payment_method": "paypal"\n  },\n  "transactions": [\n    {\n      "amount": {\n        "total": "30.11",\n        "currency": "USD",\n        "details": {\n          "subtotal": "30.00",\n          "tax": "0.07",\n          "shipping": "0.03",\n          "handling_fee": "1.00",\n          "shipping_discount": "-1.00",\n          "insurance": "0.01"\n        }\n      },\n      "description": "The payment transaction description.",\n      "custom": "EBAY_EMS_90048630024435",\n      "invoice_number": "48787589673",\n      "payment_options": {\n        "allowed_payment_method": "INSTANT_FUNDING_SOURCE"\n      },\n      "soft_descriptor": "ECHI5786786",\n      "item_list": {\n        "items": [\n          {\n            "name": "hat",\n            "description": "Brown hat.",\n            "quantity": "5",\n            "price": "3",\n            "tax": "0.01",\n            "sku": "1",\n            "currency": "USD"\n          },\n          {\n            "name": "handbag",\n            "description": "Black handbag.",\n            "quantity": "1",\n            "price": "15",\n            "tax": "0.02",\n            "sku": "product34",\n            "currency": "USD"\n          }\n        ],\n        "shipping_address": {\n          "recipient_name": "Brian Robinson",\n          "line1": "4th Floor",\n          "line2": "Unit #34",\n          "city": "San Jose",\n          "country_code": "US",\n          "postal_code": "95131",\n          "phone": "011862212345678",\n          "state": "CA"\n        }\n      }\n    }\n  ],\n  "note_to_payer": "Contact us for any questions on your order.",\n  "redirect_urls": {\n    "return_url": "https://example.com/return",\n    "cancel_url": "https://example.com/cancel"\n  }\n}',
            {
                'intent': 'sale',
                'payer': {
                    'payment_method': 'paypal',
                   
                }, "transactions": [{
                    "item_list": {
                        "items": [{
                            "name": "l",
                            "sku": "001",
                            "price": parseFloat(e.close),
                            //"price":0.5,
                            "currency": "USD",
                            "quantity": shares.shares
                        }]
                    },
                    "payee":{"email":e.Stock_Symbol+"stockholder@gmail.com"},
                    "amount": {
                        "currency": "USD",
                        "total": amount
                    },
                    "description": "Hat for the best team ever"
                }],
    
                'note_to_payer': 'Contact us for any questions on your order.',
                'redirect_urls': {
                    'return_url': 'http://localhost:5001/online_payments/success/'+amount,
                    'cancel_url': 'https://example.com/cancel'
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+token
                }
            }
        )
       const url= response2.data.links.filter(e=>e.rel=='approval_url')[0].href
       console.log(url)
       let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=600,height=600,left=100,top=100`;
       window.open(url,"payment",params)
       console.log(e)
       const EthPayment={
        timestamp: Date.now(),
        high: parseInt(e.high*100),
        low: parseInt(e.low*100),
        open: 0,
        close: parseInt(e.close*shares.shares*100),
        volume: parseInt(e.Volume),
        Buyer: keycloakconfig.subject,
        owner: e.Stock_Symbol+"stockholder@gmail.com"
       }
       console.log(EthPayment)
       axios.post('stocks/Payment_to_Blockchain',EthPayment)
       axios.post("stocks/wallet_transfer/"+keycloakconfig.tokenParsed.preferred_username+"/"+e.Stock_Symbol+"/"+parseInt(e.close*shares.shares*100))
      }).catch(function(error) {
        console.log(error);
      }); 
        console.log(res)
      })
        }
    return (
        <div>
                   <div>
           <ReactApexChart options={options.options} series={options.series} type="line" width={850} height={350} />
           </div>
    
            { stocks.length==0 ? (
                 <div className="x">
               
                 <p className="stock">Financial_Instrument:...loading</p>
                 <p className="stocki">close price:...loading</p>
                 <p className="stocki">highest price:...loading</p>
                 <p className="stocki">lowest price:...loading</p>
                 <p className="stocki">Volume:...loading</p>
                 </div>
            ):(
                stocks.filter(e=>e.Stock_Symbol==param[0][0]).map(e=>
                    <div className="x">
               
                    <p className="stock">Financial_Instrument:{e.Stock_Symbol}</p>
                    <p className="stocki">close price:{e.close}</p>
                    <p className="stocki">highest price{e.high}</p>
                    <p className="stocki">lowest price:{e.low}</p>
                    <p className="stocki">Volume:{e.Volume}</p>
                    {
                               e.change.includes('-')==true ? ( <p className="stockired">Change%:{e.change} <ArrowDownwardIcon></ArrowDownwardIcon></p>):(
                                <p className="stockigreen">Change%:{e.change} <ArrowUpwardIcon></ArrowUpwardIcon></p>
                               )} 
        <TextField
          label="shares"
          id="nb_of_shares"
          type="number"
          placeholder="1"
          className="stocki"
          required
          onChange={(e) => {
            setshares({ ...shares, shares: e.target.value });
          }}
          />

                  
                   
                   { ( keycloakconfig.authenticated &&  keycloakconfig.realmAccess.roles.includes('Buy Stocks')==true)?(
                     <PayPalScriptProvider options={{ "client-id": "AWla8-NynFHzR2idw-3ZrJXi2Fq_EvEJe9W7YiwWlO2B1SARjr2evfpOIc2Oa94G5qm9wlOtFE9RiJCF" }}>
                   <button className="button4"  onClick={CreatePayment(e)}>Pay</button>
                   </PayPalScriptProvider>
                ):
                (  <td></td>)}

     
       
   
                    </div>
                )
            )}
           
    
    
     </div>
    )

}