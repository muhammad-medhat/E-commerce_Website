# E-commerce_Website

## Setup

install backend dependencies -> go to root directory

```
npm install

```

install frontend dependencies -> go to projectDir/frontend

```
npm install

```

## Set Env variables

create .env file in root directory with the following variables and add your values

```
PORT = 3001
MONGO_URI = mongodb+srv://randname:mpzx17jdN7jf1nTc@randname.w1bm7.mongodb.net/?retryWrites=true&w=majority
NODE_ENV = development
TOKEN_SECRET=
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER="" //the email the mails will be sent from
SMTP_PASSWORD="" //the password of that email the mails will be sent from
FROM_EMAIL="" //the email the mails will be sent from
STRIPE_SECRET_KEY=
```

## Start

Run backend on localhost:3001 -> go to root directory

```
npm run server

```

Run frontend on localhost:3000 -> go to projectDir/frontend

```
npm start

```
