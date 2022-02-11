import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';

import credentialRoutes from './routes/credential-routes.js';
import postRoutes from './routes/post-routes.js';

import './configurations/setup.js';
import dbConfig from './configurations/db-config.js';
import serverConfig from './configurations/server-config.js';
import paymentRoutes from './routes/payment-routes.js';

const app = express();

const corsOptions = {
	origin: serverConfig.frontendURL,
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(morgan('tiny'));

/** ENDPOINTS **/
app.post('/pay', paymentRoutes.pay);
app.get('/success', paymentRoutes.success);
app.get('/cancel', paymentRoutes.cancel);
mongoose.connect(dbConfig.mongoDBAccess, () => console.log('Mongo Database Connected'));

/** ENDPOINTS **/
app.post('/signup', credentialRoutes.signup);
app.post('/login', credentialRoutes.login);
app.post('/makePost', postRoutes.postNew);
app.post('/getCityPosts', postRoutes.getCityPosts);

console.log(
	'Authors: Edward Kim (kime022), Claire Wang (waclaire), Robin Tan (robintan), Kanishka Ragula (kragula)'
);

const port = serverConfig.backendPort || '8080';
app.listen(port, () => {
	console.log(
		`Server running on port ${serverConfig.backendPort}. Now open ${serverConfig.backendURL} in your browser!`
	);
});
