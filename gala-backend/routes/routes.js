const defaultHandler = () => { };


// const create_payment_json = {
//   "intent": "sale",
//   "payer": {
//     "payment_method": "paypal"
//   },
//   "redirect_urls": {
//     "return_url": "http://localhost:8080/success",
//     "cancel_url": "http://localhost:8080/cancel"
//   },
//   "transactions": [{
//     "item_list": {
//       "items": [{
//         "name": "Gala test",
//         "sku": "0001",
//         "price": "25.00",
//         "currency": "USD",
//         "quantity": 1
//       }]
//     },
//     "amount": {
//       "currency": "USD",
//       "total": "25.00"
//     },
//     "description": "paypal test for Claire"
//   }]
// };

// const payerId = req.query.PayerID;
// const paymentId = req.query.paymentId;
// const execute_payment_json = {
//   "payer_id": payerId,
//   "transactions": [{
//     "amount": {
//       "currency": "USD",
//       "total": "25.00"
//     }
//   }]

// };

// paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
//   if (error) {
//     console.log(error.response);
//     throw error;
//   } else {
//     console.log("Get Payment Response");
//     console.log(JSON.stringify(payment));
//     res.send('Success');
//   }
// });


module.exports = {
  defaultHandler
};
