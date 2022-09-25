import { ipcMain } from "electron";
import MedicineController from "../controllers/medicineController";

ipcMain.handle("medicine-post", MedicineController.post);
ipcMain.handle("medicine-get", MedicineController.get);
ipcMain.handle("medicine-delete", MedicineController.delete);

export default { ipcMain };
