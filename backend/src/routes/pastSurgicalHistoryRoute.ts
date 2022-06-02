import { ipcMain } from "electron";
import PastSurgicalHistoryController from "../controllers/pastSurgicalHistoryController";

ipcMain.handle(
	"past-surgical-history-post",
	PastSurgicalHistoryController.post
);
ipcMain.handle("past-surgical-history-get", PastSurgicalHistoryController.get);
ipcMain.handle(
	"past-surgical-history-delete",
	PastSurgicalHistoryController.delete
);

export default { ipcMain };
