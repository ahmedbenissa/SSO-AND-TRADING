import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";

import Secured from "./Pages/secured";
import PrivateRoute from "./helpers/PrivateRoute";
import Home from "./Pages/Home";
import Payment from "./payment/payment";
import Stocks from "./payment/stocks/stocks";
import StocksPurshased from "./payment/stock_purshased";
import Sales from "./payment/stocks/sales";
import AddFunds from "./payment/addfundstoaccount";
import Details from "./payment/Details";


function App() {
 return (
   <div>
    
       <Nav />
       <BrowserRouter>
         <Routes>
           <Route exact path="/" element={<Home />} />
           <Route
             path="/secured"
             element={
               <PrivateRoute>
                 <Secured />
               </PrivateRoute>
             }
           />
           <Route
             path="/payment"
             element={
              
                 <Payment />
               
             }
           />
            <Route
            
             path="/payment?:id"
             element={
              <PrivateRoute>  
                 <Payment />
               </PrivateRoute>
             }
           />
            <Route
            
            path="/stock?:id"
            element={
             <PrivateRoute>  
                <Payment />
              </PrivateRoute>
            }
          />
           <Route
             path="/stocks"
             element={
              <PrivateRoute>
                 <Stocks />
                 </PrivateRoute>
               
             }
           />
           <Route 
           path="/Purshases"
           element={
              <PrivateRoute>
                 <StocksPurshased></StocksPurshased>
                 </PrivateRoute>
             }
           />
           <Route 
           path='/Sales'
           element={
               <PrivateRoute>
                <Sales></Sales>
               </PrivateRoute>
           }
           />
            <Route 
           path='/addFunds'
           element={
               <PrivateRoute>
                <AddFunds></AddFunds>
               </PrivateRoute>
           }
           />
         <Route 
           path='/details?:id'
           element={
               <PrivateRoute>
                <Details></Details>
               </PrivateRoute>
           }
           />
         </Routes>
       </BrowserRouter>
    
   </div>
 );
}

export default App;