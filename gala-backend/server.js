const express = require('express');
const routes = require('./routes/routes.js');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const paypal = require('paypal-rest-sdk');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('tiny'));

require('dotenv').config()
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': process.env.CLIENT_ID,
  'client_secret': process.env.CLIENT_SECRET
});

/** ENDPOINTS **/
app.get('/', routes.defaultHandler);

// app.post('/pay', routes.handlePay);

app.post('/pay', (req, res) => {
  const create_payment_json = {
    "intent": "sale",
    "payer": {
      "payment_method": "paypal"
    },
    "redirect_urls": {
      "return_url": "http://localhost:8080/email",
      "cancel_url": "http://localhost:8080/cancel"
    },
    "transactions": [{
      "item_list": {
        "items": [{
          "name": "Claire test",
          "sku": "0001",
          "price": "25.00",
          "currency": "USD",
          "quantity": 1
        }]
      },
      "amount": {
        "currency": "USD",
        "total": "25.00"
      },
      "description": "paypal test for Claire"
    }]
  };

  console.log("this is the object" + create_payment_json);

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
});

app.get('/success', (req, res) => {
  //to get parameters from URL in node you do req.query
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
  const execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
          "amount": {
              "currency": "USD",
              "total": "25.00"
          }
      }]

  };

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
      if (error) {
          console.log(error.response);
          throw error;
      } else {
          console.log("Get Payment Response");
          console.log(JSON.stringify(payment));
          res.send('Success you just made a payment');
      }
  });

  //execute object with payerID
});

app.get('/cancel', (req, res) => res.send('Cancelled'));

app.get('/email', (req, res) => {
  const create_invoice_json = {
    "merchant_info": {
        "email": "clairezwang0612@gmail.com",
        "first_name": "Dennis",
        "last_name": "Doctor",
        "business_name": "Medical Professionals, LLC",
        "phone": {
            "country_code": "001",
            "national_number": "5032141716"
        },
        "address": {
            "line1": "1234 Main St.",
            "city": "Portland",
            "state": "OR",
            "postal_code": "97217",
            "country_code": "US"
        }
    },
    "billing_info": [{
        "email": "example@example.com"
    }],
    "items": [{
        "name": "Sutures",
        "quantity": 100.0,
        "unit_price": {
            "currency": "USD",
            "value": 5
        }
    }],
    "note": "Medical Invoice 16 Jul, 2013 PST",
    "payment_term": {
        "term_type": "NET_45"
    },
    "shipping_info": {
        "first_name": "Sally",
        "last_name": "Patient",
        "business_name": "Not applicable",
        "phone": {
            "country_code": "001",
            "national_number": "5039871234"
        },
        "address": {
            "line1": "1234 Broad St.",
            "city": "Portland",
            "state": "OR",
            "postal_code": "97216",
            "country_code": "US"
        }
    },
    "tax_inclusive": false,
    "total_amount": {
        "currency": "USD",
        "value": "500.00"
    }
  };
  
  paypal.invoice.create(create_invoice_json, function (error, invoice) {
    if (error) {
        throw error;
    } else {
        console.log("Create Invoice Response");
        console.log(invoice);
    }
  });


});



console.log(
	'Authors: Edward Kim (kime022), Claire Wang (waclaire), Robin Tan (robintan), Kanishka Ragula (kragula)'
);

const port = process.env.PORT || '8080';
app.listen(port, () => {
	console.log(
		'Server running on port ' + port + '. Now open http://localhost:' + port + '/ in your browser!'
	);
});

