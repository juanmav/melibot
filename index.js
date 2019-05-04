const dotenv = require('dotenv');
dotenv.config();

const Meli = require('mercadolibre').Meli;
const app = require('express')();
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const util = require('util');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

const telegram = require('./telegram')(db);

const getMessage = require('./getmessage');

app.use(bodyParser.json());

app.get('/', (req, res) => {
    const api = new Meli(process.env.APP_ID, process.env.APP_SECRET);
    let authURL = api.getAuthURL(process.env.APP_AUTH_URL);
    res.status(200).send(`<a href="${authURL}">Autenticarte en ML!</a>`);
});

app.get('/auth_redirect', (req, res)=> {
    const api = new Meli(process.env.APP_ID, process.env.APP_SECRET);
    const code = req.query.code;
    api.authorize(code, process.env.APP_AUTH_URL, function (err, authorizedData) {
        console.log(authorizedData);
        res.send("Authenticado con exito! :D A recibir notificaciones!");
        addUser(authorizedData)
    });
});

function addUser({user_id, access_token, refresh_token}){
    let userData = {
        user_id,
        access_token,
        refresh_token
    };

    db.get('users')
        .remove({ user_id })
        .write();

    db.get('users')
        .push(userData)
        .write();
}

app.post('/notifications', async (req, res) =>{
    console.log('Notificacion!!!!');
    let notificationRequest = req.body;
    let notification = await aggregateNotifications(notificationRequest);
    console.log('Agregada: ' + JSON.stringify(notification, null, 4));
    let message = getMessage(notification);

    if(message) {
        console.log("Mensaje: " + message);
        telegram(message);
    } else {
        console.log('Nada para notificar!');
    }

    res.status(200).json({ message: 'ok'});
});


setInterval(() => {
    console.log('--- Listando usuarios autenticados y Refrescando Tokens!----');
    db
        .get('users')
        .value()
        .forEach( async user => {
            let api = getUserApi(user.user_id);
            let refreshAccessToken = util.promisify(api.refreshAccessToken);
            let result = await refreshAccessToken();
            console.log("Refreshed user: " + user.user_id);
            // console.log(result);
            if (!result.status){ // if status not exist everything was ok!
                db
                    .get('users')
                    .find({user_id: user.user_id})
                    .assign({
                        access_token: result.access_token,
                        refresh_token: result.refresh_token
                    })
                    .write();
            } else {
                console.error(result);
            }

        })
}, parseInt(process.env.REFRESH_TOKEN_TIME) * 1000);


/**
 * @return { topic , nickname , resource }
 * */
async function aggregateNotifications(notificationRequest){
    let user_id = parseInt(notificationRequest.user_id);
    console.log(user_id);
    let topic = notificationRequest.topic;
    console.log('notificacion para usuario: ' + user_id);
    let api = getUserApi(user_id);

    if (api){
        let get = util.promisify(api.get);
        let userData = await get('users/' + user_id);
        // Fast fix, messages resources does not come with complete path
        // "resource": "3f6da1e35ac84f70a24af7360d24c7bc" vs "resource": "question/1010101",
        let resource = await get(notificationRequest.topic === 'messages'? 'messages/' + notificationRequest.resource : notificationRequest.resource);
        return { topic , nickname: userData.nickname, user_id, resource, notificationRequest };
    } else {
        return { topic: 'Error', nickname: 'Sin Usuario Autenticado!'}
    }
}


function getUserApi(user_id){
    let userData = db.get('users').find({user_id}).value();
    let api = new Meli(process.env.APP_ID, process.env.APP_SECRET, userData.access_token, userData.refresh_token);
    return api;
}

https.createServer({
    key: fs.readFileSync(process.env.KEY_PEM),
    cert: fs.readFileSync(process.env.CERT_PEM),
    passphrase: process.env.CERT_PASSPHRASE
}, app).listen(parseInt(process.env.HOST_PORT));

console.log("Corriendo servidor en puerto: " + parseInt(process.env.HOST_PORT));