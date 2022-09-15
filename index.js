const express=require("express")
const app = express()
app.use(express.json())
const mongoose=require("mongoose")
const port = 5001
var axios = require('axios');


app.get('/',(req,res)=>{res.send("ee")})
const stockroutes=require('./routes/stocksroutes')
mongoose
  .connect("mongodb+srv://ahmed:ahmed@cluster0.iaanx.mongodb.net/stocksDatabase?retryWrites=true&w=majority")
  .then((ans) => {
    console.log("ConnectedSuccessful");
  })
  .catch((err) => {
    console.log("Error in the Connection");
  });
const online_payment_routes=require('./routes/paypalpayment')
const { createProxyMiddleware } = require("http-proxy-middleware")
app.use("/online_payments",online_payment_routes, createProxyMiddleware({
  target: 'http://localhost:5001',
  changeOrigin: true,
}))
app.use('/stocks',stockroutes, createProxyMiddleware({
  target: 'http://localhost:5001',
  changeOrigin: true,
}))
  app.listen(port, () => {
    console.log(`http://localhost:${port}`)
  })