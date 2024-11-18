import InstanciaAxios from "../api/InstanciaAxios";

const LoginService = async (userName, password) => {
  console.log(`Login Service - userName: ${userName} - Password: ${password}`);
  try {
    const response = await InstanciaAxios.post('/auth/login', {
      email: userName,
      password: password
    });
    console.log('Login Service Result data: ', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Erro ao realizar login: ', error.response.data);
    } else if (error.request) {
      console.error('Erro ao realizar login - No response received: ', error.request);
    } else {
      console.error('Erro ao realizar login: ', error.message);
    }
    throw error;
  }
};

export default LoginService;
