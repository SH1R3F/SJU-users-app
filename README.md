# Saudi Journalists Association v2.0 Users' App
Built with nuxt 3 and tailwindcss
Look at the [nuxt 3 documentation](https://v3.nuxtjs.org) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/guide/deploy/presets) for more information.

<h2>Features of SJU v2.0</h2>
<ul>
    <li>Frontend are completely seperated from the backend, everything is connected through RESTful API</li>
    <li>3 types of users with different schema. Authenticating different users</li>
    <li>Email and mobile verification implemented</li>
    <li>Authenticating through API. Laravel sanctum used with suitable middlewares custom built</li>
    <li>Simple courses registration, attendance, and certificateable for all user types (Polymorphic relationships implemented)</li>
    <li>Annual subscription and payment integrated</li>
    <li>Technical support tickets and chats</li>
</ul>

