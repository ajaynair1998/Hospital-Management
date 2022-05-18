import { ipcMain } from "electron";
import ClinicalDiagnosisController from "../controllers/clinicalDiagnosisController";

ipcMain.handle("clinical-diagnosis-post", ClinicalDiagnosisController.post);
ipcMain.handle("clinical-diagnosis-get", ClinicalDiagnosisController.get);
ipcMain.handle("clinical-diagnosis-delete", ClinicalDiagnosisController.delete);

export default { ipcMain };
