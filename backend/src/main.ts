import { app, BrowserWindow } from "electron";
import isDev from "electron-is-dev";
import path from "path";
import notifications from "./routes/notificationRoute";
import favourites from "./routes/fovouritesRoute";
import chiefComplaintsRoute from "./routes/chiefComplaintsRoute";

function createWindow(): void {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, "preload"),
			contextIsolation: true,
		},
	});

	win.loadURL(
		isDev
			? "http://localhost:3000"
			: `file://${path.join(__dirname, "../build/index.html")}`
	);
	if (isDev) {
		win.webContents.openDevTools({ mode: "detach" });
	}
}

app.whenReady().then(() => {
	createWindow();
});

// expose all routes
notifications;
favourites;
chiefComplaintsRoute;

app.on("window-all-closed", function () {
	if (process.platform !== "darwin") app.quit();
});
