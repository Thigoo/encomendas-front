import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Button, Container, Link, TextField, Typography } from "@mui/material";

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { register } = useUser();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     register({username, email, password});
     navigate("/login");
  }

  return (
     <Container 
     component={"main"} 
     maxWidth="xs" 
     sx={{ marginTop: "8rem" }}>
          <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom>
               Register
          </Typography>
          <form onSubmit={handleSubmit}>
               <TextField 
               label="Nome"
               fullWidth
               margin="normal"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               />
               <TextField 
               label="Email"
               fullWidth
               margin="normal"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               />
               <TextField 
               label="Senha"
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
                    Register
               </Button>
               <Typography 
               variant="body1" 
               component="p"
               gutterBottom
               sx={{ marginTop: "1rem" }} >
          Já possui uma conta? <Link href="/">Entrar</Link>
        </Typography>
          </form>
     </Container>
  );
};

export default RegisterForm;
