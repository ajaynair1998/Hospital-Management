import { ipcMain } from "electron";
import FollowUpController from "../controllers/followUpController";

ipcMain.handle("follow-up-post", FollowUpController.post);
ipcMain.handle("follow-up-get", FollowUpController.get);
ipcMain.handle("follow-up-delete", FollowUpController.delete);

export default { ipcMain };
