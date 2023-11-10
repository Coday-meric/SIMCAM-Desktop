const electron = require('electron');
const { ipcRenderer } = require('electron')
const net = electron.remote.net;


var get = document.getElementById('button');

get.addEventListener('click', () => {

    const request = net.request({

        method: 'GET',

        protocol: 'http:',

        hostname: 'rec-api.aymeric-mai.fr',

        port: 8000,

        path: '/stop_rec',

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

    ipcRenderer.send('show-load')
    ipcRenderer.send('hide-stop')

});

addEventListener('load', () => {

    const request = net.request({

        method: 'GET',

        protocol: 'http:',

        hostname: 'rec-api.aymeric-mai.fr',

        port: 8000,

        path: '/status_rec',

        redirect: 'follow'
    });

    request.on('response', (response) => {

        console.log(`STATUS: ${response.statusCode}`);

        console.log(`HEADERS: ${JSON.stringify(response.headers)}`);

        let data_temp = '';

        response.on('end', () => {
            console.log(data_temp);
            let data = JSON.parse(data_temp);
            var info = document.getElementById("info").textContent;
            document.getElementById("info").textContent = 'La vidéo du bénévole ' + data.name + ' est en cours d\'enregistrement !';
            var file = document.getElementById("file").textContent;
            document.getElementById("file").textContent = 'Le nom du fichier est : ' + data.file +'.';
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



});