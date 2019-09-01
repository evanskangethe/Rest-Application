const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const router = express.Router();
const http = require('http').Server(app);
const log =  console.log;

//config database
const db = require('./config/database')
const PORT = process.env.PORT

const usersRoute = require('./api/user/users.routes')

db()

//add middleware
app.use(bodyparser.json());
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyparser.urlencoded({extended:true}));
app.use('/api/v1', router);

usersRoute(router);

http.listen(PORT,()=> log(`server connected at http://localhost:${PORT}`));
