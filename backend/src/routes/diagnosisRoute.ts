import { ipcMain } from "electron";
import DiagnosisController from "../controllers/diagnosisController";

ipcMain.handle("diagnosis-post", DiagnosisController.post);
ipcMain.handle("diagnosis-get", DiagnosisController.get);
ipcMain.handle("diagnosis-delete", DiagnosisController.delete);

export default { ipcMain };
