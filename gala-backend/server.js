import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';

import './configurations/setup.js';
import dbConfig from './configurations/db-config.js';
import serverConfig from './configurations/server-config.js';

import credentialRoutes from './routes/credential-routes.js';
import paymentRoutes from './routes/payment-routes.js';
import postRoutes from './routes/post-routes.js';
import awsRoutes from './routes/aws-routes.js';

import errorHandlers from './middleware/error-handlers.js';
import tokenHandlers from './middleware/token-handlers.js';

import emailRoutes from './routes/email-routes.js';

import bidRoutes from './routes/bid-routes.js';

mongoose
	.connect(dbConfig.mongoDBAccess)
	.then(() => console.log('Mongo Database Connected'))
	.catch(err => {
		console.error('ERROR: Mongo Database Could Not Connect:\n', err);
		process.exit(1);
	});

const corsOptions = {
	origin: serverConfig.frontendURL,
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
};

const app = express();

/** Middleware Library Configs **/
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(compression());
app.use(helmet());
app.use(cookieParser());

/** AWS ENDPOINTS **/
app.post('/aws/fileupload', awsRoutes.uploadFile);

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
app.get('/experience/bids-sent/:username', bidRoutes.getBidsSent);
app.get('/experience/bids-received/:username', bidRoutes.getBidsReceived);
app.post('/experience/offer-bid/:postId', bidRoutes.offerBid);
app.get('/experience/offer-bid/:postId', bidRoutes.postInfo);

/** ERROR HANDLING **/
app.use(errorHandlers.errorLogger);
app.use(errorHandlers.errorResponder);

/** EMAIL ENDPOINTS **/

app.get('/bidConfirm', emailRoutes.bidConfirm);
console.log(
	'Authors: Edward Kim (kime022), Claire Wang (waclaire), Robin Tan (robintan), Kanishka Ragula (kragula)'
);

const port = serverConfig.backendPort || '8080';
app.listen(port, () => {
	console.log(
		`Server running on port ${serverConfig.backendPort}. Now open ${serverConfig.backendURL} in your browser!`
	);
});
