import { ipcMain } from "electron";
import GeneralExaminationController from "../controllers/generalExaminationController";
ipcMain.handle("general-examination-post", GeneralExaminationController.post);
ipcMain.handle("general-examination-get", GeneralExaminationController.get);
ipcMain.handle(
	"general-examination-delete",
	GeneralExaminationController.delete
);

export default { ipcMain };
