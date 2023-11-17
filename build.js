const electronInstaller = require('electron-winstaller');

// In this case, we can use relative paths
var settings = {
    // Specify the folder where the built app is located
    appDirectory: './dist/simcam-win32-x64',
    // Specify the existing folder where
    outputDirectory: './dist/installers',
    // The name of the Author of the app (the name of your company)
    authors: 'Aymeric Maisonneuve',
    // The name of the executable of your built
    exe: 'simcam.exe',

    description: 'Application d\'utilisation de la Simcam.',

    loadingGif: './ajax-loader.gif',

    icon: './dist/simcam-win32-x64/resources/app/icon.ico',

    setupIcon: './dist/simcam-win32-x64/resources/app/icon.ico',

    setupExe: 'simcam-setup.exe',

    setupMsi: 'simcam-setup.msi',
};

resultPromise = electronInstaller.createWindowsInstaller(settings);

resultPromise.then(() => {
    console.log("The installers of your application were succesfully created !");
}, (e) => {
    console.log(`Well, sometimes you are not so lucky: ${e.message}`)
});