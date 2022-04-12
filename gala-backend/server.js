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
import profileRoutes from './routes/profile-routes.js';

import errorHandlers from './middleware/error-handlers.js';
import tokenHandlers from './middleware/token-handlers.js';

import emailRoutes from './routes/email-routes.js';

import bidRoutes from './routes/bid-routes.js';
import dateRoutes from './routes/dates-routes.js';

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
app.use(express.urlencoded({ extended: true }));

app.options('*', cors());

/** AWS ENDPOINTS **/
app.post('/aws/fileupload', awsRoutes.uploadFile);

/** PAYMENT ENDPOINTS **/
app.post('/payment/pay', tokenHandlers.verifyJWT, paymentRoutes.pay);
app.get('/payment/success/:price', tokenHandlers.verifyJWT, paymentRoutes.success);
app.get('/payment/cancel', tokenHandlers.verifyJWT, paymentRoutes.cancel);
//just displays the post info for the payments page
app.get('/payment/:postId', tokenHandlers.verifyJWT, bidRoutes.postInfo);

/** CREDENTIAL ENDPOINTS **/
app.post('/credential/signup', credentialRoutes.signup);
app.post('/credential/login', credentialRoutes.login);
app.get('/credential/isauth', tokenHandlers.verifyJWT, credentialRoutes.isAuth);

/** EXPERIENCE ENDPOINTS **/
app.post('/experience/make-post', tokenHandlers.verifyJWT, postRoutes.postNew);
app.post('/experience/get-nearby-posts', postRoutes.getNearbyPosts);
app.get('/experience/bids-sent', tokenHandlers.verifyJWT, bidRoutes.getBidsSent);
app.get('/experience/bids-received', tokenHandlers.verifyJWT, bidRoutes.getBidsReceived);
app.post('/experience/offer-bid/:postId', tokenHandlers.verifyJWT, bidRoutes.offerBid);
app.get('/experience/offer-bid/:postId', tokenHandlers.verifyJWT, bidRoutes.postInfo);
app.put('/experience/confirm-bid/:bidId', tokenHandlers.verifyJWT, bidRoutes.confirmBid);
app.put('/experience/deny-bid/:bidId', tokenHandlers.verifyJWT, bidRoutes.denyBid);
app.delete('/experience/delete-bid/:bidId', tokenHandlers.verifyJWT, bidRoutes.deleteBid);
app.get('/experience/single-bid/:bidId', tokenHandlers.verifyJWT, bidRoutes.singleBid);
app.get('/experience/dates', tokenHandlers.verifyJWT, dateRoutes.getDates);
app.get('/experience/listing/:listingId', tokenHandlers.verifyJWT, postRoutes.getListing);
app.delete('/experience/listing/:listingId', tokenHandlers.verifyJWT, postRoutes.deleteListing);

/** PROFILE ENDPOINTS **/
app.get('/profile/:profileid', tokenHandlers.verifyJWT, profileRoutes.getProfile);
app.put('/profile/:profileid', tokenHandlers.verifyJWT, profileRoutes.editProfile);

/** EMAIL ENDPOINTS **/
app.get('/bidConfirm', tokenHandlers.verifyJWT, emailRoutes.bidConfirm);

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
