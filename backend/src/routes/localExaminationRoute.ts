import { ipcMain } from "electron";
import LocalExaminationController from "../controllers/localExaminationController";
ipcMain.handle("local-examination-post", LocalExaminationController.post);
ipcMain.handle("local-examination-get", LocalExaminationController.get);
ipcMain.handle("local-examination-delete", LocalExaminationController.delete);

export default { ipcMain };
