import { ipcMain } from "electron";
import NotificationController from "../controllers/notification-controller";

//example to display notification
ipcMain.on("notify", NotificationController);

export default { ipcMain };
