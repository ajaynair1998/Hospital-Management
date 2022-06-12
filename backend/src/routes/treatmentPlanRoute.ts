import { ipcMain } from "electron";
import TreatmentPlanController from "../controllers/treatmentPlanController";

ipcMain.handle("treatment-plan-post", TreatmentPlanController.post);
ipcMain.handle("treatment-plan-get", TreatmentPlanController.get);
ipcMain.handle("treatment-plan-delete", TreatmentPlanController.delete);

export default { ipcMain };
