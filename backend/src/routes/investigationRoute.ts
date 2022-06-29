import { ipcMain } from "electron";
import InvestigationController from "../controllers/investigationController";
ipcMain.handle("investigation-post", InvestigationController.post);
ipcMain.handle("investigation-get", InvestigationController.get);
ipcMain.handle("investigation-delete", InvestigationController.delete);

export default { ipcMain };
