const electron = require('electron');
const { ipcRenderer } = require('electron')
const net = electron.remote.net;
const shell = require('electron').shell;

function web_vid() {
    ipcRenderer.send('show-nextcloud')
}

ipcRenderer.on('information-dialog-selection',(event, index) => {
    if ( index === 'oui' ) {
        ipcRenderer.send('notif-upload')
        upload_vid()
    }
})

const informationBtn = document.getElementById('button_upload')

informationBtn.addEventListener('click', function (event) {
    console.log('click')
    ipcRenderer.send('open-upload-dialog')
})

function upload_vid() {
    const request = net.request({

        method: 'GET',

        protocol: 'http:',

        hostname: 'sc-api.coday.fr',

        port: 80,

        path: '/upload',

        redirect: 'follow'
    });

    request.on('response', (response) => {

        console.log(`STATUS: ${response.statusCode}`);

        console.log(`HEADERS: ${JSON.stringify(response.headers)}`);

    });

    request.on('finish', () => {

        console.log('Request is Finished')

    });

    request.on('abort', () => {

        console.log('Request is Aborted')

    });

    request.on('error', (error) => {

        console.log(`ERROR: ${JSON.stringify(error)}`)

    });

    request.on('close', (error) => {
        console.log('Last Transaction has occured')

    });

    request.setHeader('Content-Type', 'application/json');

    request.end();
    ipcRenderer.send('show-load')
    ipcRenderer.send('hide-main')
}

function post_api() {
    var name = document.forms["formulaire"]["name"].value;
    var body = JSON.stringify({ name: name });
    const request = net.request({

        method: 'POST',

        protocol: 'http:',

        hostname: 'sc-api.coday.fr',

        port: 80,

        path: '/rec',

        redirect: 'follow'

    });

    request.on('response', (response) => {

        console.log(`STATUS: ${response.statusCode}`);

        console.log(`HEADERS: ${JSON.stringify(response.headers)}`);



        response.on('data', (chunk) => {

            console.log(`BODY: ${chunk}`)

        });

    });

    request.on('finish', () => {

        console.log('Request is Finished')

    });

    request.on('abort', () => {

        console.log('Request is Aborted')

    });

    request.on('error', (error) => {

        console.log(`ERROR: ${JSON.stringify(error)}`)

    });

    request.on('close', (error) => {

        console.log('Last Transaction has occured')

    });

    request.setHeader('Content-Type', 'application/json');

    request.write(body, 'utf-8');

    request.end();

    ipcRenderer.send('show-load')
    ipcRenderer.send('hide-main')

}

function preview() {
    const request = net.request({

        method: 'GET',

        protocol: 'http:',

        hostname: 'sc-api.coday.fr',

        port: 80,

        path: '/preview',

        redirect: 'follow'
    });

    request.on('response', (response) => {

        console.log(`STATUS: ${response.statusCode}`);

        console.log(`HEADERS: ${JSON.stringify(response.headers)}`);

        let data_temp = '';

        response.on('end', () => {
            console.log(data_temp);
        });
        response.on("data", chunk => {
            data_temp += chunk;
        });

    });

    request.on('finish', () => {

        console.log('Request is Finished')

    });

    request.on('abort', () => {

        console.log('Request is Aborted')

    });

    request.on('error', (error) => {

        console.log(`ERROR: ${JSON.stringify(error)}`)

    });

    request.on('close', (error) => {

        console.log('Last Transaction has occured')

    });

    request.setHeader('Content-Type', 'application/json');

    request.end();

    ipcRenderer.send('show-preview');
    ipcRenderer.send('hide-main');
}