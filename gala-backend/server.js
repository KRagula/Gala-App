const express = require('express');
const mongoose = require('mongoose');
const credentialRoutes = require('./routes/credential-routes.js');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('tiny'));

dotenv.config();

mongoose.connect(process.env.DATABASE_ACCESS, () => console.log('Database connected'));

/** ENDPOINTS **/
app.post('/signup', credentialRoutes.signup);
app.post('/login', credentialRoutes.login);

console.log(
	'Authors: Edward Kim (kime022), Claire Wang (waclaire), Robin Tan (robintan), Kanishka Ragula (kragula)'
);

const port = process.env.PORT || '8080';
app.listen(port, () => {
	console.log(
		'Server running on port ' + port + '. Now open http://localhost:' + port + '/ in your browser!'
	);
});
