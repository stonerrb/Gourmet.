import React, { useState } from "react";
import {
  TextField,
  FormControl,
  InputAdornment,
  InputLabel,
  IconButton,
  Input,
  Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const loginValues = {
    email: "",
    password: "",
  };

  const [lvalue, setLValue] = useState(loginValues);

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = lvalue;

    console.log("signup");
    const res = await fetch("/profile/signup", {
      meathod: "POST",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();
    if (res.status === 500 || !data) {
      window.alert("Not able to Login, Please try again");
      console.log("Login err");
    } else {
      console.log("User Logged In");
      navigate("/home");
    }
  };

  return (
    <div className="login-form">
      <form id="form1">
        <h1>Login</h1>
        <div className="input-container">
          <TextField
            sx={{ m: 1, width: "25ch" }}
            className="input"
            id="outlined-basic"
            label="Email"
            variant="standard"
            value={lvalue.email}
            onChange={(e) => setLValue({ ...lvalue, email: e.target.value })}
          />
          <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              value={lvalue.password}
              onChange={(e) =>
                setLValue({ ...lvalue, password: e.target.value })
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button
            variant="outlined"
            onClick={handleLogin}
            sx={{
              color: "#f50000",
              borderColor: "#f50000",
              margin: "30px",
            }}
            className="btn"
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}
