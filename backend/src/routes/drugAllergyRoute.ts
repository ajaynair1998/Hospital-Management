import { ipcMain } from "electron";
import drugAllergyController from "../controllers/drugAllergyController";

ipcMain.handle("drug-allergy-post", drugAllergyController.post);
ipcMain.handle("drug-allergy-get", drugAllergyController.get);
ipcMain.handle("drug-allergy-delete", drugAllergyController.delete);

export default { ipcMain };
