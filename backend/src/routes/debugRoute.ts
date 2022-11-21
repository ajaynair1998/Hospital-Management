import { ipcMain } from 'electron';
import DebugController from '../controllers/debugController';

ipcMain.handle('debug-get', DebugController.get);

export default { ipcMain };
