/** @format */

const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

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
  app.post('/api/stripe', requireLogin, async (req, res) => {
    const plan = await stripe.plans.retrieve('price_1HfAZGGFN31Q4RRjSrFXnGgD');
    console.log(req);
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
    req.user.plan = 2;
    const user = await req.user.save();
    const subscription = await stripe.subscriptions.create({
      customer: req.user.stripeId,
      items: [{ price: 'price_1HfAZGGFN31Q4RRjSrFXnGgD' }],
    });

    // const charge = await stripe.charges.create({
    //   amount: 500,
    //   currency: 'usd',
    //   description: products.description,
    //   source: req.body.id,
    // });
    // console.log(charge);

    // res.send(user);
  });

  //business plan
  app.post('/api/stripe/3', requireLogin, async (req, res) => {
    const products = await stripe.products.retrieve('prod_IFfxGujgp9e9Pd');
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: products.description,
      source: req.body.id,
    });
    req.user.plan = 3;
    const user = await req.user.save();

    res.send(user);
  });

  //personal plan yearly
  app.post('/api/stripe/4', requireLogin, async (req, res) => {
    const products = await stripe.products.retrieve('prod_IXe50OqGcGNrnV');
    console.log(products);
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: products.description,
      source: req.body.id,
    });
    req.user.plan = 2;
    const user = await req.user.save();

    res.send(user);
  });

  //business plan Yearly
  app.post('/api/stripe/5', requireLogin, async (req, res) => {
    const products = await stripe.products.retrieve('prod_IXe4RJOt9rzQLL');
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: products.description,
      source: req.body.id,
    });
    req.user.plan = 3;
    const user = await req.user.save();

    res.send(user);
  });

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
