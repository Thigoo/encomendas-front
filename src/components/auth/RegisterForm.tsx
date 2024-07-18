import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress, Container, Link, TextField, Typography } from "@mui/material";
import { User } from "../../models/User";
import * as yup from "yup";
import { register } from "../../services/api";
import { toast } from "react-toastify";

const registerSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().email("Email inválido").required("Email obrigatório"),
  password: yup
    .string()
    .min(3, "A senha deve ter pelo menos 3 digitos")
    .required("A senha é obrigatória"),
});

interface IFormData {
  name?: string;
  email?: string;
  password?: string;
  serverError?: string;
}

const RegisterForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<IFormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      const newUser: User = { name, email, password };
      await registerSchema.validate(newUser, { abortEarly: false });
      await register(newUser);
      toast.success("Usário registrado com sucesso!");
      navigate("/");
    } catch (error: any) {
      if (error instanceof yup.ValidationError) {
        const validationErrors: IFormData = {};
        error.inner.forEach((err: any) => {
          validationErrors[err.path as keyof IFormData] = err.message;
        });
        setErrors(validationErrors);
      } else if (error.response && error.response.status === 400) {
          // toast.error('Email ou senha incorretos');
          setErrors({ serverError: "Email já cadastrado" });
        }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container component={"main"} maxWidth="xs" sx={{ marginTop: "8rem" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
        />
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
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
        />
        {errors.serverError && (
          <Typography fontSize={"0.8rem"} color="error">
            {errors.serverError}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          sx={{ marginTop: "1rem" }}
          fullWidth
        >
          {isSubmitting ? <CircularProgress size={24}/>  : "Register"}
        </Button>
        <Typography
          variant="body1"
          component="p"
          gutterBottom
          sx={{ marginTop: "1rem" }}
        >
          Já possui uma conta? <Link href="/">Entrar</Link>
        </Typography>
      </form>
    </Container>
  );
};

export default RegisterForm;
