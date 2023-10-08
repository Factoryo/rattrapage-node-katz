const fs = require('fs');
const express = require('express');
const routesUser = require('./routes/routesUser');

const app = express();
app.use(express.json());
app.use('/api/user', routesUser);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});