const express = require('express');
const paymentRoutes = require('./routes/payment-routes.js');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
// const https = require('https');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(morgan('tiny'));

/** ENDPOINTS **/
app.post('/pay', paymentRoutes.pay);
app.get('/success', paymentRoutes.success);
app.get('/cancel', paymentRoutes.cancel);

console.log(
	'Authors: Edward Kim (kime022), Claire Wang (waclaire), Robin Tan (robintan), Kanishka Ragula (kragula)'
);

const port = process.env.PORT || '8080';
app.listen(port, () => {
	console.log(
		'Server running on port ' + port + '. Now open http://localhost:' + port + '/ in your browser!'
	);
});
