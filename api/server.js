require('dotenv').config();

const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./DB'),
    { isAuthenticated } = require('./middlewares/auth');

const codeRoute = require('./routes/code.route');
const groupRoute = require('./routes/group.route');
const authRoute = require('./routes/auth.route');
const userRoute = require('./routes/users.route');
const hospitalRoute = require('./routes/hospital.route');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/code', codeRoute);
app.use('/group', groupRoute);
app.use('/auth', authRoute);
app.use('/hospital', hospitalRoute);
app.use('/users', isAuthenticated, userRoute);
const port = process.env.PORT || 4000;

const server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});
