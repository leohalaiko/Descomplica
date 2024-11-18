const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  // Lógica de autenticação
  if (email === 'dfafa' && password === 'adfadf') {
    res.json({ token: 'fake-jwt-token' });
  } else {
    res.status(401).json({ message: 'Credenciais inválidas' });
  }
});

app.listen(18080, () => {
  console.log('Server is running on http://192.168.220.128:18080');
});
