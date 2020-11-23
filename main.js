const { app, BrowserWindow } = require('electron')
const path = require('path')
function createWindow() {
    const win = new BrowserWindow({
        height: 715,
        width: 1200,
        minWidth: 600,
        minHeight: 200,
        title: 'Dietanut',
        center: true,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.removeMenu();
    browserWindow.loadURL(url.format({
        pathname: path.join(__dirname, "www/index.html"),
        protocol: 'file:',
        slashes: true
      }));
    console.log(path.join(__dirname, '/www/index.html'), 'DIRECCIon');
    
    win.maximize();
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})


/* const { app, BrowserWindow } = require('electron')	// Module to control application life.	const app = electron.app	// Module to create native browser window.	const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')
let mainWindow
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1024, height: 768
    })
    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, 'www/index.html'),
            protocol: 'file:',
            slashes: true
        }))
    mainWindow.on('closed', function () {
        mainWindow = null
    })
    app.on('ready', createWindow)
    app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })
}
app.on('ready', function () {
    if (mainWindow === null) {
        createWindow()
    }
}) */