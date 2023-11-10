var electronInstaller = require('electron-winstaller');

// In this case, we can use relative paths
var settings = {
    // Specify the folder where the built app is located
    appDirectory: './dist/aeve-rec-win32-x64',
    // Specify the existing folder where
    outputDirectory: './dist/installers',
    // The name of the Author of the app (the name of your company)
    authors: 'Aymeric Maisonneuve',
    // The name of the executable of your built
    exe: 'Aeve-Rec.exe',

    loadingGif: './ajax-loader.gif',

    icon: './icon.ico',

    setupIcon: './icon.ico',

    setupExe: 'aeve_rec-setup.exe',

    setupMsi: 'aeve_rec-setup.msi'

};

resultPromise = electronInstaller.createWindowsInstaller(settings);

resultPromise.then(() => {
    console.log("The installers of your application were succesfully created !");
}, (e) => {
    console.log(`Well, sometimes you are not so lucky: ${e.message}`)
});