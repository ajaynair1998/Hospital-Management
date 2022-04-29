import { ipcMain } from "electron";
import ChiefComplaintsController from "../controllers/ChiefComplaintsController";

ipcMain.handle("chief-complaints-post", ChiefComplaintsController.post);

export default { ipcMain };
