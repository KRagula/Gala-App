import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';

import './configurations/setup.js';
import dbConfig from './configurations/db-config.js';
import serverConfig from './configurations/server-config.js';

import credentialRoutes from './routes/credential-routes.js';
import paymentRoutes from './routes/payment-routes.js';
import postRoutes from './routes/post-routes.js';
import errorHandlers from './error/error-handlers.js';

mongoose.connect(dbConfig.mongoDBAccess, () => console.log('Mongo Database Connected'));

const corsOptions = {
	origin: serverConfig.frontendURL,
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
};

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('tiny'));

/** PAYMENT ENDPOINTS **/
app.post('/payment/pay', paymentRoutes.pay);
app.get('/payment/success', paymentRoutes.success);
app.get('/payment/cancel', paymentRoutes.cancel);

/** CREDENTIAL ENDPOINTS **/
app.post('/credential/signup', credentialRoutes.signup);
app.post('/credential/login', credentialRoutes.login);

/** EXPERIENCE ENDPOINTS **/
app.post('/experience/make-post', postRoutes.postNew);
app.post('/experience/get-city-posts', postRoutes.getCityPosts);
app.post('/experience/get-nearby-posts', postRoutes.getNearbyPosts);
/** ERROR HANDLING **/
app.use(errorHandlers.errorLogger);
app.use(errorHandlers.errorResponder);

console.log(
	'Authors: Edward Kim (kime022), Claire Wang (waclaire), Robin Tan (robintan), Kanishka Ragula (kragula)'
);

const port = serverConfig.backendPort || '8080';
app.listen(port, () => {
	console.log(
		`Server running on port ${serverConfig.backendPort}. Now open ${serverConfig.backendURL} in your browser!`
	);
});
