import { ipcMain } from "electron";
import PrescriptionController from "../controllers/prescriptionController";

ipcMain.handle("prescription-post", PrescriptionController.post);
ipcMain.handle("prescription-get", PrescriptionController.get);
ipcMain.handle("prescription-delete", PrescriptionController.delete);

export default { ipcMain };
