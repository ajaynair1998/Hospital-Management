import { ipcMain } from "electron";
import FavouritesController from "../controllers/favouritesController";

ipcMain.handle("favourites-get", FavouritesController.get);
ipcMain.handle("favourites-post", FavouritesController.post);
ipcMain.handle("favourites-delete", FavouritesController.delete);

export default { ipcMain };
