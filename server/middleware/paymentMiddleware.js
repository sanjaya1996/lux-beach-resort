const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const { v4: uuid } = require('uuid');

const makePayment = (req, res, next) => {
  const { bookingDetails, token, amount } = req.body;
  // const idempontentencyKey = uuid();
  console.log('STRIPE MIDDLEWARE BOOKING DETAILS: ' + bookingDetails);
  console.log('Authenticated in Stripe: ' + req.isAuthenticated());

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
        description: `booking of room, Id= ${bookingDetails.roomId}`,
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
      req.is_paid = true;
      console.log('PAYMENT RESULT: ' + result);
      console.log('Authenticated in stripe result: ' + req.isAuthenticated());
      next();
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

module.exports = makePayment;
