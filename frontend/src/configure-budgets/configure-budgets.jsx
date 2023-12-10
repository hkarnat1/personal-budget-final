import { Button, FormHelperText, TextField } from '@mui/material';
import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getBudgets as getBudgetsapi, addBudgets, deleteBudget } from '../api';

const ConfigureBudgets = () => {

  const [budgetList, setBudgetList] =  React.useState([]);

  const [budgetName, setBudgetName] = React.useState('');
  const [budgetAmount, setBudgetAmount] = React.useState(0);
  const [error, setError] = React.useState('');

  const onAddbudget = async () => {
    //Call api here
    try{
      console.log("Adding Budget");
      const tokenObj = localStorage.getItem("tokenObj");
      const parsedTokenObj = JSON.parse(tokenObj)
      console.log("Token:",parsedTokenObj.token);
      await addBudgets({ token: parsedTokenObj.token, name: budgetName, amount: budgetAmount });
      setError('');
      resetData();
      getBudgets();
    }
    catch(error){
      setError('Unable to Add budget.')
    }
  }

  const resetData = () => {
    setBudgetAmount(0);
    setBudgetName('');
  }

  const getBudgets = async () => {
    try{
      const tokenObj = localStorage.getItem("tokenObj");
      const parsedTokenObj = JSON.parse(tokenObj)
      console.log(parsedTokenObj.email)
      const res = await getBudgetsapi({ email: parsedTokenObj.email });
      setBudgetList(res.data.data)
    }
    catch(error){
      console.log(error);
    }
  }
  
  

  const onDeleteBudget = async (budgetId) => {
    try{
     await deleteBudget(budgetId);
      getBudgets();
    }
    catch(error){
      console.log(error);
    }
  }

  React.useEffect(() => {
    getBudgets();
  }, [])

  return (
    <div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell  align="right">Id</TableCell>
            <TableCell align="right">Budget Name</TableCell>
            <TableCell align="right">Budget Amount</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {budgetList.map((budget) => (<TableRow>
              <TableCell align="right">{budget?.id}</TableCell>
              <TableCell align="right">{budget.name}</TableCell>
              <TableCell align="right">{budget?.amount}</TableCell>
              <TableCell align="right"><Button color='error' onClick={() => onDeleteBudget(budget.id)}>Delete</Button></TableCell>
          </TableRow>))}
          {budgetList.length === 0 && (<TableRow>
            <TableCell align="center">No data</TableCell>
          </TableRow>)}
        </TableBody>
      </Table>
    </TableContainer>
      <div className='new-budget'>
        <h3> Add New Budget</h3>
        <TextField label="BudgetName" variant="outlined" value={budgetName} onChange={(e) => setBudgetName(e.target.value)}/>
        <TextField label="Budget Amount" variant="outlined" type='number' value={budgetAmount} onChange={(e) => setBudgetAmount(e.target.value)}/>
        {error && <FormHelperText error={true}>{error}</FormHelperText>}
        <Button variant='contained' style={{ width:'200px'}} onClick={onAddbudget}>Add Budget</Button>
      </div>
    </div>
  )
}

export default ConfigureBudgets