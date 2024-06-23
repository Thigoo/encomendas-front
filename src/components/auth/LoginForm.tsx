import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button, Container, TextField, Typography, Link } from "@mui/material";
import { User } from "../../models/User";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     console.log("Usuário autenticado", isAuthenticated);

      
  //   }
  // }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const user: User = { email, password };
      await login(user);
      
    } catch (error) {
      console.error("Erro ao fazer login: ", error);
    }
  };

  return (
    <Container component={"main"} maxWidth="xs" sx={{ marginTop: "8rem" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          fullWidth
        >
          Login
        </Button>
        <Typography
          variant="body1"
          component="p"
          gutterBottom
          style={{ marginTop: "1rem" }}
        >
          Não possui uma conta? <Link href="/register">Registre-se</Link>
        </Typography>
      </form>
    </Container>
  );
};

export default LoginForm;
