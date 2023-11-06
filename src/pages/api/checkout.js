const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { items, email } = req.body;
      const modifiedItems = items.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: "usd",
          unit_amount: item.price * 100,
          product_data: {
            name: item.title,
            description: item.description,
            images: [item.image],
          },
        },
      }));
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_address_collection: {
          allowed_countries: ["EG", "SA", "MA", "US", "OM", "GB"],
        },
        line_items: modifiedItems,
        mode: "payment",
        success_url: `${process.env.NEXTAUTH_URL}/success`,
        cancel_url: `${process.env.NEXTAUTH_URL}/cart`,
        metadata: {
          email,
          images: JSON.stringify(items.map((item) => item.image)),
        },
      });
      res.status(200).json({
        id: session.id,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json(error.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
