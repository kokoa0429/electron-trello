const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow = null;

const { remote } = require('electron')
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;

var checked = false;

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', function () {
  mainWindow = new BrowserWindow({ width: 700, height: 700, alwaysOnTop: true });
  mainWindow.loadURL('https://trello.com/');
  mainWindow.setTitle("twitter");
  mainWindow.setPosition(-700, 130);
  mainWindow.on('closed', function () {
    mainWindow = null;
    
  });

  const xmenu = new Menu()
  xmenu.append(new MenuItem({
    type: "checkbox",
    label: "隠さない",
    click: function(e) {
      checked = e.checked
    }
  }))
  mainWindow.webContents.on('context-menu', function(e,params) {
    xmenu.popup(mainWindow,params.x,params.y)
  })

  var b = 0;
  setInterval(function () {
    // get the mouse position
    let mousePos = electron.screen.getCursorScreenPoint();
    console.log(mousePos);
    if (mousePos.x < 5 && mousePos.y <= 850) {
      mainWindow.setPosition(0, 130);
    }
    else {
      if (!checked && mousePos.x >= 750) {
        mainWindow.setPosition(-780, 130);
      }
    }
  }, 1000);

});

