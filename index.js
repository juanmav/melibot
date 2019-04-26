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

app.post('/notifications', (req, res) =>{
    console.log('Notificacion!!!!');
    let notification = req.body;
    console.log(notification);
    aggregateNotifications(notification)
        .then( r => {
            telegram(`Notificacion para: ${r.nickname} del tipo: ${r.topic}`);
        });
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
}, 3600 * 1000);


async function aggregateNotifications(notification){
    let user_id = parseInt(notification.user_id);
    console.log(user_id);
    let topic = notification.topic;
    console.log('notificacion para usuario: ' + user_id);
    let api = getUserApi(user_id);

    if (api){
        let get = util.promisify(api.get);
        let userData = await get('users/' + user_id);
        let resource = await get(notification.resource);
        console.log(JSON.stringify(resource, null, 4));
        return { topic , nickname: userData.nickname, resource };
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
}, app).listen(3000);