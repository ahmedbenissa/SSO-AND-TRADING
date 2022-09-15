import axios from "axios";
import { useEffect, useState } from "react";
import keycloakconfig from "../../Keycloackconfig";
import paypalpng from '../../paypal.png'
import "../../App.css"
export default function Sales()
{
    const [sales,setssales]=useState([])
    useEffect(()=>{
        axios.get('stocks/get_share_sales_List').then((res)=>{console.log(res.data.filter(e=>e[1]!=keycloakconfig.tokenParsed.email).filter(e=>e[1]!='')
        .filter(e=>e[1]!='buyer1'))
        setssales(res.data.filter(e=>e[1]!=keycloakconfig.tokenParsed.email).filter(e=>e[1]!='')
        .filter(e=>e[1]!='buyer1'))
    })
    },[])
    const CreatePayment = e=> event =>{
        console.log(e)
       if (e[1].indexOf('stockbroker')!=-1){e[1].substring(0,e[1].indexOf('stockbroker@gmail.com'))}
        const amount=parseFloat(e[3]/100)*1
        console.log(amount)
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
          
          
          const response2 = await axios.post(
              'https://api-m.sandbox.paypal.com/v1/payments/payment',
              // '{\n  "intent": "sale",\n  "payer": {\n    "payment_method": "paypal"\n  },\n  "transactions": [\n    {\n      "amount": {\n        "total": "30.11",\n        "currency": "USD",\n        "details": {\n          "subtotal": "30.00",\n          "tax": "0.07",\n          "shipping": "0.03",\n          "handling_fee": "1.00",\n          "shipping_discount": "-1.00",\n          "insurance": "0.01"\n        }\n      },\n      "description": "The payment transaction description.",\n      "custom": "EBAY_EMS_90048630024435",\n      "invoice_number": "48787589673",\n      "payment_options": {\n        "allowed_payment_method": "INSTANT_FUNDING_SOURCE"\n      },\n      "soft_descriptor": "ECHI5786786",\n      "item_list": {\n        "items": [\n          {\n            "name": "hat",\n            "description": "Brown hat.",\n            "quantity": "5",\n            "price": "3",\n            "tax": "0.01",\n            "sku": "1",\n            "currency": "USD"\n          },\n          {\n            "name": "handbag",\n            "description": "Black handbag.",\n            "quantity": "1",\n            "price": "15",\n            "tax": "0.02",\n            "sku": "product34",\n            "currency": "USD"\n          }\n        ],\n        "shipping_address": {\n          "recipient_name": "Brian Robinson",\n          "line1": "4th Floor",\n          "line2": "Unit #34",\n          "city": "San Jose",\n          "country_code": "US",\n          "postal_code": "95131",\n          "phone": "011862212345678",\n          "state": "CA"\n        }\n      }\n    }\n  ],\n  "note_to_payer": "Contact us for any questions on your order.",\n  "redirect_urls": {\n    "return_url": "https://example.com/return",\n    "cancel_url": "https://example.com/cancel"\n  }\n}',
              {
                  'intent': 'sale',
                  'payer': {
                      'payment_method': 'paypal'
                  }, "transactions": [{
                      "item_list": {
                          "items": [{
                              "name": "l",
                              "sku": "001",
                              "price": parseFloat(e[3]/100),
                              "currency": "USD",
                              "quantity": 1
                          }]
                      },
                      "payee":{"email":e[1]+"stockbroker@gmail.com"},
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
        console.log(amount)
         let fees= (3.49*(amount))/100 + 0.49
         console.log(fees)
         let amountTransfered=amount-fees
         console.log(parseInt(amountTransfered*100))
         let EthTransfer=parseInt(amountTransfered*100)
         console.log(EthTransfer)
        
         axios.put('stocks/Update_sale_of_share/'+e[0]+"/"+keycloakconfig.subject)
         axios.post("stocks/wallet_transfer/"+keycloakconfig.tokenParsed.preferred_username+"/"+e[1]+"/"+EthTransfer)
         axios.post('stocks/wallet_transfer/'+keycloakconfig.tokenParsed.preferred_username+'/'+"s"+'/'+parseInt(fees*100))
        }).catch(function(error) {
          console.log('Error on Authentication');
        }); 
          console.log(res)
        })
          }
    return (
        <div>
        {
            (sales==undefined)?(
                <p> l  o a  d  i  n   g </p>
            ):
            (
                <table id="table" border="0px" className="center">
                <thead>
                  <tr>
                 
                 
                   <th>seller</th>
                    <th>trader</th>
                    <th>Lowest_price</th>
                    <th>Highest_price</th>
                     <th>Current_price</th>
                     
                    <th >buy Stocks</th>
              
                  </tr>
                </thead>
                <tbody>
                  { 
                      sales.map(e=>(
                          <tr>
                          
                        
                           <td>{e[2][6]}</td>
                           {
                               e[1].indexOf('stockbroker')!=-1 ? ( <td>{e[1].substring(0,e[1].indexOf('stockbroker@gmail.com'))}</td>):(
                                <td>{e[1]}</td>
                               )}
                          
                          <td>{e[2][2]}</td>
                          <td>{e[2][1]}</td>
                          <td>{e[3]}</td>
                        
                          <td> <button className="button3"  onClick={CreatePayment(e)}>Buy</button></td>
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