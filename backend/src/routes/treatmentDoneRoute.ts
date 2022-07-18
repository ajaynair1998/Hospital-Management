import { ipcMain } from "electron";
import TreatmentDoneController from "../controllers/treatmentDoneController";

ipcMain.handle("treatment-done-post", TreatmentDoneController.post);
ipcMain.handle("treatment-done-get", TreatmentDoneController.get);
ipcMain.handle("treatment-done-delete", TreatmentDoneController.delete);

export default { ipcMain };
