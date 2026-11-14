# Vendoo

Vendoo is an early-stage marketplace project.

## Frontend rebuild

- New responsive storefront and visual system
- Standalone product detail routes using `product.html?id=product-id`
- Product catalog separated into `products.js`
- Search, category filtering and sorting
- Persistent browser cart and favorites using localStorage
- Dedicated cart, favorites and account pages
- Login and registration page layouts
- Responsive navigation

## Important current limitations

This repository currently contains a frontend prototype and sample product data only.

- Login and registration are deliberately not connected. Do not enter real passwords.
- There is no server-side user authentication or database yet.
- Cart and favorites are stored only in the current browser.
- Sample products are not real listings and cannot be purchased.
- Checkout, payments, seller publishing, messaging and moderation are not enabled.

## Files

- `index.html`: storefront
- `product.html`: standalone product detail page
- `login.html`, `register.html`: authentication UI
- `account.html`: account area
- `cart.html`, `favorites.html`: saved shopping state
- `sell.html`: seller entry page
- `styles.css`: shared design system
- `products.js`: demo catalog
- `app.js`: frontend interactions and browser persistence

## Next backend milestone

Connect Supabase (or another backend) for secure authentication, profiles, product records, image storage, favorites, carts, seller permissions and server-side validation. Add payment processing only after the marketplace's legal, age, seller verification, refund and consumer-protection requirements are addressed.
