const path = require("path");
const serve = require("electron-serve");
const { exec } = require("child_process");
const { app, ipcMain } = require("electron");
const { createWindow } = require("./helpers");

const isProd = process.env.NODE_ENV === "production";

const startBackend = async () => {
  // Starts the python backend server.
  let scriptPath;
  if (isProd) {
    const parentDir = path.dirname(path.dirname(path.dirname(__dirname)));
    scriptPath = path.join(parentDir, "scripts/main.py");
  } else {
    scriptPath = path.join(__dirname, "../scripts/main.py");
  }

  const cmd = `python ${scriptPath} &`;
  console.log(`Running command: ${cmd}`);

  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });
};

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", app.getPath("userData") + " (development)");
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  //await startBackend();

  if (isProd) {
    await mainWindow.loadURL("app://./");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.on("message", async (event, arg) => {
  event.reply("message", arg + " World!");
});
