const express = require("express")
const route= express.Router()
const path = require('path');
const savePath = path.resolve(__dirname + '/contracts');
const contract = require('../build/contracts/Buy_stocks.json')
//const express = require('express')
const bodyParser = require('body-parser')
const Web3 = require('web3');
const web3 = new Web3("http://127.0.0.1:9545")
const Web3EthAccounts = require('web3-eth-accounts');
const stocks= require("../entities/stock");
const { default: axios } = require("axios");
const daiToken = new web3.eth.Contract(contract.abi,"0x935e84be17eC4FdC1535797b42c281c083c68e18", {
  from: '0xcBB733EAAD76fe8fee619770fAED4A56D3f01fA1', // default from address
  gas: '6721975' // default gas price in wei, 20 gwei in this case'
})

route.post('/Payment_to_Blockchain',async(req,res)=>{
            console.log('success')
            daiToken.methods.addPaymentTransaction(
                req.body.timestamp,
               req.body.high,
               req.body.low,
               req.body.open,
               req.body.close,
                req.body.volume,
                req.body.Buyer,
                req.body.owner
            ).send(async function(err,success){
                if(err)
                 console.log(err)
                 if(success)
                 {   
                   res.send(success)
                 }})
           
        
       
                  
})
route.post('/Init_Sale_shares_to_Blockchain',async(req,res)=>{
    /** uint256 timestamp,uint256 high,uint256 low,uint sale_price,uint256 open,
   string memory Financial_Instrument,uint256 close,uint volume,string memory seller**/
    daiToken.methods.sellShareofaStock(
        req.body.timestamp,
        req.body.high,
        req.body.low,
        req.body.sale_price,
        req.body.open,
        req.body.Financial_Instrument,
        req.body.close,
         req.body.volume,
         req.body.seller
    ).send(async function(err,success){
        if(err)
         res.send(err)
         if(success)
         {   
           res.send(success)
         }})
})
route.put('/Update_sale_of_share/:id/:customer',async(req,res)=>{
  daiToken.methods.UpdatesellShareofAstock(
    req.params.id,
    req.params.customer
  ).send(async function(err,success){
        if(err)
         res.send(err)
         if(success)
         {   
           res.send(success)
         }})
})
route.get("/getShares_stocksPaymentList",async(req,res)=>{
   
    daiToken.methods.getPaymentTransactionsList().call(async function(err,success){
        if(err)
         res.send(err)

         if(success)
         {  let list = []
            daiToken.methods.PaymentTransactions(success.length).call(async function(err,success1){
                if(err)
                 res.send(err)
                 if(success)
                 {  console.log(success1) 
                    
                    
                    res.send(success)}
            })
       
          
         }})
})
route.get("/get_last_Shares_stocksPaymentList",async(req,res)=>{
   
  daiToken.methods.getPaymentTransactionsList().call(async function(err,success){
      if(err)
       res.send(err)

       if(success)
       {  let list = []
          daiToken.methods.PaymentTransactions(success.length).call(async function(err,success1){
              if(err)
               res.send(err)
               if(success)
               {  console.log(success1) 
                  
                  
                  res.send(success1)}
          })
     
        
       }})
})
route.get("/get_share_sales_List",async(req,res)=>{
   
    daiToken.methods.getSalesTransactionsList().call(async function(err,success){
        if(err)
         res.send(err)

         if(success)
        
                    res.send(success)}
            )
         
})
route.get('/list_of_stocks',async(req,res)=>{
    await axios.get("http://127.0.0.1:5000/list_of_stocks").then((x)=>{
        res.send(x.data)  
    }).catch((err)=>{console.log(err)})
  })
route.put('/list_stocks',async(req,res)=>{
    await axios.get("http://127.0.0.1:5000/list_of_stocks").then((x)=>{
       
       stocks.find({},(err,docs)=>{
        if(err) console.log(err)
        else {
       
          
            for(let i = 0 ;i < x.data.length;i++)
           {
            stocks.updateOne({Stock_Symbol : x.data[i].Stock_Symbol},
             { $set:
              {
                timestamp:Date.now(),
                high:x.data[i].high,
                low:x.data[i].low,
                close:x.data[i].close,
                Volume:x.data[i].Volume,
                change:x.data[i].change,
                Stock_Symbol:x.data[i].Stock_Symbol
               }
              }
              ,(err,docs)=>{
                if(err) console.log(err)
                else console.log(docs)
              }) 
           }
           
           res.send(docs)
          }
        
       
       
    }).catch((err)=>{console.log(err)})
  })
})
route.get("/stock_records",(req,res)=>{
  stocks.find({},(err,docs)=>{
    if(err)
      res.send(err)
    else 
      res.send(docs)
  })
})

route.put('/addFundsToWallet/:user/:amount',(req,res)=>{
  daiToken.methods.addFundsToWallet(req.params.user,req.params.amount)
  .send(async function(err,success){
    if(err)
     console.log(err)
     if(success)
     {  
      console.log(success) 
       res.send(success)
     }})
})
/** *this year i learned blockchain */
route.post('/wallet_transfer/:sender/:reciever/:amount',(req,res)=>{
  daiToken.methods.walletexchange(req.params.sender,
    req.params.reciever,req.params.amount)
  .send(async function(err,success){
    if(err)
     console.log(err)
     if(success)
     {  
      console.log(success) 
       res.send(success)
     }})
})
route.get('/wallet/:user',(req,res)=>{
  daiToken.methods.wallets(req.params.user)
  .call(async function(err,success){
    if(err)
     console.log(err)
     if(success)
     {  
      console.log(success.balance/100) 
       res.send((success.balance/100).toString())
     }})
})
module.exports=route
