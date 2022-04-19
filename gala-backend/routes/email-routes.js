import sgMail from '@sendgrid/mail';

import sendgridConfig from '../configurations/sendgrid-config.js';

import { ServerError, serverErrorTypes } from '../error/generic-errors.js';
sgMail.setApiKey(sendgridConfig.apiKey);

//bid confirmation email template id: d-b70df5ef963e49db813fa3aee0116428
const bidConfirm = async (req, res) => {
	const msg = {
		to: 'clairezwang0612@gmail.com', // Change to your recipient
		from: 'gala.app.experiences@gmail.com', // Change to your verified sender
		subject: 'Bid Confirmation for: Pitbull Concert', //Change with name of experience purchased
		templateId: 'd-c51ef1ca731b4fa28e0d38c6244a711e',
		dynamic_template_data: {
			experience_name: req.body.title,
			experience_description: req.body.discription,
			experience_date: req.body.date,
			experience_time: req.body.time,
			experience_location: req.body.location,
			bid_price: req.body.price,
		},
	};
	console.log('this is the message', msg);
	sgMail.send(msg).catch(error => {
		throw new ServerError(serverErrorTypes.sendgrid, error);
	});
};

const dangerMail = async (req, res) => {
	console.log('this is the user first name', req.body.userFirstname);
	console.log('this is the user last name', req.body.userLastname);
	console.log('this is the location', req.body.location);
	console.log('this is the time', req.body.time);
	console.log('this is the host first name', req.body.hostFirstname);
	console.log('this is the host last name', req.body.hostLastname);
	const msg = {
		to: 'clairezwang0612@gmail.com', // Change to your recipient
		from: 'gala.app.experiences@gmail.com', // Change to your verified sender
		subject: '[URGENT] DANGER REQUESTED from: insert email here', //Change with name of experience purchased
		templateId: 'd-893e56227442405181aa7fc12f8e37b1',
		dynamic_template_data: {
			user_firstname: req.body.userFirstname,
			user_lastname: req.body.userLastname,
			streetAddress: req.body.streetAddress,
			cityAddress: req.body.cityAddress,
			stateAddress: req.body.stateAddress,
			zipcode: req.body.zipcode,
			startTime: req.body.startTime,
			host_firstname: req.body.hostFirstname,
			host_lastname: req.body.hostLastname,
		},
	};
	console.log('this is the message', msg);
	sgMail.send(msg).catch(error => {
		throw new ServerError(serverErrorTypes.sendgrid, error);
	});
};

export default {
	bidConfirm: bidConfirm,
	dangerMail: dangerMail,
};
