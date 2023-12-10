import { Button, FormHelperText, Input } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as loginapi } from "../api";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState('');

  const login = async () => {
    try {
      //call api here
      const response = await loginapi({ email, password });
      localStorage.setItem("tokenObj", JSON.stringify(response.data.token));
      // localStorage.setItem("email", JSON.stringify(response.data.email));
      console.log("Token at Login:", JSON.stringify(response.data.token));
      setError('');
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
      setError('Invalid username/password');
    }
  };

  return (
    <div style={{ display: "grid", height: "100vh", placeContent: "center" }}>
      <div className="login-card">
        <h2> Login Page </h2>

        <Input
          type="email"
          placeholder="Email/Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <FormHelperText error={true}>{error}</FormHelperText>}
        <Button variant="contained" onClick={login} disabled={email === '' || password === ''}>
          Login
        </Button>
        <FormHelperText>
          Don't have an account ? <Link to={"/signup"}>Signup here</Link>
        </FormHelperText>
      </div>
    </div>
  );
};

export default Login;
