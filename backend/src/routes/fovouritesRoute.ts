import { ipcMain } from "electron";
import FavouritesController from "../controllers/favouritesController";

ipcMain.handle("favourites-get", FavouritesController.get);
ipcMain.handle("favourites-post", FavouritesController.post);

export default { ipcMain };
