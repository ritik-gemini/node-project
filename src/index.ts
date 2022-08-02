import express from 'express';
import  connect  from './db/db.connection';
import router from './routes/user.route';

const app = express();
require('dotenv').config();

// register view engine
// app.set('view engine', 'ejs');

// app.use(express.static('public'));
// app.use(express.urlencoded({ extended: true }));
// app.use((req, res, next) => {
//   res.locals.path = req.path;
//   next();
// });

app.use(express.json());
app.use(router);

const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.listen(PORT, () => {
    console.log(`Connected to ${HOST}:${PORT}`)
    connect();
})
