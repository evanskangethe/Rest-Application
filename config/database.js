require('dotenv').config();
const mongoose = require('mongoose');
const chalk = require('chalk');
const log = console.log;

//require database url
const url = process.env.URL

//configure chalk
const connected = chalk.bold.cyan;
const error = chalk.bold.red;
const disconnected = chalk.bold.yellow;
const termination = chalk.bold.magenta;

module.exports = () => {
    mongoose.connect(url, {useNewUrlParser: true,autoIndex: false});

    const db = mongoose.connection;

    //handle error 
    db.on('error', (err) => log(error(`Mongoose default connection ${err} error`)));

    //handle connection
    db.on(`connected`,()=> log(connected(`Mongoose default connection is open at ${url}`)));

    //handle disconnection
    db.on('disconnected',()=>log(disconnected(`Mongoose default connection is clossed at ${url}`)));

    process.on('SIGINT',() => {
        db.close(()=> {
            log(termination(`Mongoose default connection has been terminated by user`));
            process.exit(0);
        })
    })
}
