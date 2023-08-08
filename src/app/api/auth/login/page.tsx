'use client'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import theme from './Component/theme';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        Arçelik MLOps
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default async function SignIn() {
  const { register, handleSubmit } = useForm();

  let baseURL = ""
  if (typeof window !== 'undefined') {
     baseURL = window.location.origin;
  } else {
     baseURL = process.env.BASE_URL as string;
  }
  const csrfFetchAddress = `${baseURL}/api/auth/csrf`;

  const result = await (await fetch(csrfFetchAddress)).json()
  const csrfToken = result.csrfToken

  const handleFormSubmit = async (formData: any) => {
    signIn('credentials', {
      username: formData.username,
      password: formData.password,
      csrfToken: formData.csrfToken,
      redirect: true,
      callbackUrl: '/'
    })
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate sx={{ mt: 1 }}>
            <input type="hidden" defaultValue={csrfToken}  {...register("csrfToken")} />
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              autoComplete="username"
              autoFocus
              {...register("username")}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password")}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}