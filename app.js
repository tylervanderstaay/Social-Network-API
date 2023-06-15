const db = require('./config/connection');
const routes = require('./routes');

const express = require('express');

const port = process.env.PORT
const app = express();

app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(routes);

db.once('open', ()=> {
    ap.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });
});