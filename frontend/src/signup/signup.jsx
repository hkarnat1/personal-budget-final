import { Button, FormHelperText, Input } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signup as signupapi } from '../api';

const Signup = () => {
  const navigate = useNavigate();
  
  const [password, setPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const signup = () => {
    //call api here

    signupapi({ firstName, lastName, email, password });

    navigate('/login');
  }

  return (
    <div style={{ display: "grid", height: "100vh", placeContent: "center" }}>
      <div className="login-card">
        <h2> Signup Page </h2>

        <Input placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
        <Input placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>

        <Input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <Input placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>

        <Button variant="contained" disabled={password === '' || confirmPassword!== password} onClick={signup}>Signup</Button>


        <FormHelperText>Already have an account ? <Link to={'/login'}>Login</Link></FormHelperText>
      </div>
    </div>
  );
};

export default Signup;
