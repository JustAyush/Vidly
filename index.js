const config  = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const app = express();
const genres = require('./routes/genres')
const home = require('./routes/home')
const myLogger = require('./middlewares/logger')

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());

// allow logging only in development environment
if(app.get('env') == 'development') app.use(morgan('tiny'));

app.use(myLogger);

// Different mail server for development and production environment
console.log('Mail Server: ' + config.get('mail.name'));
// password is set in the env variable and mapped
console.log('Password: ' + config.get('mail.password')); 


app.use('/', home);
app.use('/api/genres', genres)


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
