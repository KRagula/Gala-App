import paypal from 'paypal-rest-sdk';
import sgMail from '@sendgrid/mail';
import axios from 'axios';

import sendgridConfig from '../configurations/sendgrid-config.js';
import paypalConfig from '../configurations/paypal-config.js';

import { ServerError, serverErrorTypes } from '../error/generic-errors.js';
import { response } from 'express';

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
	console.log('this is request', request.body.title);
	console.log('this is the request description', request.body.description);
	console.log('this is the request price', request.body.price);
	const create_payment_json = {
		intent: 'sale',
		payer: {
			payment_method: 'paypal',
		},
		redirect_urls: {
			return_url: `http://localhost:8080/payment/success/${request.body.price}`,
			cancel_url: 'http://localhost:8080/payment/cancel',
		},
		transactions: [
			{
				item_list: {
					items: [
						{
							name: request.body.title,
							sku: '0001',
							price: request.body.price,
							currency: 'USD',
							quantity: 1,
						},
					],
				},
				amount: {
					currency: 'USD',
					total: request.body.price,
				},
				description: request.body.description,
			},
		],
	};

	//console.log('this is the object' + create_payment_json);
	var payment_url;
	paypal.payment.create(create_payment_json, function (error, payment) {
		if (error) {
			throw new ServerError(serverErrorTypes.paypal, error);
		} else {
			for (let i = 0; i < payment.links.length; i++) {
				if (payment.links[i].rel == 'approval_url') {
					//hfref is where the actual link is
					console.log('this si the payment url', payment.links[i].href);
					// res.redirect(payment.links[i].href);
					// payment_url = payment.links[i].href;
					// return payment.links[i].href;
					res.send(payment.links[i].href);
				}
			}
			console.log(payment);
		}
		return 'didnt return anything';
		// return payment.links[i].href;
	});
	//console.log('this is the payment', payment);
	// console.log('this is payment_url', payment_url);
	// return res.json(payment_url);
};

const success = async (req, res) => {
	const payerId = req.query.PayerID;
	const paymentId = req.query.paymentId;
	console.log('these are the req params', req.params.price);
	const execute_payment_json = {
		payer_id: payerId,
		transactions: [
			{
				amount: {
					currency: 'USD',
					total: req.params.price,
				},
			},
		],
	};

	paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
		if (error) {
			throw new ServerError(serverErrorTypes.paypal, error);
		} else {
			const buyer_email = payment['payer']['payer_info']['email'];
			const merchant_email = payment['transactions'][0]['payee']['email'];
			const amount = payment['transactions'][0]['amount'];
			const item_list = payment['transactions'][0]['item_list'];
			// console.log('this is the item_list', item_list);
			const price = item_list['items'][0]['price'];
			const tax = item_list['items'][0]['tax'];
			const description = payment['transactions'][0]['description'];
			const msg = {
				to: 'clairezwang0612@gmail.com', // Change to your recipient
				from: 'gala.app.experiences@gmail.com', // Change to your verified sender
				subject: 'Gala Receipt for: Pitbull Concert', //Change with name of experience purchased
				templateId: 'd-6155c13a32da4f3c89e3d2244e7117da',
				dynamic_template_data: {
					description: description,
					quantity: '1',
					amount: price,
					subtotal: amount['details']['subtotal'],
					t_and_f: tax,
					total: amount['total'],
					merchant_email: merchant_email,
					buyer_email: buyer_email,
					payment_method: payment['payer']['payment_method'],
					payment_status: payment['state'],
					transaction_id: payment['id'],
					transaction_date: payment['create_time'],
				},
			};

			sgMail.send(msg).catch(error => {
				throw new ServerError(serverErrorTypes.sendgrid, error);
				// console.error(error);
			});
			// response.send('Success, payment made');
		}
	});
	res.send('Success you made a payment');
};

export default {
	pay: pay,
	success: success,
	cancel: cancel,
};
