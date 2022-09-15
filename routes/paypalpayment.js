const express = require("express")
const route= express.Router()
const paypal = require('paypal-rest-sdk');
var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AWla8-NynFHzR2idw-3ZrJXi2Fq_EvEJe9W7YiwWlO2B1SARjr2evfpOIc2Oa94G5qm9wlOtFE9RiJCF',
  'client_secret': 'EN70Okt8s3Ad8q_ofzw7rroY1eVk1BH0xGX_VQ7h3OUUc01Z9vd5EFsCLGTTWyjm2l39COghQmWtW5NR'
});
var axios=require('axios')
route.post("/create_Payment/:item/:price/:quantity/:seller",async(req,res)=>{
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
    const amount=req.params.price*req.params.quantity
    const response2 = await axios.post(
        'https://api-m.sandbox.paypal.com/v1/payments/payment',
        // '{\n  "intent": "sale",\n  "payer": {\n    "payment_method": "paypal"\n  },\n  "transactions": [\n    {\n      "amount": {\n        "total": "30.11",\n        "currency": "USD",\n        "details": {\n          "subtotal": "30.00",\n          "tax": "0.07",\n          "shipping": "0.03",\n          "handling_fee": "1.00",\n          "shipping_discount": "-1.00",\n          "insurance": "0.01"\n        }\n      },\n      "description": "The payment transaction description.",\n      "custom": "EBAY_EMS_90048630024435",\n      "invoice_number": "48787589673",\n      "payment_options": {\n        "allowed_payment_method": "INSTANT_FUNDING_SOURCE"\n      },\n      "soft_descriptor": "ECHI5786786",\n      "item_list": {\n        "items": [\n          {\n            "name": "hat",\n            "description": "Brown hat.",\n            "quantity": "5",\n            "price": "3",\n            "tax": "0.01",\n            "sku": "1",\n            "currency": "USD"\n          },\n          {\n            "name": "handbag",\n            "description": "Black handbag.",\n            "quantity": "1",\n            "price": "15",\n            "tax": "0.02",\n            "sku": "product34",\n            "currency": "USD"\n          }\n        ],\n        "shipping_address": {\n          "recipient_name": "Brian Robinson",\n          "line1": "4th Floor",\n          "line2": "Unit #34",\n          "city": "San Jose",\n          "country_code": "US",\n          "postal_code": "95131",\n          "phone": "011862212345678",\n          "state": "CA"\n        }\n      }\n    }\n  ],\n  "note_to_payer": "Contact us for any questions on your order.",\n  "redirect_urls": {\n    "return_url": "https://example.com/return",\n    "cancel_url": "https://example.com/cancel"\n  }\n}',
        {
            'intent': 'order',
            'payer': {
                'payment_method': 'paypal',
                'payer_info':{ 
                    "email": "user02@gmail.com"
                }

            }, "transactions": [{
                "item_list": {
                    "items": [{
                        "name": req.params.item,
                        "sku": "001",
                        "price": req.params.price,
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
               // "payer":{"payment_method":"paypal","status":"VERIFIED","payer_info":{"email":"user02@gmail.com"}},
                "payee":{"email":req.params.seller},
                "amount": {
                    "currency": "USD",
                    "total": req.params.price
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
   const url2= response2.data.links.filter(e=>e.rel=='self')[0].href
   

   axios.get(url2,{headers:{'Authorization':'Bearer '+token}}).then((res)=>
   {
    console.log(res.data)
    

        paypal.payment.execute(res.data.id, { "payer_id" : "GNJLYG35QTNK6" }, function (error, payment) {
            expect(error.response.name).to.equal('PAYMENT_NOT_APPROVED_FOR_EXECUTION');
            expect(error.response.httpStatusCode).to.equal(400);
           
        });
    
    
  
       
   })
   
    res.redirect(url)
   
  }).catch(function(error) {
    console.log('Error on Authentication',error);
  }); 
})
route.get('/success/:amount',async (req,res)=>{

console.log(req.params.amount)
const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
console.log(payerId)
  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
        "amount": {
            "currency": "USD",
            "total": req.params.amount
        }
    }]
  };
   
  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
        console.log(error.response);
        ;
    } else {
        console.log(JSON.stringify(payment));
        res.send('Success');
    }
});
})
route.get('/Transfer/:amount',async (req,res)=>{

    console.log(req.params.amount)
    const payerId = req.query.PayerID;
      const paymentId = req.query.paymentId;
    console.log(payerId)
      const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": req.params.amount
            }
        }]
      };
    
      paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            ;
        } else {
            
            let p = JSON.stringify(payment)
            console.log(p);
            let x=JSON.parse(p)
            console.log(x.transactions[0].payee.email)
           // res.send("transferd")
            res.send('to execute payments and access Trading Account log in with broker account email:'+x.transactions[0].payee.email+'password:0000111 if you re logged in with your paypal account logout and log-in with your Trading account');
        }
    });
    })

module.exports=route