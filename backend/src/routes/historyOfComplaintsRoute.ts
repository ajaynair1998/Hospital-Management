import { ipcMain } from "electron";
import historyOfComplaintsController from "../controllers/historyOfComplaintsController";

ipcMain.handle(
	"history-of-complaints-post",
	historyOfComplaintsController.post
);
ipcMain.handle("history-of-complaints-get", historyOfComplaintsController.get);
ipcMain.handle(
	"history-of-complaints-delete",
	historyOfComplaintsController.delete
);

export default { ipcMain };
