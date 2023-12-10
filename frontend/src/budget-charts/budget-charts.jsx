
import BarChart from './bar-chart';
import PieChart from './pie-chart';
import PolarAreaChart from './polar-area-chart';
import React, { useEffect, useRef, useState } from "react";
import { getBudgets as budgetApi } from "../api";

const BudgetCharts = () => {
  const [budgetData, setBudgetData] = useState([]);
  useEffect(() => {
  const getBudgetData = async () => {
    try {
        const tokenObj = localStorage.getItem("tokenObj");
        const parsedTokenObj = JSON.parse(tokenObj);
        // console.log(parsedTokenObj.email)
        const response = await budgetApi({ email: parsedTokenObj.email }); 
        console.log(response)
        setBudgetData(response.data.data);
    } catch (error) {
        console.error(error);
    }
};
getBudgetData();
  }, []);
  return (
    <div className='chart-list'>


        <BarChart budgetData={budgetData}/>
        <PieChart budgetData={budgetData}/>
        <PolarAreaChart budgetData={budgetData}/>
    </div>
  )
}

export default BudgetCharts