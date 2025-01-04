const electron = require('electron');
const { app, BrowserWindow } = electron;
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  });

  // In development, load from localhost
  // In production, load the built index.html
  if (isDev) {
    win.loadURL('http://localhost:3002');
    // Force open DevTools
    setTimeout(() => {
      win.webContents.openDevTools();
    }, 1000);
  } else {
    win.loadFile(path.join(__dirname, '../build/index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
