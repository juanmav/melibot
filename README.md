#Telegram Meli Bot

Receive notifications from severals users to one telegram chat.

## Check out project

> git clone https://github.com/juanmav/melibot.git

> npm install

## Create key.pem and cert.pem files

> openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365

## Create the environment file

You should complete the following values

```
APP_ID=MercadoLibre_APP_ID
APP_SECRET=MercadoLibre_APP_ID
TELEGRAM_API_TOKEN=TELEGRAM_API_TOKEN
APP_AUTH_URL=https://mymachineip.com/auth_redirect/

KEY_PEM=./key.pem
CERT_PEM=./cert.pem
CERT_PASSPHRASE=secret_of_certificate
```

## Enjoy

> npm start