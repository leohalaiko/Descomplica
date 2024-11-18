import React, { useState } from 'react';
import { FormControl, Input, FormHelperText } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import LoginService from '../../services/LoginService';
import ButtonLoading from '../../components/ButtonLoading';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [errorMessages, setErrorMessages] = useState({});
  const [showRenderErrorMessage, setShowRenderErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const errors = {
    credenciais: 'Usuário e/ou Senha inválidos!',
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowRenderErrorMessage(false);
    setLoading(true);
    setSuccess(false);

    try {
      const response = await LoginService(userName, password);
      if (response) {
        console.log('Login efetuado com sucesso', response);
        setLoginError('');
        setSuccess(true);
        setLoading(false);
        localStorage.setItem(
          'authUser',
          JSON.stringify({ jwt: response['jwt-token'], exp: Date.now() })
        );
        navigate('/');
      } else {
        setShowRenderErrorMessage(true);
        setErrorMessages({ name: 'credenciais', message: errors.credenciais });
        setLoading(false);
      }
    } catch (error) {
      console.error('Erro ao realizar login: ', error);
      setLoginError('Erro ao realizar login. Por favor, tente novamente.');
      setLoading(false);
    }
  };

  const renderErrorMessage = (name) =>
    showRenderErrorMessage &&
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Grid container spacing={0} direction={'column'} align={'center'} justifyItems="center" sx={{ boxShadow: 2, padding: 5, width: 250 }}>
        <Grid item>
          <FormControl>
            <Input
              id="usuario"
              aria-describedby="usuario_helper_text"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              required
            />
            <FormHelperText id="usuario_helper_text">Usuário</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <Input
              id="senha"
              aria-describedby="senha_helper_text"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <FormHelperText id="senha_helper_text">Senha</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item sx={{ marginTop: 2 }}>
          <ButtonLoading
            text={'Login'}
            onclickFunction={handleSubmit}
            buttonVariant={'outlined'}
            loadingState={loading}
            successState={success}
          />
        </Grid>
        <Grid item sx={{ fontSize: 14, color: 'red', marginTop: 2 }}>
          {renderErrorMessage('credenciais')}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
