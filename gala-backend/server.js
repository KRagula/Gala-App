import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import morgan from 'morgan';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTstrategy, ExtractJwt as ExtractJWT } from 'passport-jwt';

import session from 'express-session';

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
app.use(
	session({
		secret: 'this_is_a_secret',
		resave: true,
		saveUnitialized: true,
		rolling: true, // forces resetting of max age
		cookie: {
			maxAge: 360000,
			secure: true,
		},
	})
);
app.use(passport.initialize());
app.use(passport.session());

passport.use('login', new LocalStrategy(credentialRoutes.authUser));
passport.serializeUser((userObj, done) => {
	done(null, userObj);
});
passport.deserializeUser((userObj, done) => {
	done(null, userObj);
});
passport.use(
	new JWTstrategy(
		{
			secretOrKey: 'TOP_SECRET',
			jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token'),
		},
		async (token, done) => {
			try {
				return done(null, token.user);
			} catch (error) {
				done(error);
			}
		}
	)
);

/** AWS ENDPOINTS **/
app.post('/aws/fileupload', passport.authenticate('jwt', { session: false }), awsRoutes.uploadFile);
app.delete(
	'/aws/filedelete',
	passport.authenticate('jwt', { session: false }),
	awsRoutes.deleteFile
);

/** PAYMENT ENDPOINTS **/
app.post('/payment/pay', passport.authenticate('jwt', { session: false }), paymentRoutes.pay);
app.get(
	'/payment/success',
	passport.authenticate('jwt', { session: false }),
	paymentRoutes.success
);
app.get('/payment/cancel', passport.authenticate('jwt', { session: false }), paymentRoutes.cancel);

/** CREDENTIAL ENDPOINTS **/
app.post('/credential/signup', credentialRoutes.signup);
// app.post('/credential/login', passport.authenticate('local', {}), (req, res) => {
// 	console.log('session', req.session);
// 	console.log('user', req.user);
// 	console.log('cookies', res.cookie);
// 	res.json({ data: 'data' });
// });

app.post('/credential/login', async (req, res, next) => {
	passport.authenticate('login', async (err, user, info) => {
		try {
			if (err || !user) {
				const error = new Error('An error occurred.');
				return next(error);
			}

			req.login(user, { session: false }, async error => {
				if (error) return next(error);

				const body = { _id: user.id, email: user.name };
				const token = jwt.sign({ user: body }, 'TOP_SECRET');

				return res.json({ token });
			});
		} catch (error) {
			return next(error);
		}
	})(req, res, next);
});

app.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
	res.json({
		message: 'You made it to the secure route',
		user: req.user,
		token: req.query.secret_token,
	});
});

app.delete('/credential/logout', credentialRoutes.logout);

/** EXPERIENCE ENDPOINTS **/
app.post('/experience/make-post', tokenHandlers.checkAuthenticated, postRoutes.postNew);
app.post('/experience/get-city-posts', tokenHandlers.checkAuthenticated, postRoutes.getCityPosts);
app.post(
	'/experience/get-nearby-posts',
	tokenHandlers.checkAuthenticated,
	postRoutes.getNearbyPosts
);
app.get('/experience/bids-sent/:username', tokenHandlers.checkAuthenticated, bidRoutes.getBidsSent);
app.get(
	'/experience/bids-received/:username',
	tokenHandlers.checkAuthenticated,
	bidRoutes.getBidsReceived
);
app.post('/experience/offer-bid/:postId', tokenHandlers.checkAuthenticated, bidRoutes.offerBid);
app.get('/experience/offer-bid/:postId', tokenHandlers.checkAuthenticated, bidRoutes.postInfo);

/** PROFILE ENDPOINTS **/
app.get('/profile/:profileid', tokenHandlers.checkAuthenticated, profileRoutes.getProfile);

/** ERROR HANDLING **/
app.use(errorHandlers.errorLogger);
app.use(errorHandlers.errorResponder);

/** EMAIL ENDPOINTS **/
app.get('/bidConfirm', tokenHandlers.checkAuthenticated, emailRoutes.bidConfirm);

console.log(
	'Authors: Edward Kim (kime022), Claire Wang (waclaire), Robin Tan (robintan), Kanishka Ragula (kragula)'
);

const port = serverConfig.backendPort || '8080';
app.listen(port, () => {
	console.log(
		`Server running on port ${serverConfig.backendPort}. Now open ${serverConfig.backendURL} in your browser!`
	);
});
