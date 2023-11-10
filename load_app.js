const electron = require('electron');
const { ipcRenderer } = require('electron')
const net = electron.remote.net;


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

            if (data.status === 'true') {
                console.log('Direction extinction vidéo')
                setTimeout(
                    function()
                    {
                        ipcRenderer.send('show-stop')
                        ipcRenderer.send('hide-load')
                    }, 1000);

            }else{
                console.log('Direction démarrage de vidéo')
                setTimeout(
                    function()
                    {
                        ipcRenderer.send('show-main')
                        ipcRenderer.send('hide-load')
                    }, 1000);
            }

        });
        response.on("data", chunk => {
            data_temp += chunk;
        });

    });

    request.on('finish', () => {

        console.log('Request is Finished')

    });

    request.on('abort', () => {
        document.getElementById('etat').innerHTML = "Une erreur c'est produite !"
        console.log('Request is Aborted')

    });

    request.on('error', (error) => {

        document.getElementById('etat').style.color = 'red'
        document.getElementById('loader').style.background= "url('ghost.png') 50% 50% no-repeat rgba(255, 255, 255, 0.8)";
        document.getElementById('loader').style.backgroundColor= "#000000";
        document.getElementById('etat').innerHTML = "Internet ou service indisponible !"
        var reload = document.getElementById("reload_button");
        var input = document.createElement("input");
        input.setAttribute("name","reload_button");
        input.setAttribute("id","reload_button");
        input.setAttribute("value","Recharger");
        input.setAttribute("type","button");
        input.setAttribute("onclick", "document.location.reload(false)")
        reload.appendChild(input);


        console.log(`ERROR: ${JSON.stringify(error)}`)

    });

    request.on('close', (error) => {

        document.getElementById('etat').innerHTML = "Veuillez patientez......"
        console.log('Last Transaction has occured')

    });

    request.setHeader('Content-Type', 'application/json');

    request.end();



});






