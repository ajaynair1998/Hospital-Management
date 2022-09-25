import { ipcMain } from "electron";
import TreatmentDetailsController from "../controllers/treatmentDetailController";

ipcMain.handle("treatment-details-post", TreatmentDetailsController.post);
ipcMain.handle("treatment-details-get", TreatmentDetailsController.get);
ipcMain.handle("treatment-details-delete", TreatmentDetailsController.delete);

export default { ipcMain };
