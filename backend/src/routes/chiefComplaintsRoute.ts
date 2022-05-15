import { ipcMain } from "electron";
import ChiefComplaintsController from "../controllers/ChiefComplaintsController";

ipcMain.handle("chief-complaints-post", ChiefComplaintsController.post);
ipcMain.handle("chief-complaints-get", ChiefComplaintsController.get);
ipcMain.handle("chief-complaints-delete", ChiefComplaintsController.delete);

export default { ipcMain };
