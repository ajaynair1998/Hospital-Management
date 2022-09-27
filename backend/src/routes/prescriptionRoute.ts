import { ipcMain } from "electron";
import PrescriptionController from "../controllers/prescriptionController";

ipcMain.handle("precription-post", PrescriptionController.post);
ipcMain.handle("precription-get", PrescriptionController.get);
ipcMain.handle("precription-delete", PrescriptionController.delete);

export default { ipcMain };
