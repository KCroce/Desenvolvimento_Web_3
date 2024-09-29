const express = require('express');
const app = express();
const port = 3000;
const salasRoutes = require('./routes/salas');

app.use(express.json());
app.use('/salas', salasRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
