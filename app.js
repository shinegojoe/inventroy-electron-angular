const endPoint = require('./dist/out-tsc/electron/endPoint');

const { app, BrowserWindow, BrowserView, ipcMain, nativeTheme } = require('electron')
const url = require("url");
const path = require("path");

// require('./controller/stockController.js');
// require('./controller/pointController.js');

// const stockDao = require('./service/stockDao.js');

app.whenReady().then(() => {
  const win = new BrowserWindow({ width: 800, height: 600,  webPreferences: {
    nodeIntegration: true,
    enableRemoteModule: true, 
    contextIsolation: false
  } })

  const view = new BrowserView()
  win.setBrowserView(view)
  // view.setBounds({ x: 0, y: 0, width: 800, height: 600 })
  view.setBounds({ x: 0, y: 0, width: win.getSize()[0], height: win.getSize()[1] })

  // view.setAutoResize();
  // view.webContents.loadURL('https://electronjs.org')
  const file = path.join(__dirname, `/dist/inventory/index.html`)
  // console.log("file: ", file);
  // view.webContents.loadFile(file);
  win.loadFile(file);
  //win.loadURL('http://localhost:4200')

  win.webContents.openDevTools()

})

nativeTheme.themeSource = 'dark'
