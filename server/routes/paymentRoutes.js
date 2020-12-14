const express = require('express');
const router = express.Router();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { v4: uuid } = require('uuid');

router.route('/', (req, res, next) => {
  const { product, token } = req.body;
  console.log('PRODUCT', product);
  console.log('TOKEN', token);
  console.log('PRICE', product.price);
  const idempontentencyKey = uuid();

  stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: 'usd',
          customer: customer.id,
          receipt_email: token.email,
          description: product.name,
          shipping: {
            name: token.card.name,
            address: { country: token.card.address_country },
          },
        },
        { idempontentencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => next(err));
});

module.exports = router;
