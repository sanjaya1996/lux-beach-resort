const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const { v4: uuid } = require('uuid');

const makePayment = (req, res, next) => {
  const { token, amount } = req.body;
  console.log('Amount: ' + amount);

  const bookingId = req.params.bookingId;
  let bookingDetails;

  if (!bookingId) {
    bookingDetails = req.body.bookingDetails;
  }
  // const idempontentencyKey = uuid();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) =>
      stripe.charges.create({
        amount: Number(amount) * 100,
        currency: 'aud',
        customer: customer.id,
        receipt_email: token.email,
        description: bookingId
          ? `Payment of booking. bookingId= ${bookingId}`
          : `Pay and book Room, roomId= ${bookingDetails.roomId}`,
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
      req.is_paid = result.paid;
      next();
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

module.exports = makePayment;
