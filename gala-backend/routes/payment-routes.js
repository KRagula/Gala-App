import paypal from 'paypal-rest-sdk';
import sgMail from '@sendgrid/mail';

import sendgridConfig from '../configurations/sendgrid-config.js';
import paypalConfig from '../configurations/paypal-config.js';

sgMail.setApiKey(sendgridConfig.apiKey);

paypal.configure({
	mode: paypalConfig.mode,
	client_id: paypalConfig.clientId,
	client_secret: paypalConfig.clientSecret,
});

const cancel = async (request, response) => {
	response.send('cancel');
};

const pay = async (request, res) => {
	const create_payment_json = {
		intent: 'sale',
		payer: {
			payment_method: 'paypal',
		},
		redirect_urls: {
			return_url: 'http://localhost:8080/payment/success',
			cancel_url: 'http://localhost:8080/payment/cancel',
		},
		transactions: [
			{
				item_list: {
					items: [
						{
							name: 'Claire test',
							sku: '0001',
							price: '1.00',
							currency: 'USD',
							quantity: 1,
						},
					],
				},
				amount: {
					currency: 'USD',
					total: '1.00',
				},
				description: 'paypal test for Claire',
			},
		],
	};

	console.log('this is the object' + create_payment_json);

	// pass in create_payment_json and returns payment object
	paypal.payment.create(create_payment_json, function (error, payment) {
		if (error) {
			throw error;
		} else {
			for (let i = 0; i < payment.links.length; i++) {
				if (payment.links[i].rel == 'approval_url') {
					//hfref is where the actual link is
					res.redirect(payment.links[i].href);
				}
			}
		}
	});
};

const success = async (req, res) => {
	var invoiceId;
	const payerId = req.query.PayerID;
	const paymentId = req.query.paymentId;
	const execute_payment_json = {
		payer_id: payerId,
		transactions: [
			{
				amount: {
					currency: 'USD',
					total: '1.00',
				},
			},
		],
	};

	paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
		if (error) {
			// console.log(error.response);
			throw error;
		} else {
			// console.log('Get Payment Response');
			// console.log(JSON.stringify(payment));
			res.send('Success you just made a payment');
			// console.log("this is invoice id" + invoiceId);
		}
	});
	const msg = {
		to: 'clairezwang0612@gmail.com', // Change to your recipient
		from: 'gala.app.experiences@gmail.com', // Change to your verified sender
		subject: 'Sending with SendGrid is Fun',
		text: 'Gala Receipts',
		html: '<strong>Receipt below</strong>',
	};

	sgMail
		.send(msg)
		.then(response => {
			// console.log(response[0].statusCode);
			// console.log(response[0].headers);
		})
		.catch(error => {
			// console.error(error);
		});
};

export default {
	pay: pay,
	success: success,
	cancel: cancel,
};
