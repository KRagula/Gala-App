import paypal from 'paypal-rest-sdk';
import sgMail from '@sendgrid/mail';
import axios from 'axios';

// require('dotenv').config();

var sg_apikey = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(sg_apikey);

paypal.configure({
	mode: 'sandbox', //sandbox or live
	client_id: process.env.CLIENT_ID,
	client_secret: process.env.CLIENT_SECRET,
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
			return_url: 'http://localhost:8080/success',
			cancel_url: 'http://localhost:8080/cancel',
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
				description: 'paypal test',
			},
		],
	};

	//pass in create_payment_json and returns payment object
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
			const buyer_email = payment['payer']['payer_info']['email'];
			const merchant_email = payment['transactions'][0]['payee']['email'];
			const amount = payment['transactions'][0]['amount'];
			const item_list = payment['transactions'][0]['item_list'];
			const price = item_list['items'][0]['price'];
			const tax = item_list['items'][0]['tax'];
			const msg = {
				to: 'clairezwang0612@gmail.com', // Change to your recipient
				from: 'gala.app.experiences@gmail.com', // Change to your verified sender
				subject: 'Gala Receipt for: Pitbull Concert', //Change with name of experience purchased
				templateId: 'd-6155c13a32da4f3c89e3d2244e7117da',
				dynamic_template_data: {
					description: 'Pitbull Concert',
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

			sgMail
				.send(msg)
				.then(response => {
					response.send(response[0].statusCode);
				})
				.catch(error => {
					// console.error(error);
				});
		}
	});
};

export default {
	pay: pay,
	success: success,
	cancel: cancel,
};
