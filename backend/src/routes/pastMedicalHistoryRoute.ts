import { ipcMain } from "electron";
import PastMedicalHistoryController from "../controllers/pastMedicalHistoryController";

ipcMain.handle("past-medical-history-post", PastMedicalHistoryController.post);
ipcMain.handle("past-medical-history-get", PastMedicalHistoryController.get);
ipcMain.handle(
	"past-medical-history-delete",
	PastMedicalHistoryController.delete
);

export default { ipcMain };
