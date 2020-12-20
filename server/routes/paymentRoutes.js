const express = require('express');
const router = express.Router();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const { v4: uuid } = require('uuid');

router.post('/', (req, res, next) => {
  const { room, token, amount } = req.body;
  // const idempontentencyKey = uuid();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) =>
      stripe.charges.create({
        amount: Number(amount) * 100,
        currency: 'usd',
        customer: customer.id,
        receipt_email: token.email,
        description: `purchase of ${room.name}`,
        // shipping: {
        //   name: token.card.name,
        //   address: {
        //     country: token.card.address_country,
        //   },
        // },
        // { idempontencyKey }
      })
    )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

module.exports = router;
