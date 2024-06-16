import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, Container, TextField, Typography, Link } from "@mui/material";

const LoginForm: React.FC = () => {
  const [username, setUsename] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username, password);
    navigate("/dashboard");
  };

  return (
    <Container component={"main"} maxWidth="xs" sx={{ marginTop: "8rem" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Usuário"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsename(e.target.value)}
        />
        <TextField
          label="Senha"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button 
          type="submit"
         variant="contained" 
         color="primary" 
         size="large"
         sx={{ marginTop: "1rem" }}
         fullWidth>
          Login
        </Button>
        <Typography variant="body1" component="p" gutterBottom style={{marginTop: "1rem"}}>
          Não possui uma conta? <Link href="/register">Registre-se</Link>
        </Typography>
      </form>
    </Container>
  );
};

export default LoginForm;
