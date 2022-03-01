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
			experience_name: 'Pitbull Concert',
			experience_description: 'Come to the Pitbull Concert with me!',
			experience_date: '4/1/22',
			experience_time: '9:30pm EST',
			experience_location: '4200 Pine st. Philadelphia, PA 19104',
			bid_price: 105,
		},
	};
	sgMail.send(msg).catch(error => {
		throw new ServerError(serverErrorTypes.sendgrid, error);
	});
};

export default {
	bidConfirm: bidConfirm,
};
