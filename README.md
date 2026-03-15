# WanderLust

WanderLust is a full-stack Airbnb-style travel listing app built with Node.js, Express, MongoDB, and EJS.

Users can browse listings, sign up/sign in, create and manage their own listings, upload images to Cloudinary, post reviews with star ratings, and view listing locations on map embeds.

## Features

- Authentication with Passport (`signup`, `signin`, `logout`)
- Authorization guards:
  - Only listing owners can edit/update/delete listings
  - Only review authors can delete their reviews
- Listings CRUD with Joi validation
- Reviews create/delete with star ratings
- Cloudinary image upload for create and edit listing flows
- Responsive navbar with mobile hamburger menu
- Landing page (`/`) with custom sections and CTA
- Static legal pages:
  - Privacy Policy (`/privacy`)
  - Terms of Service (`/terms`)
- Flash messages and session persistence with MongoDB store (`connect-mongo`)

## Tech Stack

- Node.js
- Express 5
- MongoDB + Mongoose
- EJS + ejs-mate
- Passport + passport-local + passport-local-mongoose
- Joi
- Multer + Cloudinary + multer-storage-cloudinary
- express-session + connect-mongo + connect-flash
- method-override

## Environment Variables

Create a `.env` file in project root using `.env.example`:

```env
NODE_ENV=development
PORT=8080
ATLASDB_URI=mongodb+srv://username:password@cluster.mongodb.net/wanderlust?retryWrites=true&w=majority
SESSION_SECRET=replace_with_a_long_random_secret

CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret
```

## Getting Started

1. Install dependencies

```bash
npm install
```

2. (Optional) Seed sample listings

```bash
node init/index.js
```

3. Run in development

```bash
npm run dev
```

App URL: `http://localhost:8080`

## Scripts

- `npm run dev` — Run with nodemon
- `npm start` — Run with Node
- `node init/index.js` — Seed database

## Key Routes

- `GET /` — Landing page
- `GET /listings` — All listings
- `GET /listings/:id` — Listing details + reviews + map
- `POST /listings` — Create listing (auth required)
- `PUT /listings/:id` — Update listing (owner only)
- `DELETE /listings/:id` — Delete listing (owner only)
- `POST /listings/:id/review` — Add review (auth required)
- `DELETE /listings/:id/review/:reviewId` — Delete review (review author only)
- `GET /signup`, `GET /signin`, `GET /logout`
- `GET /privacy`, `GET /terms`

## Deployment Notes

- Set `NODE_ENV=production`
- Set strong `SESSION_SECRET`
- Add Atlas IP allowlist / proper network access
- Ensure all Cloudinary env vars are present
- In production, secure cookies are enabled automatically

## License

ISC
