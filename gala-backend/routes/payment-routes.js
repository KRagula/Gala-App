import paypal from 'paypal-rest-sdk';
import sgMail from '@sendgrid/mail';
import axios from 'axios';
// const paypal = require('paypal-rest-sdk');
// const sgMail = require('@sendgrid/mail');

// require('dotenv').config();

var sg_apikey = process.env.SENDGRID_API_KEY;
// console.log("this is the api key" + sg_apikey);
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

	// console.log('this is the object' + create_payment_json);

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

	// var payment_info = '';
	//var buyer_email = '';
	// var merchant_email = '';

	paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
		if (error) {
			// console.log(error.response);
			throw error;
		} else {
			// console.log('Get Payment Response');
			// console.log(JSON.stringify(payment));
			// console.log(typeof payment);
			// console.log(payment);
			const buyer_email = payment['payer']['payer_info']['email'];
			const merchant_email = payment['transactions'][0]['payee']['email'];
			const amount = payment['transactions'][0]['amount'];
			const item_list = payment['transactions'][0]['item_list'];
			const price = item_list['items'][0]['price'];
			const tax = item_list['items'][0]['tax'];
			// console.log('this is the buyer email' + buyer_email);
			// console.log('this is the merchant email' + merchant_email);
			// console.log('this si the amount' + amount);
			// console.log('this is the item list' + item_list);
			// console.log('this is price' + price);
			// console.log('this is tax' + tax);
			//console.log('this is payment info' + typeof payment_info);
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
					// console.log('successffully sent receipt');
					// console.log(response[0].statusCode);
					// console.log(response[0].headers);
				})
				.catch(error => {
					// console.error(error);
				});
			res.send('Success you just made a payment');
			// console.log("this is invoice id" + invoiceId);
		}
	});
	// console.log('outside of execute' + buyer_email);
	// console.log(merchant_email);
	//buyer email
	// console.log('This is the payer info' + payment_info['payer_info']['email']);
	// //merchant email
	// console.log('This is the buyer info' + payment_info['payee']['email']);
	// //tax
	// console.log('these are the items' + payment_info['item_list']['items']);
	//amount

	//Access Token:A21AAKfFBpCh1QeHtCXd9qh5AKxSXeYhJpnYF2mBQZwtGDZcwqd0IQomqwplui7SQvqSIv2GODWAagm4tnaAvu0td3gOhCmtA
	// var split = '';
	// const create_invoice = await axios({
	// 	method: 'post',
	// 	url: 'https://api-m.sandbox.paypal.com/v2/invoicing/invoices',
	// 	headers: {
	// 		Authorization: `Bearer ${process.env.PAYPAL_ACCESS}`,
	// 	},
	// 	data: {
	// 		detail: {
	// 			invoice_number: '66479999',
	// 			reference: 'deal-ref',
	// 			invoice_date: '2018-11-12',
	// 			currency_code: 'USD',
	// 			note: 'Thank you for your business.',
	// 			term: 'No refunds after 30 days.',
	// 			memo: 'This is a long contract',
	// 			payment_term: {
	// 				term_type: 'NET_10',
	// 				due_date: '2018-11-22',
	// 			},
	// 			invoicer: {
	// 				name: {
	// 					given_name: 'David',
	// 					surname: 'Larusso',
	// 				},
	// 				address: {
	// 					address_line_1: '1234 First Street',
	// 					address_line_2: '337673 Hillside Court',
	// 					admin_area_2: 'Anytown',
	// 					admin_area_1: 'CA',
	// 					postal_code: '98765',
	// 					country_code: 'US',
	// 				},
	// 				email_address: 'merchant@example.com',
	// 				phones: [
	// 					{
	// 						country_code: '001',
	// 						national_number: '4085551234',
	// 						phone_type: 'MOBILE',
	// 					},
	// 				],
	// 				website: 'www.test.com',
	// 				tax_id: 'ABcNkWSfb5ICTt73nD3QON1fnnpgNKBy- Jb5SeuGj185MNNw6g',
	// 				logo_url: 'https://example.com/logo.PNG',
	// 				additional_notes: '2-4',
	// 			},
	// 			primary_recipients: [
	// 				{
	// 					billing_info: {
	// 						name: {
	// 							given_name: 'Stephanie',
	// 							surname: 'Meyers',
	// 						},
	// 						address: {
	// 							address_line_1: '1234 Main Street',
	// 							admin_area_2: 'Anytown',
	// 							admin_area_1: 'CA',
	// 							postal_code: '98765',
	// 							country_code: 'US',
	// 						},
	// 						email_address: 'bill-me@example.com',
	// 						phones: [
	// 							{
	// 								country_code: '001',
	// 								national_number: '4884551234',
	// 								phone_type: 'HOME',
	// 							},
	// 						],
	// 						additional_info_value: 'add-info',
	// 					},
	// 					shipping_info: {
	// 						name: {
	// 							given_name: 'Stephanie',
	// 							surname: 'Meyers',
	// 						},
	// 						address: {
	// 							address_line_1: '1234 Main Street',
	// 							admin_area_2: 'Anytown',
	// 							admin_area_1: 'CA',
	// 							postal_code: '98765',
	// 							country_code: 'US',
	// 						},
	// 					},
	// 				},
	// 			],
	// 			items: [
	// 				{
	// 					name: 'Yoga Mat',
	// 					description: 'Elastic mat to practice yoga.',
	// 					quantity: '1',
	// 					unit_amount: {
	// 						currency_code: 'USD',
	// 						value: '50.00',
	// 					},
	// 					tax: {
	// 						name: 'Sales Tax',
	// 						percent: '7.25',
	// 					},
	// 					discount: {
	// 						percent: '5',
	// 					},
	// 					unit_of_measure: 'QUANTITY',
	// 				},
	// 			],
	// 			configuration: {
	// 				partial_payment: {
	// 					allow_partial_payment: true,
	// 					minimum_amount_due: {
	// 						currency_code: 'USD',
	// 						value: '20.00',
	// 					},
	// 				},
	// 				allow_tip: true,
	// 				tax_calculated_after_discount: true,
	// 				tax_inclusive: false,
	// 				template_id: 'TEMP-19V05281TU309413B',
	// 			},
	// 			amount: {
	// 				breakdown: {
	// 					custom: {
	// 						label: 'Packing Charges',
	// 						amount: {
	// 							currency_code: 'USD',
	// 							value: '10.00',
	// 						},
	// 					},
	// 					shipping: {
	// 						amount: {
	// 							currency_code: 'USD',
	// 							value: '10.00',
	// 						},
	// 						tax: {
	// 							name: 'Sales Tax',
	// 							percent: '7.25',
	// 						},
	// 					},
	// 					discount: {
	// 						invoice_discount: {
	// 							percent: '5',
	// 						},
	// 					},
	// 				},
	// 			},
	// 		},
	// 	},
	// }).then(
	// 	response => {
	// 		console.log(response);
	// 		// split = response['data']['href'].slice(53, 77);
	// 		split = response['data']['href'];
	// 		// console.log('This is the length of split', split.length);
	// 		console.log('this si the split', split);
	// 	},
	// 	error => {
	// 		console.log(error);
	// 	}
	// );
	// var receipt_info = '';
	// const make_receipt = await axios({
	// 	method: 'get',
	// 	url: split,
	// 	headers: {
	// 		Authorization: `Bearer ${process.env.PAYPAL_ACCESS}`,
	// 	},
	// }).then(
	// 	response => {
	// 		console.log(response);
	// 		receipt_info = response['data'];
	// 		// split = response['data']['href'].slice(53, 77);
	// 		// console.log('This is the length of split', split.length);
	// 		// console.log('this si the split', split);
	// 	},
	// 	error => {
	// 		console.log(error);
	// 	}
	// );

	// const get_receipt = await axios({
	// 	method: 'get',
	// 	url: `https://www.sandbox.paypal.com/myaccount/transactions/print-details/16106919YJ638814C`,
	// 	headers: {
	// 		Authorization: `Bearer ${process.env.PAYPAL_ACCESS}`,
	// 	},
	// }).then(
	// 	response => {
	// 		console.log(response);
	// 	},
	// 	error => {
	// 		console.log(error);
	// 	}
	// );

	// console.log('this is the invoideId', split);
	// const invoiceId = invoice['id'];
	// console.log(invoiceId);

	// console.log('this is the receipt data', receipt_info);
	// let html = JSON.stringify(receipt_info);
};

export default {
	pay: pay,
	success: success,
	cancel: cancel,
};
