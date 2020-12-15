/** @format */

const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');
const passport = require('passport');

module.exports = (app) => {
  //1 time stripe pay
  // app.post('/api/stripe', requireLogin, async (req, res) => {
  //   const charge = await stripe.charges.create({
  //     amount: 500,
  //     currency: 'usd',
  //     description: '$5 for 5 credits',
  //     source: req.body.id,
  //   });

  //   req.user.credits += 5;
  //   req.user.plan = 1;
  //   const user = await req.user.save();

  //   res.send(user);
  // });
  ///monthly stripe pay
  //personal plan
  //https://stripe.com/docs/api
  app.post('/api/stripe', requireLogin, async (req, res) => {
    console.log(req);
    // console.log(req.user);
    // console.log(req.body);
    ////list of possible plans for user to sign up for
    const prices = [
      'basic',
      'price_1HfAZGGFN31Q4RRjSrFXnGgD',
      'price_1HfAbzGFN31Q4RRjtjVDcLz0',
      'price_1HxLmOGFN31Q4RRj03tu6KBo',
      'price_1HxLtsGFN31Q4RRjUHmH0Hkg',
    ];
    if (req.user.stripeId) {
      ////create new stripe customer and save customer id to database
      const customer = await stripe.customers.retrieve(req.user.stripeId);
    } else {
      const customer = await stripe.customers.create({
        email: req.user.email,
        description: 'Subscribing to Personal Plan Monthly Subscription',
      });
      req.user.stripeId = customer.id;
      const user = await req.user.save();
    }
    req.user.plan = 2;
    const user = await req.user.save();

    ////create payment method from post data
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: req.body.number,
        exp_month: req.body.expiryMonth,
        exp_year: req.body.expiryYear,
        cvc: req.body.cvc,
      },
    });

    ////assign payment method to customer
    const assignPaymentMethod = await stripe.paymentMethods.attach(
      paymentMethod.id,
      { customer: req.user.stripeId }
    );

    ////subscribe user to their selected plan
    const subscription = await stripe.subscriptions.create({
      customer: req.user.stripeId,
      items: [{ price: prices[req.body.plan] }],
    });
  });

  ////redirects for localhost:3000
  app.get('/plans/personal', (req, res) => {
    res.redirect(keys.redirectDomainPersonal);
  });
  app.get('/plans/business', (req, res) => {
    res.redirect(keys.redirectDomainBusiness);
  });
  app.get('/plans/payment', (req, res) => {
    res.redirect(keys.redirectDomainPortal);
  });

  //update payment info
  ////will allow user to access their payment portal to update card information and change plans
  app.get('/plans/payment-portal', requireLogin, async (req, res) => {
    res.redirect(keys.redirectDomainPersonal);
    const plan = await stripe.plans.retrieve('price_1HfAZGGFN31Q4RRjSrFXnGgD');
    // console.log(req.user);
    if (req.user.stripeId) {
      const customer = await stripe.customers.retrieve(req.user.stripeId);
    } else {
      const customer = await stripe.customers.create({
        email: req.user.email,
        description: 'Subscribing to Personal Plan Monthly Subscription',
      });
      req.user.stripeId = customer.id;
      const user = await req.user.save();
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: req.user.stripeId,
      return_url: 'https://www.google.com',
    });
    console.log('Continue to payment portal');

    res.redirect(session.url);
  });
};
