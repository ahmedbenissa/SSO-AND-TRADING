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
export default function Details()
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
    
    const { id } = useParams()
    const [stock,setstock]=useState([])
    const [stocks,setstocks]=useState([])
    for (const entry of searchParams.entries()) {
        param.push(entry)
        console.log(entry);
      }
     const Id= searchParams.entries()
     console.log(param[0][0])   
    useEffect(()=>{
        axios.get('stocks/list_of_stocks').then((rs)=>{
        console.log(rs)
        setstocks(rs.data)
        let x=rs.data.filter(e=>e.Stock_Symbol==param[0][0])
        console.log(x)
        let currentdate= new Date().toTimeString()
        let o = {"x":currentdate.substring(0,8),"y":parseFloat(x[0].close)}
        y.push(o)
        setdataset(y)
        console.log(parseInt(x[0].close*shares.shares*100))
        console.log(y)
        setstock(x)
     })   
    },[stocks])
    console.log(dataset)
  
    return (
        <div>
            <div className="chart">
           <ReactApexChart options={options.options} series={options.series} type="line" width={850} height={350} />
           </div>
    
            { stock == undefined ? (
                <p>loading</p>
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
       
                  
                  
                    </div>
                )
            )}
           
    
    
     </div>
    )

}