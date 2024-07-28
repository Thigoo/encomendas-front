import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button, Container, TextField, Typography, Link, CircularProgress } from "@mui/material";
import { User } from "../../models/User";
import * as yup from 'yup';
import {toast} from 'react-toastify';

const loginSchema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Email obrigatório'),
  password: yup.string().min(3, 'A senha deve ter pelo menos 3 digitos').required('A senha é obrigatória'),
});

interface IFormData {
  email?: string;
  password?: string;
  serverError?: string;
}

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<IFormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);
    
    try {
      const user: User = { email, password };
      await loginSchema.validate(user, { abortEarly: false });
      await login(user);
      toast.success('Login bem-sucedido!');
      
    } catch (error: any) {
      if(error instanceof yup.ValidationError) {
        const validationErrors: IFormData = {};
        error.inner.forEach((err: any) => {
          validationErrors[err.path as keyof IFormData] = err.message;
        })
        setErrors(validationErrors);
      } else {
        // toast.error('Email ou senha incorretos');
        setErrors({ serverError: 'Email ou senha incorretos' });
      }
    } finally {
      setIsSubmitting(false);
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
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Senha"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
        />
        {errors.serverError && 
          <Typography 
            fontSize={"0.8rem"}  
            color="error">{errors.serverError}
          </Typography>
        }
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          sx={{ marginTop: "1rem" }}
          fullWidth
          disabled={isSubmitting}
        >
          {isSubmitting ? <CircularProgress size={24} /> : "Login"}
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
